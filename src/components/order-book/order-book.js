import {OrderBookItem} from './order-book-item';

import './order-book.scss';

export const OrderBook = ({symbol, data, readyState}) => {
  const getStatusNameConnection = () => {
    switch (readyState) {
      case 0:
        return 'CONNECTING';
      case 1:
        return 'OPEN';
      case 2:
        return 'CLOSING';
      case 3:
        return 'CLOSED';
      default:
        return 'OFF';
    }
  };

  const getPlugMsg = () => {
    if (readyState === 0) return '...connection';
    if (readyState === 3 || readyState === -1) return 'Not data';

    return '...';
  };

  const statusConnectText = getStatusNameConnection();
  const stubText = getPlugMsg();
  const isHasData = data?.asks.length && data?.bids.length;

  return (
    <div className="order-book">
      <div className="header">
        <div className="header__symbol">{symbol}</div>
        <div className="header__status-connection">
          connection -&nbsp;
          <span className={`header__status-connection${readyState === 1 ? '--open' : ''}`}>
            {statusConnectText}
          </span>
        </div>
      </div>
      <ul className="list">
        <li className="line">
          <span className="line-caption">Price</span>
          <span className="line-caption">Amount</span>
        </li>
        {isHasData ? (
          <>
            {data.asks.map((item, key) => <OrderBookItem key={key} item={item} ask={true}/>)}
            {data.bids.map((item, key) => <OrderBookItem key={key} item={item}/>)}
          </>
        ) : <div>{stubText}</div>}
      </ul>
    </div>
  );
};