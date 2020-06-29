/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import {
  Button,
  Container,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { LoginManager } from 'app/components/LoginManager';
import { useInjectSaga } from 'utils/redux-injectors';
import { loginSaga } from './saga';
import auth from 'utils/auth';

interface Props extends RouteComponentProps<any> {}

export const Login = memo((props: Props) => {
  useInjectSaga({ key: 'login', saga: loginSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { t, i18n } = useTranslation();

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
            <CardContent className="login-card-content">
              <Typography variant="h6" className="card-header">
                Login to DooTooday
              </Typography>
              <LoginManager />
              <Button
                onClick={() =>
                  auth.login(() => {
                    props.history.push('/');
                  })
                }
              >
                Test Login
              </Button>
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

    .login-card-content {
      display: flex;
      flex-direction: column;
      align-items: center;

      .card-header {
        margin-bottom: 30px;
      }
    }
  }
`;
