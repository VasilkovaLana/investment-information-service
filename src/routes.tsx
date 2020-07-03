import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RealTimeQuotes } from './components/realTimeQuotes';

export default () => {
  return (
    <Switch>
      <Route path="/" exact />
      <Route exact path="/:symbolId" component={RealTimeQuotes} />
    </Switch>
  );
};
