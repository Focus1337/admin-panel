import React from "react";
import { createTheme } from '@mui/material/styles';
import { defaultTheme } from "react-admin";

export const lightTheme = {
  palette: {
      primary: {
          main: '#4f3cc9',
      },
      secondary: {
          light: '#5f5fc4',
          main: '#283593',
          dark: '#001064',
          contrastText: '#fff',
      },
      background: {
          default: '#fcfcfe',
      },
  },
  shape: {
      borderRadius: 10,
  },
  sidebar: {
      width: 200,
  },
  components: {
      ...defaultTheme.components,
      RaMenuItemLink: {
          styleOverrides: {
              root: {
                  borderLeft: '3px solid #fff',
                  '&.RaMenuItemLink-active': {
                      borderLeft: '3px solid #4f3cc9',
                  },
              },
          },
      },
      MuiPaper: {
          styleOverrides: {
              elevation1: {
                  boxShadow: 'none',
              },
              root: {
                  border: '1px solid #e0e0e3',
                  backgroundClip: 'padding-box',
              },
          },
      },
      MuiAppBar: {
          styleOverrides: {
              colorSecondary: {
                  color: '#808080',
                  backgroundColor: '#fff',
              },
          },
      },
      MuiLinearProgress: {
          styleOverrides: {
              colorPrimary: {
                  backgroundColor: '#f5f5f5',
              },
              barColorPrimary: {
                  backgroundColor: '#d7d7d7',
              },
          },
      },
  },
};