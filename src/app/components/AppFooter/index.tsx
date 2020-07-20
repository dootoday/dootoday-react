import * as React from 'react';
import CopyrightIcon from '@material-ui/icons/Copyright';
import FavoriteIcon from '@material-ui/icons/Favorite';
import styled from 'styled-components/macro';

const AppFooter: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <Footer>
      <div className="footer-container">
        Made with <FavoriteIcon className="icon favorite-icon" /> in India{' '}
        <CopyrightIcon className="icon" /> {year} DooToday All rights reserved
      </div>
    </Footer>
  );
};

export default AppFooter;

const Footer = styled.div`
  border-top: solid #9c9c9c2e 1px;
  min-height: 50px;
  padding: 20px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  .footer-container {
    text-align: center;
    color: #bfbfbf;
    font-size: 12px;
    .icon {
      font-size: 12px;
    }
    .favorite-icon {
      color: #f31d11b0;
    }
  }
`;
