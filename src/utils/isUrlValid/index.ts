export const isUrlValid = (url: string) => {
	const isUrlValid = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return isUrlValid.test(url);
};

export const normalizeUrl = (url: string) => {
	try {
		const normalizedUrl = new URL(url.includes('://') ? url : `http://${url}`).href;
		// 'https://'가 붙은 URL을 비교하기 위해 마지막 '/'를 제거
		return normalizedUrl.endsWith('/') ? normalizedUrl.slice(0, -1) : normalizedUrl;
	} catch {
		return url;
	}
};
