import * as Sentry from '@sentry/react';

import { Component, ErrorInfo, ReactNode } from 'react';

import { AxiosError, isAxiosError } from 'axios';

import { getErrorCategory, shouldShowFallbackUI } from '@/shared/utils/error';
import { getErrorMessage } from '@/shared/utils/error';

import FallbackApiError from '../FallbackApiError/FallbackApiError';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	caughtError: Error | AxiosError | null;
	showFallbackUI: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			caughtError: null,
			showFallbackUI: false,
		};
	}

	static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
		return {
			hasError: true,
			caughtError: error,
			showFallbackUI: shouldShowFallbackUI(error),
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const errorCategory = getErrorCategory(error);

		Sentry.withScope((scope) => {
			// 에러 카테고리를 태그로 설정하여 Sentry 대시보드에서 그룹화에 도움을 줍니다.
			scope.setLevel('error');
			scope.setTag('errorCategory', errorCategory);

			// AxiosError인 경우 API 요청/응답 세부 정보를 추가 컨텍스트로 설정합니다.
			if (isAxiosError(error) && error.config) {
				const { method, url, params, data: requestData, headers } = error.config;
				scope.setContext('API Request Details', {
					method,
					url,
					params,
					requestData,
					headers,
				});
				if (error.response) {
					const { data, status } = error.response;
					scope.setContext('API Response Details', { data, status });
				}
			}

			// 에러 발생 시점의 추가 정보를 함께 전달합니다.
			scope.setExtras({ componentStack: errorInfo.componentStack });
			Sentry.captureException(error);
		});
	}

	resetErrorBoundary = () => {
		this.setState({
			hasError: false,
			caughtError: null,
			showFallbackUI: false,
		});
	};

	render() {
		const { hasError, caughtError, showFallbackUI } = this.state;

		if (!hasError) {
			return this.props.children;
		}

		if (caughtError) {
			console.warn('[ErrorBoundary caught an error]:', getErrorMessage(caughtError));
		}

		// fallback UI가 필요한 경우 (서버 오류, 네트워크 오류 등)
		if (showFallbackUI) {
			return <FallbackApiError resetError={this.resetErrorBoundary} />;
		}
	}
}

export default ErrorBoundary;
