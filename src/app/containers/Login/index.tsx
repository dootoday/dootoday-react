/**
 *
 * Login
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
// import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { Button } from '@material-ui/core';
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
        <LoginManager />
        <Button
          onClick={() =>
            auth.login(() => {
              props.history.push('/');
            })
          }
        >
          {' '}
          Test Login{' '}
        </Button>
      </Div>
    </>
  );
});

const Div = styled.div`
  margin: auto;
`;
