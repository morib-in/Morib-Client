import { Component, ComponentType, ReactNode } from 'react';

import { AxiosError } from 'axios';

import { SHOULD_HANDLE_ERROR } from '@/shared/constants/error';

interface FallbackProps {
	error?: AxiosError;
	resetError?: () => void;
}

interface ApiErrorBoundaryProps {
	children: ReactNode;
	fallback?: ComponentType<FallbackProps>;
	handleError?: () => void;
}

interface ApiErrorBoundaryState {
	shouldHandleError: boolean;
	shouldRethrow: boolean;
	error: AxiosError | Error | null;
}

class ApiErrorBoundary extends Component<ApiErrorBoundaryProps, ApiErrorBoundaryState> {
	constructor(props: ApiErrorBoundaryProps) {
		super(props);
		this.state = {
			shouldHandleError: false,
			shouldRethrow: false,
			error: null,
		};
	}

	static getDerivedStateFromError(error: AxiosError | Error): ApiErrorBoundaryState {
		// 에러를 특정 API 에러로 가정하고 처리할 수 있는지 확인
		if (
			error instanceof AxiosError &&
			error?.response?.status &&
			SHOULD_HANDLE_ERROR.includes(error?.response?.status)
		) {
			return {
				shouldHandleError: true,
				shouldRethrow: false,
				error,
			};
		}

		// 처리할 수 없는 에러는 상위 에러 바운더리로 전달
		return {
			shouldHandleError: false,
			shouldRethrow: true,
			error,
		};
	}

	// retry
	resetError = () => {
		this.props.handleError?.();

		this.setState({
			shouldHandleError: false,
			shouldRethrow: false,
			error: null,
		});
	};

	render() {
		// Todo: 실제 UI가 나오면 fallback에 적용하기
		const { shouldHandleError, shouldRethrow, error } = this.state;
		// const { fallback: Fallback } = this.props;

		if (shouldRethrow && error) {
			throw error; // 상위 Error Boundary로 에러를 전달
		}

		if (!shouldHandleError) {
			return this.props.children; // 에러가 처리 대상이 아니면 원래의 UI를 그대로 렌더링
		}

		// // 에러에 따라 UI를 분기 처리
		// if (error instanceof AxiosError) {
		// 	return <Fallback error={error} resetError={this.resetError} />;
		// }

		if (error instanceof AxiosError) {
			return (
				<button onClick={this.resetError} className="text-3xl">
					API 에러 발생했어요~~
				</button>
			);
		}
	}
}

export default ApiErrorBoundary;
