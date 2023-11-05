export enum Settings {
	TITLE = 'Title',
	KEYWORDS = 'Keywords',
	BOOSTY = 'Boosty',
	EMAIL = 'Email',
	PHONE = 'Phone',
}

export async function getSettings(settings: Settings): Promise<string> {
	const result: string = await fetch(`${process.env._API_URL_}/settings/${settings}`)
		.then(res => {
			if (res.ok) return res.text();
			return ''
		});
	return result
}