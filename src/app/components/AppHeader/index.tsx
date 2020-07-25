/**
 *
 * AppHeader
 *
 */
import React, { memo, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import {
  AppBar,
  Toolbar,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { UserDetails } from 'app/containers/AppLayout/types';

interface Props {
  userFetched?: boolean;
  userDetails?: UserDetails;
  handleLogout?: () => void;
}

export const AppHeader = memo((props: Props) => {
  const { userFetched, userDetails, handleLogout } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  return (
    <Div>
      <AppBar position="static" elevation={0}>
        <Toolbar variant="dense" className="tool-bar">
          <Link to="/">
            <img
              className="header-logo"
              src="https://dootoday-assets.s3.ap-south-1.amazonaws.com/logo-bw-horiz.png"
              alt="dootoday"
            />
          </Link>
          {userFetched && (
            <>
              <IconButton
                onClick={handleToggle}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
              >
                <Avatar
                  variant="rounded"
                  className="avatar-logo"
                  alt={userDetails?.firstName}
                  src={userDetails?.avatar}
                />
              </IconButton>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{
                  zIndex: 3,
                }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <Link
                            to="/me"
                            className="menu-item"
                            onClick={handleClose}
                          >
                            <MenuItem>Profile</MenuItem>
                          </Link>
                          <Link
                            to="/me/subscription"
                            className="menu-item"
                            onClick={handleClose}
                          >
                            <MenuItem>Subscription</MenuItem>
                          </Link>
                          <Link
                            to="/me/theme"
                            className="menu-item"
                            onClick={handleClose}
                          >
                            <MenuItem>Theme</MenuItem>
                          </Link>
                          <MenuItem
                            className="menu-item"
                            onClick={() => handleLogout && handleLogout()}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Div>
  );
});

const Div = styled.div``;
