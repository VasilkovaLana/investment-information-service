import React, { FC, useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';

export const RealTimeQuotes: FC<IRealTimeQuotes> = ({ match }) => {
  const securityToken = 'br8guuvrh5ral083gk80';
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [changePrice, setChangePrice] = useState<number | null>(null);
  const { messages, isConnected, transferredData } = useWebSocket(
    securityToken
  );
  const {
    params: { symbolId: symbol },
  } = match;

  useEffect(() => {
    if (symbol) {
      transferredData(symbol);
    }
  }, [symbol, transferredData]);

  useEffect(() => {
    if (prevPrice && messages) {
      const haveChange = prevPrice - messages.data[0].p;
      haveChange && setChangePrice(+haveChange.toFixed(2));
    }

    messages && setPrevPrice(messages.data[0].p);
  }, [changePrice, messages, prevPrice]);

  if (isConnected) {
    return <div>Loading...</div>;
  }

  if (messages) {
    const {
      data: [{ p: price, s: ticker, v: volume }],
    } = messages;

    return (
      <div>
        <p>Ticker: {ticker}</p>
        <p>Last price: {price} </p>
        <p>Volume: {volume}</p>
        <p>Change(24H): {changePrice}</p>
      </div>
    );
  }

  return <div></div>;
};

interface IRealTimeQuotes {
  match: {
    params: {
      symbolId: string;
    };
  };
}
