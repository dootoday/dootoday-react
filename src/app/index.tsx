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
import { QueryParamProvider } from 'use-query-params';

import { GlobalStyle } from 'styles/global-styles';

import { AppLayout } from 'app/containers/AppLayout';
import { Login } from 'app/containers/Login/Loadable';
import { NotFoundPage } from 'app/components/NotFoundPage/Loadable';
import { ProtectedRoute } from 'app/components/ProtectedRoute';
import { AboutUs } from 'app/containers/AboutUs/Loadable';
import { PrivacyPage } from 'app/containers/PrivacyPage/Loadable';
import { TermsPage } from 'app/containers/TermsPage/Loadable';
import { ContactPage } from 'app/containers/ContactPage/Loadable';
import { RefundPage } from 'app/containers/RefundPage/Loadable';
import { GetStoredTheme } from 'utils/theme';

export function App() {
  const theme = GetStoredTheme().theme.palette.primary.main;
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Helmet
          titleTemplate="DooToday - Daily task simplified"
          defaultTitle="DooToday - Daily task simplified"
        >
          <meta name="description" content="Daily task simplified" />
          <meta name="theme-color" content={theme} />
        </Helmet>

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/privacy" component={PrivacyPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/refund-policy" component={RefundPage} />
          <Route exact path="/tnc" component={TermsPage} />
          <ProtectedRoute path="/" component={AppLayout} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </QueryParamProvider>
    </BrowserRouter>
  );
}
