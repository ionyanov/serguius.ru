/** @format */

import { getCategory } from '@/api/getCategory';
import { MenuBar } from '@/components/MenuBar';
import { CategoryLayoutProps, CategoryPageProps } from '@/types/type';

export async function generateMetadata({ params }: CategoryPageProps) {
	let category = await getCategory(params.category).then((res) => res?.name);
	return {
		title: category,
	};
}

export default async function RootLayout({ children, params }: CategoryLayoutProps) {
	let category = await getCategory(params.category).then((res) => res?.name);
	return (
		<div>
			<MenuBar categoryslug={params.category} categorytitle={category} />
			{children}
		</div>
	);
}
