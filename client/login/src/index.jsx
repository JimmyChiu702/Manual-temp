import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from 'components/Main.jsx';

import './index.css';

window.onload = function() {
    ReactDOM.render(
        <MuiThemeProvider theme={theme}>
            <Main />
        </MuiThemeProvider>,
        document.getElementById('root')
    );
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#721f6e'
        }
    },
    typography: {
        fontFamily: [
            '"Microsoft JhengHei"',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Segoe UI Symbol"'
        ],
        fontSize: 16
    }
});