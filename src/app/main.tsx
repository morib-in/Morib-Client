import * as Sentry from '@sentry/react';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { isAxiosError } from 'axios';

import App from './App.tsx';
import './index.css';
import { getErrorCategory } from './shared/utils/error.ts';

// NOTE: 서버 개발 완료로 잠시 주석처리
async function enableMocking() {
	// if (import.meta.env.DEV) {
	// 	const { worker } = await import('./mocks/browser');
	// 	return worker.start();
	// }
}

Sentry.init({
	dsn: import.meta.env.VITE_SENTRY_DSN,
	integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
	// Tracing
	tracesSampleRate: 1.0, // 트랜잭션 100% 캡쳐

	// NOTE: 분산 추적을 위한 대상 도메인 설정
	tracePropagationTargets: [
		'localhost',
		// 클라이언트 도메인 (morib.in 또는 www.morib.in)
		/^https:\/\/(www\.)?morib\.in/,
		// 서버 API 도메인 (api.morib.in의 /api로 시작하는 요청)
		/^https:\/\/api\.morib\.in\/api/,
	],

	/*
	 * 비동기 오류의 경우 센트리 글로벌 캡쳐가 error boundary 도달하기 전에 캡쳐하기 때문에,
	 * tag나 context를 설정하기 위해서 beforeSend 활용
	 */
	beforeSend(event, hint) {
		const error = hint.originalException;
		if (error instanceof Error || isAxiosError(error)) {
			const category = getErrorCategory(error);
			event.tags = { ...event.tags, errorCategory: category };
		}
		if (isAxiosError(error) && error.config) {
			const { method, url, params, data: requestData, headers } = error.config;
			event.contexts = {
				...event.contexts,
				'API 요청 디테일': { method, url, params, requestData, headers },
			};
			if (error.response) {
				const { data, status } = error.response;
				event.contexts['API 응답 디테일'] = { data, status };
			}
		}
		return event;
	},
});

const container = document.getElementById('root');
const root = createRoot(container!);

enableMocking().then(() => {
	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
});
