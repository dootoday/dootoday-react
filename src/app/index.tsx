/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { AppLayout } from 'app/containers/AppLayout/Loadable';
import { Login } from 'app/containers/Login/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { ProtectedRoute } from 'app/components/ProtectedRoute';

export function App() {
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="DooToday - Your personal task manager"
        defaultTitle="DooToday - Your personal task manager"
      >
        <meta name="description" content="Your personal task manager" />
      </Helmet>

      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/" component={AppLayout} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
