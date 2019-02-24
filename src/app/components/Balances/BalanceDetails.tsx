import React from 'react';
import { Icon, Tooltip } from 'antd';
import Identicon from 'components/Identicon';
import { BalanceDetailGroup } from 'utils/balances';
import { CHAIN_TYPE, blockchainLogos, denominationSymbols, Denomination } from 'utils/constants';
import './BalanceDetails.less';
import { fromBaseToUnit } from 'utils/units';
import { commaify } from 'utils/formatters';
import BigMessage from 'components/BigMessage';

const BalanceDetails: React.SFC<{
  groups: BalanceDetailGroup[], 
  chain: CHAIN_TYPE,
  denomination: Denomination,
  isRemovable?: boolean,
}> = ({ groups, chain, denomination, isRemovable }) => {
  if (!groups.length) {
    return <BigMessage
      title="Nothing to see here..."
      message="All of your funds are available to spend immediately"
      icon="search"
    />;
  }

  const balance = (value: string) => (
    <>
      {commaify(fromBaseToUnit(value, denomination))}
      <small> {denominationSymbols[chain][denomination]}</small>
    </>
  );

  return (
    <div className="BalanceDetails">
      {groups.map((group, gi) => (
        <div key={gi}>
          <div key={group.title} className="BalanceDetails-header">
            <span>{group.title}</span>
            <span>{group.details.length > 1 && balance(group.balance)}</span>
          </div>
          {group.details.map((detail, di) => (
            <div key={di} className="BalanceDetails-row">
              <div className="BalanceDetails-row-icon">
                {detail.icon.type === 'channel' ? (
                  <Identicon className="ChannelRow-avatar-img" pubkey={detail.icon.pubKey} />
                ) : (
                  <Icon component={blockchainLogos[chain]} />
                )}
              </div>
              <div className="BalanceDetails-row-info">
                <code>{detail.text}</code>
                {detail.info && (
                  <div className="BalanceDetails-row-info-comment">
                    {detail.info}
                  </div>
                )}
              </div>
              <div className="BalanceDetails-row-amount">
                {balance(detail.amount)}
              </div>
              {isRemovable && (
                <div className="BalanceDetails-row-close">
                  <Tooltip title="Close Channel" placement="topRight" arrowPointAtCenter>
                    <Icon type="stop" />
                  </Tooltip>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BalanceDetails;