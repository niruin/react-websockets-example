import {useRef, useState} from 'react';

export function useWebsocket(url) {
  const ws = useRef(null);
  const [data, setData] = useState(null);
  const [readyState, setReadyState] = useState(-1);

  const createWebsocket = () => {
    if (ws.current) closeWebsocket();

    ws.current = new WebSocket(url);
    setReadyState(ws.current.readyState);

    ws.current.onopen = () => {
      setReadyState(ws.current.readyState);
    };

    ws.current.onmessage = msg => {
      setData(JSON.parse(msg.data));
    };

    ws.current.onclose = () => {
      setData(null);
      setReadyState(ws.current.readyState);
    };
  };

  const closeWebsocket = () => {
    setReadyState(2);
    ws.current.close();
  };

  return [data, createWebsocket, closeWebsocket, readyState];
}