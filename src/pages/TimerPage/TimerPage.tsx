import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useMemo, useState } from 'react';

import { useSelectedTodo } from '@/shared/hooks/useSelectedTodo';
import useTimerCount from '@/shared/hooks/useTimerCount';
import useToggleSidebar from '@/shared/hooks/useToggleSideBar';
import useUrlHandler from '@/shared/hooks/useUrlHandler';

import { useGetMoribSet, useGetTodoList, usePostTimerStop } from '@/shared/apis/timer/queries';

import { splitTasksByCompletion } from '@/shared/utils/timer';

import HamburgerIcon from '@/shared/assets/svgs/btn_hamburger.svg?react';

import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import Carousel from './components/Carousel';
import SideBarTimer from './components/SideBarTimer';
import SideBoxTemporary from './components/SideBoxTemporary';
import Timer from './components/Timer';
import TitleTimer from './components/TitleTimer';

dayjs.extend(utc);
dayjs.extend(timezone);

interface MoribSetData {
	url: string;
}

interface Todo {
	id: number;
	name: string;
	targetTime: string;
	categoryName: string;
}

const TimerPage = () => {
	const { mutate: stopTimer } = usePostTimerStop();
	const { isSidebarOpen, toggleSidebar } = useToggleSidebar();
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');

	const { data: todosData, isLoading, error } = useGetTodoList(formattedTodayDate);
	const { task: todos = [], totalTimeOfToday = 0 } = todosData?.data || {};
	const { ongoingTasks, completedTasks } = useMemo(() => splitTasksByCompletion(todos), [todos]);

	const [selectedTodo, setSelectedTodo] = useSelectedTodo(todos);
	const [isPlaying, setIsPlaying] = useState(false);

	const { data: setData } = useGetMoribSet(selectedTodo || 0);
	const urls = useMemo(() => setData?.data.map(({ url }: MoribSetData) => url.trim()) || [], [setData]);

	const getBaseUrl = (url: string) => {
		try {
			const urlObj = new URL(url);
			return urlObj.origin;
		} catch (error) {
			return url;
		}
	};

	const baseUrls = useMemo(() => {
		const mappedUrls = urls.map(getBaseUrl);
		return [...mappedUrls, 'chrome://newtab'];
	}, [urls]);

	const selectedTodoData = todos.find((todo: Todo) => todo.id === selectedTodo);
	const targetTime = selectedTodoData?.targetTime || '';
	const targetTodoTitle = selectedTodoData?.name || '';
	const targetCategoryTitle = selectedTodoData?.categoryName || '';

	const { increasedTime } = useTimerCount({ isPlaying, previousTime: targetTime });
	const {
		timer: timerTime,
		increasedTime: timerIncreasedTime,
		resetIncreasedTime: resetTimerIncreasedTime,
	} = useTimerCount({ isPlaying, previousTime: targetTime });

	const { increasedTime: increasedSidebarTime, resetIncreasedTime: resetIncreasedSideBarTime } = useTimerCount({
		isPlaying,
		previousTime: targetTime,
	});

	useUrlHandler({
		isPlaying,
		selectedTodo,
		baseUrls,
		stopTimer,
		formattedTodayDate,
		increasedTime,
		setIsPlaying,
		getBaseUrl,
	});

	const handleTodoSelection = (id: number) => {
		setSelectedTodo(id);
	};

	const handlePlayToggle = (isPlaying: boolean) => {
		setIsPlaying(isPlaying);
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading todos</div>;

	return (
		<TimerPageTemplates>
			<div className="relative flex h-[108rem] w-[192rem] bg-[url('@/shared/assets/images/img_timer_bg.png')]">
				<div className="absolute left-0">
					<SideBoxTemporary />
				</div>
				<div className="ml-[56.6rem] mt-[-0.8rem]">
					<TitleTimer targetTodoTitle={targetTodoTitle} targetCategoryTitle={targetCategoryTitle} />
					<Timer
						selectedTodo={selectedTodo}
						totalTimeOfToday={totalTimeOfToday}
						handlePlayToggle={handlePlayToggle}
						isPlaying={isPlaying}
						formattedTodayDate={formattedTodayDate}
						timerTime={timerTime}
						timerIncreasedTime={timerIncreasedTime}
						resetIncreasedSideBarTime={resetIncreasedSideBarTime}
						resetTimerIncreasedTime={resetTimerIncreasedTime}
					/>
					<Carousel />
				</div>
				<button
					onClick={toggleSidebar}
					className="ml-[38.2rem] mt-[3.2rem] h-[5.4rem] w-[5.4rem] rounded-[1.5rem] hover:bg-gray-bg-04"
				>
					<HamburgerIcon />
				</button>
				{isSidebarOpen && (
					<div className="absolute inset-0 z-10 bg-dim">
						<div className="absolute inset-y-0 right-0 flex justify-end overflow-hidden">
							<SideBarTimer
								targetTime={targetTime}
								ongoingTodos={ongoingTasks}
								completedTodos={completedTasks}
								toggleSidebar={toggleSidebar}
								handleTodoSelection={handleTodoSelection}
								selectedTodo={selectedTodo}
								handlePlayToggle={handlePlayToggle}
								isPlaying={isPlaying}
								formattedTodayDate={formattedTodayDate}
								resetTimerIncreasedTime={resetTimerIncreasedTime}
								timerIncreasedTime={timerIncreasedTime}
								increasedSideBarTime={increasedSidebarTime}
								resetIncreasedSideBarTime={resetIncreasedSideBarTime}
							/>
						</div>
					</div>
				)}
			</div>
		</TimerPageTemplates>
	);
};

export default TimerPage;
