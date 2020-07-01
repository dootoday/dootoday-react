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
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from '@material-ui/core';
import { RouteComponentProps, useLocation } from 'react-router-dom';
import { useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import {
  RefreshToken,
  Login as LoginRequest,
  IsAuthenticated,
} from 'utils/auth';

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
      <Div>
        <Container fixed maxWidth="sm">
          <Card className="login-card">
            <CardMedia
              className="logo"
              image="https://dootoday-assets.s3.ap-south-1.amazonaws.com/logo-200x200.png"
              title="DooToday"
            />
            <CardContent className="login-card-content">
              <GoogleLogin
                className="google-login"
                clientId={process.env.REACT_APP_GOOGLE_APP_CLIENT_ID || ''}
                buttonText="Login with Google"
                onSuccess={d => handleLogin(d['tokenId'])}
                onFailure={d => console.log(d)}
                cookiePolicy={'single_host_origin'}
              />
            </CardContent>
          </Card>
        </Container>
      </Div>
    </>
  );
});

const Div = styled.div`
  .login-card {
    margin-top: 30%;
    width: 300px;
    margin-left: auto;
    margin-right: auto;

    .logo {
      height: 230px;
      margin: 20px;
    }

    .login-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-header {
        margin-bottom: 30px;
      }

      .google-login {
        margin-bottom: 20px;
      }
    }
  }
`;
