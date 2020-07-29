import React, { FC } from 'react';
import { StockPrice } from './stockPrice';

import styled from 'styled-components';

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

export const RealTimeQuotes: FC<IRealTimeQuotes> = ({ symbol }: any) => {
  return (
    <OverViewBox>
      <p>LAST PRICE</p>
      <StockPrice symbol={symbol} />
    </OverViewBox>
  );
};

interface IRealTimeQuotes {
  symbol: string;
}
