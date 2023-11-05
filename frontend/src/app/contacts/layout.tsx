/** @format */

import { MenuBar } from '@/components/MenuBar';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<MenuBar categoryslug={'contact'} categorytitle={'Contacts'} />
			{children}
		</div>
	);
}
