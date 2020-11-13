import React from 'react';

export function useGetResource(url: string) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [data, setData] = React.useState<string | null>(null);
	const [error, setError] = React.useState<Error | null>(null);

	React.useEffect(() => {
		getResource();
	}, []);

	async function getResource () {
		setIsLoading(true);
		setError(null);
		setData(null);
		try {
			const response = await fetch(url).catch(e => { setError(e) });
			if (response === undefined) return;
			const data = await response.text().catch(e => { setError(e) });
			if (data === undefined) return;
			setData(data);
		} catch (e) {} finally {
			setIsLoading(false);
		}
	}

	return { isLoading, error, data };
}