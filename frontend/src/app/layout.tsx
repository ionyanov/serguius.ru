import { MenuBar } from '@/components/MenuBar';
import { ThemeProvider } from '@/provider/Theme';
import { Container, Grid, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Serguius.ru',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<ThemeProvider>
					<div>
						<MenuBar />
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
