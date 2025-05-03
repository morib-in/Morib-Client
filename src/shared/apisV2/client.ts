import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { getAccessToken, reloginWithoutLogout, setAccessToken } from '@/shared/utils/auth';

import { postReissueToken } from '@/shared/apisV2/auth/auth.api';

export const API_URL = `${import.meta.env.VITE_BASE_URL}`;

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
		const accessToken = getAccessToken();
		config.headers.Authorization = `Bearer ${accessToken}`;
		config.withCredentials = true;
		return config;
	});

	axiosClient.interceptors.response.use(
		(response) => {
			return response;
		},
		async (e) => {
			const prevRequest = e.config;
			if (e.response && e.response.status === 401 && !prevRequest.sent) {
				prevRequest.sent = true;
				// 401 에러가 떴을 때 토큰 재발급
				try {
					// NOTE: 추후에 로컬스토리지에 저장된 refreshToken을 사용하게끔 고치는 것이 필요할수있음
					const { data } = await postReissueToken();
					setAccessToken(data.accessToken);
					return axiosClient(prevRequest);
				} catch (reissueError) {
					reloginWithoutLogout();
				}
			}
			return Promise.reject(e);
		},
	);
};

// 클라이언트 생성 함수
const createAxiosClient = (additionalConfig: AxiosRequestConfig = {}, withAuth: boolean = false): AxiosInstance => {
	const axiosClient = createBaseClient(additionalConfig);

	if (withAuth) {
		addAuthInterceptor(axiosClient);
	}

	return axiosClient;
};

// 일반 요청 클라이언트 (토큰 불필요)
const nonAuthClient: AxiosInstance = createAxiosClient();

// 인증 요청 클라이언트 (토큰 필요)
const authClient: AxiosInstance = createAxiosClient({}, true);

export { authClient, nonAuthClient };
