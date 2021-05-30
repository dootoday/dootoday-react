import * as React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components/macro';
import { Grid, Typography, createMuiTheme, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import { Link } from 'react-router-dom';

interface Props {
  theme?: Theme;
}

export const AppFooter = (props: Props) => {
  // const year = new Date().getFullYear();
  const theme = props.theme || createMuiTheme();
  return (
    <Footer theme={theme}>
      <Grid
        container
        className="footer-container"
        justify="space-between"
        spacing={1}
      >
        <Grid item md={8} xs={12}>
          <Grid container spacing={1} className="links">
            <Grid item>
              <Typography variant="caption">
                <Link className="footer-link" to="/aboutus">
                  About us
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link className="footer-link" to="/contact">
                  Contact Us
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link className="footer-link" to="/privacy">
                  Privacy Policy
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link className="footer-link" to="/tnc">
                  Terms and Condition
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link className="footer-link" to="/refund-policy">
                  Refund Policy
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12} className="copyright">
          <Typography variant="caption">
            Made with <FavoriteIcon className="icon favorite-icon" /> in India{' '}
            <CopyrightIcon className="icon" /> Rudolph Labs
          </Typography>
        </Grid>
      </Grid>
    </Footer>
  );
};

const Footer = styled.div<{ theme: Theme }>`
  border-top: solid #9c9c9c2e 1px;
  min-height: 50px;
  padding: 20px;
  .footer-container {
    color: ${props => props.theme.palette.primary.main};
    .copyright {
      text-align: right;
    }
    .footer-link {
      color: ${props => props.theme.palette.primary.main};
    }
    .icon {
      font-size: 14px;
    }
    .favorite-icon {
      color: ${red[400]};
    }
    @media (max-width: 960px) {
      justify-content: center;
      .links {
        justify-content: center;
      }
      .copyright {
        text-align: center;
      }
    }
  }
`;
