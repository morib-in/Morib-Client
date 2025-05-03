import dayjs from 'dayjs';

import React, { ReactNode, createContext, useContext } from 'react';

import { DATE_FORMAT, TIMEZONE } from '@/shared/constants/timerPageText';

import { useAllowedServices } from '../hooks/useAllowedServices';
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
	actions: {
		togglePlay: (isPlaying: boolean) => void;
		updateElapsedTime: (newTime: number) => void;
		selectTask: (id: number, time: number, name: string, categoryName: string) => void;
		toggleSidebar: () => void;
		showAllowedServices: () => void;
		hideAllowedServices: () => void;
		stopCurrentTimer?: (taskId: number) => Promise<boolean | undefined>;
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
		actions: {
			togglePlay: timerActions.togglePlay,
			updateElapsedTime,
			selectTask: timerActions.selectTask,
			toggleSidebar: uiActions.toggleSidebar,
			showAllowedServices: uiActions.showAllowedServices,
			hideAllowedServices: uiActions.hideAllowedServices,
			stopCurrentTimer: timerActions.stopCurrentTimer,
		},
	};

	return <TimerContext.Provider value={contextValue}>{children}</TimerContext.Provider>;
};
