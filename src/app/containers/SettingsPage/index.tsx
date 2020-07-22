/**
 *
 * SettingsPage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectSettingsPage } from './selectors';
import { settingsPageSaga } from './saga';
import {
  Container,
  Grid,
  List,
  ListItem,
  Divider,
  ListItemText,
} from '@material-ui/core';

interface Props {}

export const SettingsPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: settingsPageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const settingsPage = useSelector(selectSettingsPage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>SettingsPage</title>
        <meta name="description" content="Description of SettingsPage" />
      </Helmet>
      <Container maxWidth="md">
        <Div>
          <Grid container spacing={1} direction="row">
            <Grid item container md={4} lg={4} sm={12}>
              <List component="nav" className="nav-list" aria-label="settings">
                <ListItem button>
                  <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary="Drafts" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Trash" />
                </ListItem>
                <Divider light />
                <ListItem button>
                  <ListItemText primary="Spam" />
                </ListItem>
              </List>
            </Grid>
            <Grid item container md={8} lg={8} sm={12}>
              <div>This is the content</div>
            </Grid>
          </Grid>
        </Div>
      </Container>
    </>
  );
});

const Div = styled.div`
  margin-top: 30px;
  min-height: calc(100vh - 127px);

  .nav-list {
    width: 100%;
  }
`;
