import { AxiosError, isAxiosError } from 'axios';

import type { ApiErrorResponseType } from '../types/api/error';

/**
 * HTTP 상태 코드에 따라 사용자에게 보여줄 에러 메시지를 반환
 * fallbackMessage가 있으면 기본값으로 사용
 */
export const mapStatusToMessage = (status: number, fallbackMessage?: string): string => {
	switch (status) {
		case 401:
			return '권한이 없습니다. 로그인해주세요.';
		case 403:
			return '이 페이지에 접근할 권한이 없습니다.';
		case 404:
			return '요청한 자원을 찾을 수 없습니다.';
		case 429:
			return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
		case 500:
			return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
		case 503:
			return '현재 서비스 이용이 불가능합니다. 잠시 후 다시 시도해주세요.';
		default:
			return fallbackMessage || `예상치 못한 오류가 발생했습니다 (상태 코드: ${status}).`;
	}
};

/*
 * 주어진 에러가 fallback UI(예: FallbackApiError)를 표시해야 하는지 결정
 */
export const getErrorMessage = (error: AxiosError | Error): string => {
	// AxiosError인 경우 처리
	if (isAxiosError(error)) {
		const axiosError = error as ApiErrorResponseType;
		if (axiosError.response) {
			const { status, message } = axiosError.response.data;
			return mapStatusToMessage(status, message);
		} else {
			// 응답(response)이 없는 경우: 네트워크 오류, CORS 문제 등
			return '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
		}
	} else {
		// AxiosError가 아닌 일반 Error인 경우
		return error.message || '알 수 없는 오류가 발생했습니다.';
	}
};

/*
 * 주어진 에러가 fallback UI(예: FallbackApiError)를 표시해야 하는지 결정
 */
export const shouldShowFallbackUI = (error: Error): boolean => {
	if (isAxiosError(error)) {
		const axiosError = error as AxiosError;
		if (axiosError.response) {
			const status = axiosError.response.status;
			// 400 ~ 499는 클라이언트 오류로 간주하여 인라인 메시지로 처리
			return !(status >= 400 && status < 500);
		}
		// 응답이 없으면 네트워크 오류 등으로 fallback UI 표시
		return true;
	}
	// AxiosError가 아닌 경우 fallback UI 표시
	return true;
};

/*
 * 에러를 분류하여 문자열 형태의 에러 카테고리를 반환 (sentry 태그로 활용)
 * - 400번대 오류: "client"
 * - 500번대 오류: "server"
 * - 응답이 없는 경우:
 *    - 메시지에 "cors"가 포함되어 있으면 "cors"
 *    - 그 외는 "network"
 * - AxiosError가 아닌 경우는 "other"
 */
export const getErrorCategory = (error: AxiosError | Error): string => {
	if (isAxiosError(error)) {
		const axiosError = error as AxiosError;
		if (axiosError.response) {
			const status = axiosError.response.status;
			if (status >= 400 && status < 500) {
				return 'client';
			} else if (status >= 500) {
				return 'server';
			}
		} else {
			if (error.message.toLowerCase().includes('cors')) {
				return 'cors';
			}
			return 'network';
		}
	}
	return 'other';
};
