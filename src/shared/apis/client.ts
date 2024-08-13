import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ROUTES } from '@/shared/constants/router';
import { getAccessTotken } from '@/shared/utils/token';

// import { reissueToken } from './auth/axios';

const API_URL = `${import.meta.env.VITE_BASE_URL}`;

const defaultConfig: AxiosRequestConfig = {
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
};

// 기본 설정을 적용한 axios 인스턴스 생성 함수
const createBaseClient = (additionalConfig: AxiosRequestConfig = {}): AxiosInstance => {
	const clientConfig = {
		...defaultConfig,
		...additionalConfig,
	};

	const baseClient = axios.create(clientConfig);

	return baseClient;
};

// 인증 설정을 추가하는 함수 (토큰)
const addAuthInterceptor = (axiosClient: AxiosInstance) => {
	axiosClient.interceptors.request.use(async (config) => {
		const accessToken = getAccessTotken();
		if (!accessToken) {
			window.location.href = ROUTES.login.path;
		}

		config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	});

	// Todo: 서버 이슈로 앱잼 이후 refresh 토큰 재발급 설정
	// axiosClient.interceptors.response.use(
	// 	(response) => {
	// 		return response;
	// 	},
	// 	async (e) => {
	// 		if (e.response.status === 401) {
	// 			// 401 에러가 떴을 때 토큰 재발급
	// 			try {
	// 				reissueToken();
	// 			} catch (reissueError) {
	// 				window.location.href = ROUTES.login.path;
	// 			}
	// 		}
	// 		return Promise.reject(e);
	// 	},
	// );
};

// 폼 데이터 설정을 추가하는 함수
const setFormDataContentType = (axiosClient: AxiosInstance) => {
	axiosClient.defaults.headers['Content-Type'] = 'multipart/form-data';
};

// 클라이언트 생성 함수
const createAxiosClient = (
	additionalConfig: AxiosRequestConfig = {},
	withAuth: boolean = false,
	withFormData: boolean = false,
): AxiosInstance => {
	const axiosClient = createBaseClient(additionalConfig);

	if (withAuth) {
		addAuthInterceptor(axiosClient);
	}

	if (withFormData) {
		setFormDataContentType(axiosClient);
	}

	return axiosClient;
};

// 일반 요청 클라이언트 (토큰 불필요)
const nonAuthClient: AxiosInstance = createAxiosClient();

// 인증 요청 클라이언트 (토큰 필요)
const authClient: AxiosInstance = createAxiosClient({}, true);

// 인증 및 폼 데이터 전송 클라이언트 (토큰 필요 + 사진 전송)
const authFormDataClient: AxiosInstance = createAxiosClient({}, true, true);

export { authClient, nonAuthClient, authFormDataClient };
