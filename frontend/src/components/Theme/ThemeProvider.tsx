'use client';
import { type FC, type ReactNode } from 'react';
import { ThemeProvider as MUThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { NCSTheme } from './NCSTheme';

interface ThemeProviderProps {
	children?: ReactNode | any;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
	return (
		<MUThemeProvider theme={NCSTheme}>
			<CssBaseline />
			{children}
		</MUThemeProvider>
	);
};
