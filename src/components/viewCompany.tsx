import React, { FC } from 'react';
import { RealTimeQuotes } from './realTimeQuotes';
import { CompanyProfile } from './companyProfile';

import styled from 'styled-components';

const InstrumentHead = styled.section`
  width: 100%;
`;

export const ViewCompany: FC<IViewCompany> = ({ match }) => {
  const {
    params: { symbolId: symbol },
  } = match;

  console.log('symbol', symbol);

  return (
    <InstrumentHead>
      <CompanyProfile symbol={symbol} />
    </InstrumentHead>
  );
};

interface IViewCompany {
  match: {
    params: {
      symbolId: string;
    };
  };
}
