import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ViewCompany } from './components/viewCompany';

export default () => {
  return (
    <Switch>
      <Route path="/" exact />
      <Route exact path="/companies/:symbolId" component={ViewCompany} />
      <Route exact path="/news" />
    </Switch>
  );
};
