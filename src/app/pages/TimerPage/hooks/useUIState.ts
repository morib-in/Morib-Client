import { useState } from 'react';

/**
 * 타이머 UI 상태를 관리하는 훅
 *
 * 사이드바 토글, 모립셋 가시성과 같은 UI 관련 상태를 관리.
 *
 * @returns UI 상태와 액션 함수들
 */
export function useUIState() {
	// 사이드바 관련 상태
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	// 모립셋 허용 서비스 상태
	const [isAllowedServiceVisible, setIsAllowedServiceVisible] = useState(false);

	/**
	 * 사이드바 토글 함수
	 */
	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	/**
	 * 모립셋 UI 핸들러
	 */
	const showAllowedServices = () => {
		setIsAllowedServiceVisible(true);
	};

	const hideAllowedServices = () => {
		setIsAllowedServiceVisible(false);
	};

	return {
		// 상태
		isSidebarOpen,
		isAllowedServiceVisible,

		// 액션
		actions: {
			toggleSidebar,
			showAllowedServices,
			hideAllowedServices,
		},
	};
}
