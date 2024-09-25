import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useEffect, useMemo, useState } from 'react';

import { useSelectedTodo } from '@/shared/hooks/useSelectedTodo';
import useTimerCount from '@/shared/hooks/useTimerCount';
import useToggleSidebar from '@/shared/hooks/useToggleSideBar';
import useUrlHandler from '@/shared/hooks/useUrlHandler';

import { useGetMoribSet, useGetTodoList, usePostTimerStop } from '@/shared/apis/timer/queries';

import { splitTasksByCompletion } from '@/shared/utils/timer';
import { getBaseUrl } from '@/shared/utils/url';

import { DATE_FORMAT, DEFAULT_URL, TIMEZONE } from '@/shared/constants/timerPageText';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';

import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import Carousel from './components/Carousel';
import SideBarTimer from './components/SideBarTimer';
import SideBoxTemporary from './components/SideBoxTemporary';
import Timer from './components/Timer';

dayjs.extend(utc);
dayjs.extend(timezone);

interface MoribSetData {
	url: string;
}

interface Todo {
	id: number;
	name: string;
	targetTime: number;
	categoryName: string;
}

const TimerPage = () => {
	const { mutate: stopTimer } = usePostTimerStop();
	const { isSidebarOpen, handleSidebarToggle } = useToggleSidebar();
	const todayDate = dayjs().tz(TIMEZONE);
	const formattedTodayDate = todayDate.format(DATE_FORMAT);

	const { data: todosData, isLoading, error } = useGetTodoList(formattedTodayDate);
	const { task: todos = [], totalTimeOfToday = 0 } = todosData?.data || {};
	const { ongoingTodos, completedTodos } = splitTasksByCompletion(todos);

	const [selectedTodo, setSelectedTodo] = useSelectedTodo(todos);

	const [targetTime, setTargetTime] = useState(0);

	const [isPlaying, setIsPlaying] = useState(false);

	const selectedTodoData = todos.find((todo: Todo) => todo.id === selectedTodo);

	useEffect(() => {
		setTargetTime(selectedTodoData?.targetTime || 0);
	}, [selectedTodoData]);

	const { data: setData } = useGetMoribSet(selectedTodo || 0);
	const urls = useMemo(() => setData?.data.map(({ url }: MoribSetData) => url.trim()) || [], [setData]);

	const baseUrls = useMemo(() => {
		const mappedUrls = urls.map(getBaseUrl);
		return [...mappedUrls, DEFAULT_URL];
	}, [urls]);

	const {
		timer: timerTime,
		increasedTime: timerIncreasedTime,
		resetIncreasedTime: resetTimerIncreasedTime,
	} = useTimerCount({ isPlaying, previousTime: targetTime });

	const { timer: accumulatedTime, resetIncreasedTime: resetAccumulatedIncreasedTime } = useTimerCount({
		isPlaying,
		previousTime: totalTimeOfToday,
	});

	useUrlHandler({
		isPlaying,
		selectedTodo,
		baseUrls,
		stopTimer,
		formattedTodayDate,
		timerIncreasedTime,
		setIsPlaying,
		getBaseUrl,
	});

	const handleTodoSelection = (id: number) => {
		setSelectedTodo(id);
	};

	const handlePlayToggle = (isPlaying: boolean) => {
		setIsPlaying(isPlaying);
	};

	const updateTargetTime = (newTime: number) => {
		setTargetTime(newTime);
	};

	if (isLoading || error) {
		return <div>{isLoading ? 'Loading...' : 'Error...'}</div>;
	}

	return (
		<TimerPageTemplates>
			<div className="relative flex h-[108rem] w-[192rem] bg-[url('@/shared/assets/images/img_timer_bg.png')]">
				<div className="absolute left-0">
					<SideBoxTemporary />
				</div>
				<div className="ml-[56.6rem] mt-[-0.8rem]">
					<header className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
						<h1 className="title-semibold-64 text-white">{selectedTodoData?.name || ''}</h1>
						<h2 className="title-med-32 text-gray-04">{selectedTodoData?.categoryName || ''}</h2>
					</header>
					<Timer
						selectedTodo={selectedTodo}
						onPlayToggle={handlePlayToggle}
						isPlaying={isPlaying}
						formattedTodayDate={formattedTodayDate}
						timerTime={timerTime}
						timerIncreasedTime={timerIncreasedTime}
						resetTimerIncreasedTime={resetTimerIncreasedTime}
						accumulatedTime={accumulatedTime}
						resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
						updateTargetTime={updateTargetTime}
					/>
					<Carousel />
				</div>
				<button
					onClick={handleSidebarToggle}
					className="ml-[38.2rem] mt-[3.2rem] h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04"
				>
					<HamburgerIcon />
				</button>
				{isSidebarOpen && (
					<div className={`${isSidebarOpen ? 'absolute inset-0 z-10 bg-dim' : ''}`}>
						<div className="absolute inset-y-0 right-0 flex justify-end overflow-hidden">
							<SideBarTimer
								targetTime={targetTime}
								ongoingTodos={ongoingTodos}
								completedTodos={completedTodos}
								isSideOpen={isSidebarOpen}
								toggleSidebar={handleSidebarToggle}
								onTodoSelection={handleTodoSelection}
								selectedTodo={selectedTodo}
								onPlayToggle={handlePlayToggle}
								isPlaying={isPlaying}
								formattedTodayDate={formattedTodayDate}
								resetTimerIncreasedTime={resetTimerIncreasedTime}
								timerIncreasedTime={timerIncreasedTime}
								resetAccumulatedIncreasedTime={resetAccumulatedIncreasedTime}
							/>
						</div>
					</div>
				)}
			</div>
		</TimerPageTemplates>
	);
};

export default TimerPage;
