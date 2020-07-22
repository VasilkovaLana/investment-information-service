import React, { FC } from 'react';
import { RealTimeQuotes } from './realTimeQuotes';
import { CompanyProfile } from './companyProfile';

export const ViewCompany: FC<IViewCompany> = ({ match }) => {
  const {
    params: { symbolId: symbol },
  } = match;

  console.log('symbol', symbol);

  return (
    <>
      <RealTimeQuotes symbol={symbol} />
      <CompanyProfile symbol={symbol} />
    </>
  );
};

interface IViewCompany {
  match: {
    params: {
      symbolId: string;
    };
  };
}
