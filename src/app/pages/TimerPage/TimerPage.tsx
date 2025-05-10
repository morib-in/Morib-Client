import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { splitTasksByCompletion } from '@/shared/utils/timer';

import { useGetSelectedTimerTask, useGetTimerTodos } from '@/shared/apisV2/timer/timer.queries';

import AllowedServicesPopover from './AllowedServices/AllowedServicesPopover';
import AllowedServicesTitle from './AllowedServices/AllowedServicesTitle';
import Carousel from './Carousel/Carousel';
import MainTimer from './MainTimer/MainTimer';
import NavigationButtons from './NavigationButtons/NavigationButtons';
import SideMenuTimer from './SideMenuTimer/SideMenuTimer';
import { TimerProvider, useTimerContext } from './contexts/TimerContext';

// 날짜 설정 플러그인 초기화
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 타이머 페이지 컨텐츠 컴포넌트
 * TimerProvider 내부에서 렌더링되어 Context에 접근
 */
const TimerPageContent = () => {
	const navigate = useNavigate();
	const {
		todayFormattedDate,
		isSidebarOpen,
		isAllowedServiceVisible,
		allowedServices,
		isPlaying,
		selectedTask,
		browserMonitor,
		actions,
	} = useTimerContext();

	// 할일 데이터 조회
	const { data: todosData } = useGetTimerTodos({ targetDate: todayFormattedDate });

	// 할일 목록 파싱 - useMemo로 불필요한 재계산 방지
	const { ongoingTodos, completedTodos } = useMemo(() => {
		// data?.task가 없으면 빈 배열 반환
		const todos = todosData?.data?.task ?? [];
		return splitTasksByCompletion(todos);
	}, [todosData]);

	const { data: selectedTimerTaskData, isError: isSelectedTimerTaskError } = useGetSelectedTimerTask({
		targetDate: todayFormattedDate,
	});

	// 허용되지 않은 URL 감지 시 처리
	const handleRegisterAllowedService = useCallback(
		(url: string) => {
			// 허용 서비스로 등록
			actions.registerAllowedService(url);

			// 허용 서비스 팝업 표시
			actions.showAllowedServices();
		},
		[actions],
	);

	// 홈 네비게이션 핸들러
	const navigateToHome = useCallback(async () => {
		try {
			// 타이머가 실행 중인 경우 먼저 정지
			if (isPlaying && selectedTask.id !== null && actions.stopCurrentTimer) {
				await actions.stopCurrentTimer(selectedTask.id);
			}

			// URL 모니터링 중지
			if (browserMonitor.isActive) {
				actions.stopUrlMonitoring();
			}

			navigate('/home');
		} catch (error) {
			console.error('홈으로 이동 중 오류 발생:', error);
		}
	}, [isPlaying, selectedTask.id, browserMonitor.isActive, actions, navigate]);

	useEffect(() => {
		if (isSelectedTimerTaskError || selectedTimerTaskData?.data.selectedTaskId === null) {
			// Electron 시스템 알림 사용
			if (window.electron && window.electron.notification) {
				window.electron.notification.showSystemNotification(
					'타이머에서 선택된 할일이 초기화 되었어요.',
					'다시 타이머를 실행해주세요.',
				);
			}

			navigate('/home?error=true');
		}
	}, [isSelectedTimerTaskError, navigate, selectedTimerTaskData?.data.selectedTaskId]);

	return (
		<div className="fixed">
			<div className="relative flex h-screen w-screen min-w-[750px] flex-col overflow-hidden bg-gray-bg-01">
				{/* 허용 서비스 타이틀 */}
				<AllowedServicesTitle
					onClick={actions.showAllowedServices}
					registeredNames={allowedServices.registeredNames}
					isAllowedServiceVisible={isAllowedServiceVisible}
				/>

				{/* 허용 서비스 팝오버 */}
				{isAllowedServiceVisible && (
					<div className="absolute left-[3.2rem] top-[9rem] z-10 flex">
						<AllowedServicesPopover onCancel={actions.hideAllowedServices} />
					</div>
				)}

				{/* 네비게이션 버튼 */}
				<NavigationButtons onHomeClick={navigateToHome} onSidebarToggle={actions.toggleSidebar} />

				{/* 타이머 메인 영역 */}
				<div
					className={`flex h-full flex-col items-center justify-center gap-[4.5rem] transition-[padding-right] duration-300 ${
						isSidebarOpen ? 'pr-0 2xl:pr-[40.2rem]' : 'pr-0'
					}`}
				>
					<div className="flex flex-col items-center gap-[8rem]">
						<MainTimer />
						<Carousel />
					</div>
				</div>

				{/* 사이드 메뉴 */}
				<SideMenuTimer ongoingTodos={ongoingTodos} completedTodos={completedTodos} />
			</div>
		</div>
	);
};

/**
 * 타이머 페이지 루트 컴포넌트
 * TimerProvider를 사용하여 컨텍스트 제공
 */
const TimerPage = () => {
	return (
		<TimerProvider>
			<TimerPageContent />
		</TimerProvider>
	);
};

export default TimerPage;
