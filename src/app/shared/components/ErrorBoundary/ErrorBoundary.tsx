import * as Sentry from '@sentry/react';

import { Component, ErrorInfo, ReactNode } from 'react';

import { AxiosError, isAxiosError } from 'axios';

import { getErrorCategory, getErrorMessage, shouldShowFallbackUI } from '@/shared/utils/error';

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
			// 에러 카테고리를 태그로 설정하여 Sentry 대시보드에서 그룹화
			scope.setLevel('error');
			scope.setTag('errorCategory', errorCategory);

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
