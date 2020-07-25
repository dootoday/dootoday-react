import * as React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components/macro';
import { Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const AppFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <Footer>
      <Grid container justify="space-between">
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="caption">
                <Link to="/aboutus"> About us </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                <Link to="/privacy"> Privacy Policy </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className="footer-container" variant="caption">
            Made with <FavoriteIcon className="icon favorite-icon" /> in India{' '}
            <CopyrightIcon className="icon" />
            {year} DooToday All rights reserved
          </Typography>
        </Grid>
      </Grid>
    </Footer>
  );
};

const Footer = styled.div`
  border-top: solid #9c9c9c2e 1px;
  min-height: 50px;
  padding: 20px;
  .footer-container {
    .icon {
      font-size: 16px;
    }
    .favorite-icon {
      color: #f31d11b0;
    }
  }
`;
