import { type FC, type ReactNode } from 'react';
import { ThemeProvider as MUThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { NCSTheme } from './NCSTheme';

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
