import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { splitTasksByCompletion } from '@/shared/utils/timer';
import { getBaseUrl } from '@/shared/utils/url';

import { TimerTodoType } from '@/shared/types/tasks';

import { DATE_FORMAT, DEFAULT_URL, TIMEZONE } from '@/shared/constants/timerPageText';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';
import HomeIcon from '@/shared/assets/svgs/btn_home.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { usePostUpdateTimerInfo } from '@/shared/apisV2/timer/timer.mutations';
import { useGetPopoverAllowedServiceList, useGetTimerTodos } from '@/shared/apisV2/timer/timer.queries';

import Carousel from './Carousel/Carousel';
import PopoverAllowedService from './PopoverAllowedService/PopoverAllowedService';
import SideBarTimer from './SidebarTimer/SideBarTimer';
import TitleAllowedService from './TItleAllowedService/TitleAllowedService';
import Timer from './Timer/Timer';
import { useTimerCount } from './hooks/useTimerCount';
import { useToggleSidebar } from './hooks/useToggleSidebar';
import { useUrlHandler } from './hooks/useUrlHandler';

dayjs.extend(utc);
dayjs.extend(timezone);

const TimerPage = () => {
	const todayDate = dayjs().tz(TIMEZONE);
	const formattedTodayDate = todayDate.format(DATE_FORMAT);

	const navigate = useNavigate();
	const isUpdatingRef = useRef<number | null>(null);

	const { data: todosData } = useGetTimerTodos({ targetDate: formattedTodayDate });

	const { task: todos = [], totalTimeOfToday = 0 } = todosData?.data || {};
	const { ongoingTodos, completedTodos } = splitTasksByCompletion(todos);
	const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
	const [selectedTodoData, setSelectedTodoData] = useState<TimerTodoType | undefined>(undefined);
	const [isInitialRender, setIsInitialRender] = useState(true);

	const [registeredNames, setRegisteredNames] = useState<string[]>([]);
	const [allowedSitesUrl, setAllowedSitesUrl] = useState<string[]>([]);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isAllowedServiceVisible, setIsAllowedServiceVisible] = useState(false);

	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();
	const { isSidebarOpen, handleSidebarToggle } = useToggleSidebar();
	const { mutate: updateTimerInfo } = usePostUpdateTimerInfo();

	const handleUpdateTimerInfo = () => {
		updateTimerInfo({
			taskId: selectedTodoId!,
			elapsedTime: accumulatedTime,
			targetDate: formattedTodayDate,
			timerStatus: isPlaying ? 'RUNNING' : 'PAUSED',
		});
	};

	const {
		timer: timerTime,
		increasedTime: timerIncreasedTime,
		resetIncreasedTime: resetTimerIncreasedTime,
	} = useTimerCount({ isPlaying, previousTime: elapsedTime });
	const { timer: accumulatedTime, resetIncreasedTime: resetAccumulatedIncreasedTime } = useTimerCount({
		isPlaying,
		previousTime: totalTimeOfToday,
	});

	useEffect(() => {
		const currentUpdateRef = Math.floor(accumulatedTime / 40); // JavaScript의 타이머는 완벽하게 정확하지 않아서 40.001초나 39.999초와 같은 값이 될 수도 있으므로 Math.floor를 사용하여 소수점 이하를 버림

		if (accumulatedTime % 40 === 0 && currentUpdateRef !== isUpdatingRef.current) {
			handleUpdateTimerInfo();
			isUpdatingRef.current = currentUpdateRef;
		}
	}, [accumulatedTime]);

	const urls = useMemo(() => allowedSitesUrl.map((url) => url.trim()) || [], [allowedSitesUrl]);

	const baseUrls = useMemo(() => {
		const mappedUrls = urls.map(getBaseUrl);
		return [...mappedUrls, DEFAULT_URL];
	}, [urls]);

	useUrlHandler({
		isPlaying,
		selectedTodo: selectedTodoId,
		baseUrls,
		stopTimer: updateTimerInfo,
		formattedTodayDate,
		timerIncreasedTime,
		setIsPlaying,
		getBaseUrl,
	});

	const handleTodoSelection = (id: number) => {
		setSelectedTodoId(id);
	};

	const handlePlayToggle = (isPlaying: boolean) => {
		setIsPlaying(isPlaying);
	};

	const handleMoribSetTitleClick = () => {
		setIsAllowedServiceVisible(true);
	};

	const handleCancelClick = () => {
		setIsAllowedServiceVisible(false);
	};

	const handleRegister = (selectedNames: string[]) => {
		setRegisteredNames(selectedNames);
	};

	const updateElapsedTime = (newTime: number) => {
		setElapsedTime(newTime);
	};

	useEffect(() => {
		if (todosData && todosData.data.task.length > 0 && isInitialRender) {
			const selectedId = todosData.data.task[0].id;
			setSelectedTodoId(selectedId);
			setIsInitialRender(false);
		}
	}, [todosData]);

	useEffect(() => {
		if (selectedTodoId) {
			setSelectedTodoData(todosData?.data.task.find((todo: TimerTodoType) => todo.id === selectedTodoId));
		}
	}, [selectedTodoId]);

	useEffect(() => {
		setElapsedTime(selectedTodoData?.elapsedTime || 0);
	}, [selectedTodoData?.elapsedTime]);

	useEffect(() => {
		if (allowedServiceList) {
			const allowedSitesUrl = [] as string[];
			const groupNames = [] as string[];

			allowedServiceList.data.forEach((group) => {
				if (group.selected) {
					groupNames.push(group.name);
					if (group.allowedSites) {
						group.allowedSites.forEach((site) => {
							allowedSitesUrl.push(site.siteUrl);
						});
					}
				}
			});
			const uniqueAllowedSites = Array.from(new Set(allowedSitesUrl));

			handleRegister(groupNames);
			setAllowedSitesUrl(uniqueAllowedSites);
		}
	}, [allowedServiceList]);

	return (
		<div className="fixed">
			<div className="relative flex h-screen w-screen min-w-[750px] flex-col overflow-hidden bg-gray-bg-01">
				<TitleAllowedService
					onClick={handleMoribSetTitleClick}
					registeredNames={registeredNames}
					isAllowedServiceVisible={isAllowedServiceVisible}
				/>

				{isAllowedServiceVisible && (
					<div className="absolute left-[3.2rem] top-[9rem] z-10 flex">
						<PopoverAllowedService onCancel={handleCancelClick} />
					</div>
				)}

				<div className="absolute right-[3.2rem] top-[3.2rem] flex w-[10.8rem] items-center">
					<button className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04">
						<HomeIcon onClick={() => navigate(ROUTES_CONFIG.home.path)} />
					</button>
					<button onClick={handleSidebarToggle} className="h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04">
						<HamburgerIcon />
					</button>
				</div>

				<div
					className={`flex h-full flex-col items-center justify-center gap-[4.5rem] transition-[padding-right] duration-300 ${isSidebarOpen ? 'pr-0 2xl:pr-[40.2rem]' : 'pr-0'}`}
				>
					<header className="flex flex-col items-center gap-[0.4rem]">
						<h1 className="text-white title-semibold-48">{selectedTodoData?.name || ''}</h1>
						<h2 className="text-gray-04 head-bold-30">{selectedTodoData?.categoryName || ''}</h2>
					</header>
					<Timer
						selectedCategoryName={selectedTodoData?.categoryName || ''}
						selectedTodo={selectedTodoId}
						onPlayToggle={handlePlayToggle}
						isPlaying={isPlaying}
						formattedTodayDate={formattedTodayDate}
						timerTime={timerTime}
						timerIncreasedTime={timerIncreasedTime}
						resetTimerIncreasedTime={resetTimerIncreasedTime}
						accumulatedTime={accumulatedTime}
						resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
						updateElapsedTime={updateElapsedTime}
					/>

					<Carousel />
				</div>

				<SideBarTimer
					elapsedTime={elapsedTime}
					ongoingTodos={ongoingTodos}
					completedTodos={completedTodos}
					isSideOpen={isSidebarOpen}
					toggleSidebar={handleSidebarToggle}
					onTodoSelection={handleTodoSelection}
					selectedTodo={selectedTodoId}
					selectedTodoName={selectedTodoData?.name || ''}
					onPlayToggle={handlePlayToggle}
					isPlaying={isPlaying}
					formattedTodayDate={formattedTodayDate}
					resetTimerIncreasedTime={resetTimerIncreasedTime}
					timerIncreasedTime={timerIncreasedTime}
					resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
				/>
			</div>
		</div>
	);
};

export default TimerPage;
