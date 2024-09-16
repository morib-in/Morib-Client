import { Component, ReactNode } from 'react';

import { AxiosError } from 'axios';

import ApiErrorFallback from '../ApiErrorFallback';

// import { ERROR_CODES } from '@/shared/constants/error';

interface GlobalErrorBoundaryProps {
	children: ReactNode;
}

interface GlobalErrorBoundaryState {
	shouldHandleError: boolean;
	error: Error | AxiosError | null;
}

class GlobalErrorBoundary extends Component<GlobalErrorBoundaryProps, GlobalErrorBoundaryState> {
	constructor(props: GlobalErrorBoundaryProps) {
		super(props);
		this.state = {
			shouldHandleError: false,
			error: null,
		};
	}

	static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
		// 에러를 캐치하고 상태를 업데이트
		return {
			shouldHandleError: true,
			error,
		};
	}

	resetError = () => {
		this.setState({
			shouldHandleError: false,
			error: null,
		});
	};

	render() {
		const { shouldHandleError, error } = this.state;

		if (!shouldHandleError) {
			return this.props.children;
		}

		// Todo: 실제 UI가 나오면 fallback에 적용하기
		// // 네트워크 에러 처리
		// if (
		// 	error instanceof AxiosError &&
		// 	error.response?.status &&
		// 	error.request.status === ERROR_CODES.INTERNAL_SERVER_ERROR
		// ) {
		// 	return <NetworkError onClickRetry={this.resetError} />;
		// }

		// // 서버 점검 에러 처리
		// if (
		// 	error instanceof AxiosError &&
		// 	error.response?.status &&
		// 	error.request.status === ERROR_CODES.SERVICE_UNAVAILABLE
		// ) {
		// 	return <Maintenance />;
		// }

		// 알 수 없는 에러 처리
		// return <UnknownError onClickRetry={this.resetError} />;

		if (error) return <ApiErrorFallback resetError={this.resetError} />;
	}
}

export default GlobalErrorBoundary;
