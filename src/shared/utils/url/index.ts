export const getBaseUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return urlObj.origin;
	} catch (error) {
		return url;
	}
};
