import {OrderBook} from './components/order-book';
import {useWebsocket} from './hooks/use-websocket';

import './App..scss';

const wssBTCUSDT = 'wss://stream.binance.com:9443/ws/btcusdt@depth10@1000ms';

export function App() {
  const [data, createWebsocket, closeWebsocket, readyState] = useWebsocket(wssBTCUSDT);

  const isOpenConnectBtn = readyState !== 1;
  const isCloseConnectBtn = readyState !== 3 && readyState !== -1;

  return (
    <div className="app">
      <div>
        <p className="title">Order Book</p>
        <div className="btn-group">
          <button className="btn" onClick={closeWebsocket} disabled={isOpenConnectBtn}>off</button>
          <button className="btn" onClick={createWebsocket} disabled={isCloseConnectBtn}>on</button>
        </div>
        <OrderBook symbol="btcusdt" data={data} readyState={readyState}/>
      </div>
    </div>
  );
}
