import { AxiosError } from 'axios';

export const getErrorMessage = (error: AxiosError): string | null => {
	const status = error?.response?.status;

	switch (status) {
		case 401:
			return '권한이 없습니다. 다시 로그인해주세요.';
			break;
		case 403:
			return '이 자원에 접근할 권한이 없습니다.';
			break;
		case 404:
			return '요청한 자원을 찾을 수 없습니다.';
			break;
		case 429:
			return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
			break;
		case 500:
			return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
			break;
		case 503:
			return '현재 서비스 이용이 불가능합니다. 잠시 후 다시 시도해주세요.';
			break;
		default:
			return `예상치 못한 오류가 발생했습니다 (상태 코드: ${status}).`;
	}
};
