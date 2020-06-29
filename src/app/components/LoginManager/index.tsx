/**
 *
 * LoginManager
 *
 */
import React from 'react';
import styled from 'styled-components/macro';
import GoogleLogin from 'react-google-login';

interface Props {}

export function LoginManager(props: Props) {
  return (
    <Div>
      <GoogleLogin
        clientId="993135218200-vtom5mj6hhtki1nd9nd5p7rovr702e99.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={d => console.log(d)}
        onFailure={d => console.log(d)}
        cookiePolicy={'single_host_origin'}
      />
    </Div>
  );
}

const Div = styled.div``;
