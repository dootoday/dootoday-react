/**
 *
 * LoginManager
 *
 */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import GoogleLogin from 'react-google-login';
import { Dialog, Button, DialogTitle } from '@material-ui/core';

interface Props {}

export function LoginManager(props: Props) {
  const [logDialogOpen, setLoginDialogOpen] = useState(false);
  return (
    <Div>
      <Button onClick={e => setLoginDialogOpen(true)}>Login</Button>
      <Dialog open={logDialogOpen} onClose={e => setLoginDialogOpen(false)}>
        <DialogTitle>Login with your google account</DialogTitle>
        <GoogleLogin
          clientId="993135218200-vtom5mj6hhtki1nd9nd5p7rovr702e99.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={d => console.log(d)}
          onFailure={d => console.log(d)}
          cookiePolicy={'single_host_origin'}
        />
      </Dialog>
    </Div>
  );
}

const Div = styled.div``;
