/** @format */

import { ThemeProvider } from '@/components/Theme';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: { default: 'Serguius.ru', template: '%s | Serguius.ru' },
	description:
		'Агасарян Кирсанов Продам Куплю Картины Современные художники Московский художник Художники Рисунки Искусство Галереи Живопись Фреска Графика Фотографии Иконы Интерьеры Роспись Узоры Дизайн Ремонт Офорты Гравюры Орнаменты Витражи Копии Портреты Пейзажи Резьба по дереву Agasaryen Agasaryan',
};

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html>
			<body>
				<ThemeProvider>{props.children}</ThemeProvider>
			</body>
		</html>
	);
}
