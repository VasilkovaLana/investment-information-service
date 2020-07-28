import React, { FC, useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Loading } from './loading';

import styled, { keyframes } from 'styled-components';

enum Movement {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}
const redBg = keyframes`
  from {
    background: #ab4950a8;
  }
  to {
    color: #f45b5b;
    background: none;
  }
`;
const greenBg = keyframes`
  from {
    background: #54a08591;
  }
  to {
    background: none;
    color: #1db954;
  }
`;

const animChange = (arg: Movement | '') => {
  if (arg === Movement.INCREASE) {
    return greenBg;
  } else if (arg === Movement.DECREASE) {
    return redBg;
  }
};

const OverViewBox = styled.div`
  width: 170px;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
  font-weight: 600px;
  margin: 15px 0;
  padding: 0 16px;
  color: #c6d3dc;
`;

const Quote = styled.span<{ growthIndicator: Movement | '' }>`
  font-size: 40px;
  margin: auto;
  padding: 6px 2px;
  animation: 0.8s ${(props) => animChange(props.growthIndicator)} ease-out both;
`;

export const RealTimeQuotes: FC<IRealTimeQuotes> = ({ symbol }: any) => {
  return (
    <OverViewBox>
      <p>LAST PRICE</p>
      <StockPrice symbol={symbol} />
    </OverViewBox>
  );
};

const StockPrice: FC<IRealTimeQuotes> = ({ symbol }) => {
  const securityToken = 'br8guuvrh5ral083gk80';
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [changePrice, setChangePrice] = useState<number>(0);
  const { messages, isConnected, transferredData } = useWebSocket(
    securityToken
  );

  useEffect(() => {
    if (symbol) {
      transferredData(symbol);
    }
  }, [symbol, transferredData]);

  useEffect(() => {
    if (prevPrice && messages) {
      const haveChange = messages.data[0].p - prevPrice;

      haveChange && setChangePrice(haveChange);
    }

    messages && setPrevPrice(+messages.data[0].p);
  }, [changePrice, messages, prevPrice]);

  if (isConnected) {
    return <Loading />;
  }

  if (messages) {
    const {
      data: [{ p: price }],
    } = messages;

    const checkNumber = () => {
      let state: Movement | '' = '';
      if (changePrice > 0) {
        state = Movement.INCREASE;
      }
      if (changePrice < 0) {
        state = Movement.DECREASE;
      }

      return state;
    };

    return <Quote growthIndicator={checkNumber()}>{price}</Quote>;
  }

  return <div></div>;
};

interface IRealTimeQuotes {
  symbol: string;
}
