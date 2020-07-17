import React, { FC, useState, useEffect } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { Loading } from './loading';

import styled, { keyframes } from 'styled-components';

enum Movement {
  INCREASE = 'increase',
  DECREASE = 'decrease',
}
const redBg = keyframes`
  to {
    background: #ab4950;
  }
`;
const greenBg = keyframes`
  to {
    background: #54a085;
  }
`;

const animChange = (arg: Movement | '') => {
  if (arg === Movement.INCREASE) {
    return greenBg;
  } else if (arg === Movement.DECREASE) {
    return redBg;
  }
};

const StockPrice = styled.div<{ growthIndicator: Movement | '' }>`
  width: 170px;
  display: flex;
  background: #364f6b;
  text-align: center;
  font-size: 18px;
  font-weight: 600px;
  margin: 15px 0;
  padding: 0 16px;
  color: #c6d3dc;
  span {
    margin: auto;
    padding: 6px 2px;
    animation: 0.6s ${(props) => animChange(props.growthIndicator)} ease-out;
  }
`;

export const RealTimeQuotes: FC<IRealTimeQuotes> = ({ match }) => {
  const securityToken = 'br8guuvrh5ral083gk80';
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [changePrice, setChangePrice] = useState<number>(0);
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

    return (
      <StockPrice growthIndicator={checkNumber()}>
        <p>Last price:</p>
        <span>{price}</span>
      </StockPrice>
    );
  }

  return <></>;
};

interface IRealTimeQuotes {
  match: {
    params: {
      symbolId: string;
    };
  };
}
