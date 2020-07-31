import React, { FC, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { RealTimeQuotes } from './realTimeQuotes';

import styled from 'styled-components';
import { Loading } from './loading';

const WrapperCompanyProfile = styled.div`
  /* display: flex; */
`;

const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GeneralInformation = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    color: #fff;
    text-align: center;
    margin: 40px 0;
    font-size: 30px;
    font-weight: 400;
    text-transform: uppercase;
  }
  table {
    border-collapse: collapse;
    color: #dcdcdc;
    font-size: 15px;
    td:not(:last-child) {
      padding: 12px;
    }

    tr:nth-of-type(odd) {
      background-color: #18304896;
    }
    a {
      color: #32dadc;
      &:hover {
        color: #dcdcdc;
      }
    }
    tr:hover {
      background: #1a2e3dba;
    }
  }
`;

const CompanyFace = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 64px;
    border-radius: 50%;
  }
  h1 {
    font-size: 32px;
    color: #fff;
    margin-left: 16px;
  }
`;

export const CompanyProfile: FC<ICompanyProfile> = ({ symbol }) => {
  const companyProfileUrl = '/stock/profile2?symbol=';
  const securityToken = 'br8guuvrh5ral083gk80';

  const { response, fetchData, isLoading } = useFetch(
    `${companyProfileUrl}${symbol}&token=${securityToken}`
  );

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return (
    <WrapperCompanyProfile>
      {isLoading && <Loading />}
      {response && (
        <>
          <WidgetHeader className="box">
            <CompanyFace>
              <img src={response.logo} alt="logo" />
              <h1>
                {response.name} ({response.ticker})
              </h1>
            </CompanyFace>
            <div>
              <RealTimeQuotes symbol={symbol} />
            </div>
          </WidgetHeader>
          <GeneralInformation>
            <h1>general information</h1>
            <table className="box">
              <tr>
                <td>Company name</td>
                <td>{response.name}</td>
              </tr>
              <tr>
                <td>Finnhub industry classification</td>
                <td>{response.finnhubIndustry}</td>
              </tr>
              <tr>
                <td>IPO date</td>
                <td>{response.ipo}</td>
              </tr>
              <tr>
                <td>Company phone number</td>
                <td>{response.phone}</td>
              </tr>
              <tr>
                <td>Company website</td>
                <td>
                  <a href={response.weburl} target="_blank">
                    {response.weburl}
                  </a>
                </td>
              </tr>
            </table>
          </GeneralInformation>
        </>
      )}
    </WrapperCompanyProfile>
  );
};

interface ICompanyProfile {
  symbol: string;
}
