import React, { useState } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import teal from '@material-ui/core/colors/teal';

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: teal,
        secondary: {
          main: '#ff5722',
        },
    }
});

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: teal,
        secondary: {
          main: '#ff5722',
        },
    }
});

const Theme = (props) => {
    const { children, darkMode } = props;
    let selectedTheme = darkMode ? darkTheme : lightTheme;
    
    console.log(selectedTheme);
    
    return <ThemeProvider theme={selectedTheme} > {children} </ThemeProvider>;
};

export const withTheme = (Component) => {
    return (props) => {
        const [ darkMode, setDarkMode ] = useState(false);
        return (
            <Theme darkMode={darkMode}>
                <Component {...props} darkMode={darkMode} setDarkMode={setDarkMode} />
            </Theme>
        );
    };
};