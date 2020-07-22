import React, { FC } from 'react';
import { useFetch } from '../hooks/useFetch';

export const CompanyProfile: FC<ICompanyProfile> = ({ symbol }) => {
  const companyProfileUrl = '/stock/profile2?symbol=';
  const securityToken = 'br8guuvrh5ral083gk80';

  const { response } = useFetch(
    `${companyProfileUrl}${symbol}&token=${securityToken}`
  );
  console.log('response', response);

  return <div></div>;
};

interface ICompanyProfile {
  symbol: string;
}
