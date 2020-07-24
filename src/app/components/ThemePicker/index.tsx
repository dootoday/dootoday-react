/**
 *
 * ThemePicker
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import { Grid, Paper, ButtonBase } from '@material-ui/core';
import { ThemeResponse } from 'utils/datatypes';

interface Props {
  // themes is the list of themes preset
  themes: ThemeResponse[];

  // selectedTheme is the selected item
  selectedTheme: ThemeResponse;

  // onSelectTheme is the event when a theme is selected
  onSelectTheme?: (theme: ThemeResponse) => void;
}

export const ThemePicker = memo((props: Props) => {
  const { themes, selectedTheme, onSelectTheme } = props;
  return (
    <Div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={3}>
            {themes.map(th => {
              const { theme, id } = th;
              return (
                <Grid item key={id}>
                  <ButtonBase
                    onClick={() => {
                      onSelectTheme && onSelectTheme(th);
                    }}
                  >
                    <Paper
                      className={`color-plate ${
                        id === selectedTheme.id ? 'active' : ''
                      }`}
                      style={{ backgroundColor: theme.palette.primary.main }}
                    ></Paper>
                  </ButtonBase>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Div>
  );
});

const Div = styled.div`
  .color-plate {
    height: 40px;
    width: 60px;
    &.active {
      border: 2px solid;
    }
  }
`;
