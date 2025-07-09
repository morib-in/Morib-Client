import dayjs from 'dayjs';

import React, { ReactNode, createContext, useContext, useEffect } from 'react';

import { DATE_FORMAT, TIMEZONE } from '@/shared/constants/timerPageText';

import { useAllowedServices } from '../hooks/useAllowedServices';
import { useBrowserMonitor } from '../hooks/useBrowserMonitor';
import { useTimerActions } from '../hooks/useTimerActions';
import { useTimerState } from '../hooks/useTimerState';
import { useUIState } from '../hooks/useUIState';

/**
 * 타이머 컨텍스트 타입 정의
 */
interface TimerContextType {
	todayFormattedDate: string;
	timer: number;
	elapsedTime: number;
	totalElapsedTimeOfToday: number;
	isPlaying: boolean;
	selectedTask: {
		id: number | null;
		name: string;
		categoryName: string;
	};
	isSidebarOpen: boolean;
	isAllowedServiceVisible: boolean;
	allowedServices: {
		registeredNames: string[];
		allowedSiteUrls: string[];
		baseUrls: string[];
	};
	// URL 모니터링 상태 추가
	browserMonitor: {
		isActive: boolean;
		lastUnallowedUrl: string | null;
	};
	actions: {
		togglePlay: (isPlaying: boolean) => void;
		updateElapsedTime: (newTime: number) => void;
		selectTask: (id: number, time: number, name: string, categoryName: string) => void;
		toggleSidebar: () => void;
		showAllowedServices: () => void;
		hideAllowedServices: () => void;
		stopCurrentTimer?: (taskId: number) => Promise<boolean | undefined>;
		// URL 모니터링 액션 추가
		startUrlMonitoring: () => void;
		stopUrlMonitoring: () => void;
		registerAllowedService: (url: string) => void;
	};
}

/**
 * 타이머 컨텍스트 생성
 */
const TimerContext = createContext<TimerContextType | undefined>(undefined);

/**
 * 타이머 컨텍스트 사용을 위한 커스텀 훅
 */
export const useTimerContext = () => {
	const context = useContext(TimerContext);
	if (!context) {
		throw new Error('useTimerContext must be used within a TimerProvider');
	}
	return context;
};

interface TimerProviderProps {
	children: ReactNode;
}

/**
 * 타이머 컨텍스트 프로바이더
 */
export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
	// 날짜 포맷 설정
	const todayDate = dayjs().tz(TIMEZONE);
	const todayFormattedDate = todayDate.format(DATE_FORMAT);

	// 타이머 상태 관리 훅
	const timerState = useTimerState(todayFormattedDate);
	const { timer, elapsedTime, totalElapsedTimeOfToday, selectedTask, isPlaying, updateElapsedTime } = timerState;

	// UI 상태 관리
	const uiState = useUIState();
	const { isSidebarOpen, isAllowedServiceVisible, actions: uiActions } = uiState;

	// 허용 서비스 관리
	const allowedServices = useAllowedServices();

	// 액션 관리
	const timerActions = useTimerActions(todayFormattedDate, {
		...timerState,
		selectedTask,
		isPlaying,
	});

	// 브라우저 URL 모니터링 훅
	// 허용 서비스 목록 처리 - 중복 제거 및 형식 통일
	const processedAllowedServices = [
		// 기본 도메인 배열
		...allowedServices.baseUrls,
	];

	// 브라우저 모니터링 훅 초기화
	const browserMonitor = useBrowserMonitor({
		allowedServices: processedAllowedServices,
		isTimerActive: isPlaying,
		onStopTimer: async () => {
			// 타이머 정지 로직
			try {
				// 타이머가 활성화 상태이고 선택된 작업이 있을 때만 실행
				if (isPlaying && selectedTask.id !== null) {
					if (timerActions.stopCurrentTimer) {
						console.log('타이머 중지 함수 호출 - 작업 ID:', selectedTask.id);

						// 타이머 중지 함수 동기적으로 호출
						const result = await timerActions.stopCurrentTimer(selectedTask.id);
						console.log('타이머 중지 완료:', result);
						return true;
					} else {
						console.error('타이머 중지 함수가 없습니다!');
					}
				} else {
					console.log('타이머를 중지할 필요가 없습니다. isPlaying:', isPlaying, 'selectedTask.id:', selectedTask.id);
				}
			} catch (error) {
				console.error('타이머 중지 중 예외 발생:', error);
			}
			return false;
		},
		onStartTimer: () => {
			timerActions.togglePlay(true);
		},
	});

	// Context 값 구성
	const contextValue: TimerContextType = {
		todayFormattedDate,
		timer,
		elapsedTime,
		totalElapsedTimeOfToday,
		isPlaying,
		selectedTask,
		isSidebarOpen,
		isAllowedServiceVisible,
		allowedServices,
		browserMonitor: {
			isActive: browserMonitor.isActive,
			lastUnallowedUrl: browserMonitor.lastUnallowedUrl,
		},
		actions: {
			togglePlay: timerActions.togglePlay,
			updateElapsedTime,
			selectTask: timerActions.selectTask,
			toggleSidebar: uiActions.toggleSidebar,
			showAllowedServices: uiActions.showAllowedServices,
			hideAllowedServices: uiActions.hideAllowedServices,
			stopCurrentTimer: timerActions.stopCurrentTimer,
			startUrlMonitoring: browserMonitor.startMonitoring,
			stopUrlMonitoring: browserMonitor.stopMonitoring,
			registerAllowedService: browserMonitor.registerAllowedService,
		},
	};

	return <TimerContext.Provider value={contextValue}>{children}</TimerContext.Provider>;
};
