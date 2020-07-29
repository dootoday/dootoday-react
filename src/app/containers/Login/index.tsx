/**
 *
 * Login
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GoogleLogin from 'react-google-login';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Container, Grid, Typography } from '@material-ui/core';
import { RouteComponentProps, useLocation, Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import {
  RefreshToken,
  Login as LoginRequest,
  IsAuthenticated,
} from 'utils/auth';
import { PublicLayout } from 'app/components/PublicLayout';

interface Props extends RouteComponentProps<any> {}

export const Login = memo((props: Props) => {
  useInjectSaga({ key: 'login', saga: loginSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();
  let location = useLocation<{ from: string }>();
  let { from } = location.state || { from: '/' };

  const handleLogin = (tokenID: string) => {
    LoginRequest(tokenID).then(gotToken => {
      if (gotToken) {
        props.history.push(from);
      }
    });
  };

  useEffect(() => {
    if (IsAuthenticated()) {
      props.history.push(from);
    } else {
      RefreshToken().then(gotToken => {
        if (gotToken) {
          props.history.push(from);
        }
      });
    }
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to DooToday, your personal task manager"
        />
      </Helmet>
      <PublicLayout>
        <Div>
          <Container fixed maxWidth="sm">
            <Grid container justify="center" direction="column" spacing={5}>
              <Grid item>
                <Typography variant="h6" align="center">
                  Sign up with your Google account. <br />
                  All we ask for is your name and email.
                </Typography>
              </Grid>
              <Grid item className="google-login">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_APP_CLIENT_ID || ''}
                  buttonText="Login with Google"
                  onSuccess={d => handleLogin(d['tokenId'])}
                  onFailure={d => console.log(d)}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
              <Grid item className="google-login">
                <Typography variant="body2" align="center">
                  Feeling reluctant? Checkout our <br />
                  <Link to="/tnc">Terms & Condition</Link>
                  {' and '}
                  <Link to="/privacy">Privacy Policy</Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Div>
      </PublicLayout>
    </>
  );
});

const Div = styled.div`
  .google-login {
    text-align: center;
  }
`;
