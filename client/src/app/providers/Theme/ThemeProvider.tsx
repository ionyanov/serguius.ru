import { type FC, type ReactNode } from 'react';
import { NCSTheme } from './NCSTheme';
import { ThemeProvider as MUThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

interface ThemeProviderProps {
    children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    return (
        <MUThemeProvider theme={NCSTheme}>
            <CssBaseline />
            {props.children}
        </MUThemeProvider>
    );
};
