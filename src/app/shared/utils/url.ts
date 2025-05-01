/**
 * 주어진 URL에서 주요 도메인(예: "naver", "google")을 추출
 * @param {string} url - 추출할 URL 문자열.
 * @returns {string} - URL에서 추출한 주요 도메인, 유효하지 않은 URL인 경우 빈 문자열 반환.
 */
export const getMainDomain = (url: string) => {
	try {
		const { hostname } = new URL(url);

		const cleanedHostname = hostname.replace(/^www\./, '');

		const domainParts = cleanedHostname.split('.');

		return domainParts[0];
	} catch (error) {
		console.error('유효하지 않은 URL입니다:', error);
		return '';
	}
};

export const getBaseUrl = (url: string): string => {
	try {
		const urlObj = new URL(url);
		return urlObj.origin;
	} catch (error) {
		return url;
	}
};
