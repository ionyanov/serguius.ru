/** @format */

import { Settings, getSettings } from '@/api/getSettings';
import { ThemeProvider } from '@/components/Theme';
import type { Metadata } from 'next';

const title = await getSettings(Settings.TITLE);
const keywords = await getSettings(Settings.KEYWORDS);

export const metadata: Metadata = {
	title: { default: title ?? 'Serguius.ru', template: `%s | ${title ?? 'Serguius.ru'}` },
	keywords: keywords ?? '',
};

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html>
			<body style={{ width: '100%' }}>
				<ThemeProvider>{props.children}</ThemeProvider>
			</body>
		</html>
	);
}
