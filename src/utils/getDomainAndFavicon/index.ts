export const getDomainAndFavicon = (url: string) => {
	try {
		const urlObj = new URL(url);
		let domainName = urlObj.hostname;

		const faviconUrl = `https://www.google.com/s2/favicons?domain=${domainName}`;

		const domainParts = domainName.split('.');
		if (domainParts.length > 1) {
			domainName = domainParts[0];
		}

		return { domainName, faviconUrl };
	} catch (error) {
		console.error('Invalid URL');
		return { domainName: '', faviconUrl: '' };
	}
};
