import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import React, { useEffect, useMemo, useState } from 'react';

import FriendInfoCarousel from '@/components/molecules/FriendInfoCarousel';
import Timer from '@/components/molecules/Timer';
import TimerSideBar from '@/components/molecules/TimerSideBar';
import TimerSideBox from '@/components/molecules/TimerSideBoxTemporary';
import TimerTitle from '@/components/molecules/TimerTitle';
import TimerPageTemplates from '@/components/templates/TimerPageTemplates';

import useTimerCount from '@/hooks/useTimerCount';
import useToggleSidebar from '@/hooks/useToggleSideBar';
import useUrlHandler from '@/hooks/useUrlHandler';

import { useGetMoribSet, useGetTodoList, usePostTimerStop } from '@/apis/timer/queries';

import { splitTasksByCompletion } from '@/utils/timer';

import HamburgerIcon from '@/assets/svgs/btn_hamburger.svg?react';

dayjs.extend(utc);
dayjs.extend(timezone);

interface MoribSetData {
	url: string;
}

const TimerPage: React.FC = () => {
	const { mutate: stopTimer } = usePostTimerStop();
	const { isSidebarOpen, toggleSidebar } = useToggleSidebar();
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');
	const { data: todosData, isLoading, error } = useGetTodoList(formattedTodayDate);

	const todos = useMemo(() => todosData?.data.task || [], [todosData]);
	const tasktotaltime = todosData?.data || [];

	const { ongoingTasks, completedTasks } = useMemo(() => splitTasksByCompletion(todos), [todos]);

	const [targetTime, setTargetTime] = useState(0);
	const [targetName, setTargetName] = useState('');
	const [targetCategoryName, setTargetCategoryName] = useState('');
	const [selectedTodo, setSelectedTodo] = useState<number | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const { data: setData } = useGetMoribSet(selectedTodo || 0);

	const urls = useMemo(() => setData?.data.map((item: MoribSetData) => item.url.trim()) || [], [setData]);

	const getBaseUrl = (url: string) => {
		try {
			const urlObj = new URL(url);
			return urlObj.origin;
		} catch (error) {
			return url;
		}
	};

	const baseUrls = useMemo(() => urls.map(getBaseUrl), [urls]);

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

	useEffect(() => {
		if (todos.length > 0 && selectedTodo === null) {
			setTargetTime(todos[0].targetTime);
			setTargetName(todos[0].name);
			setTargetCategoryName(todos[0].categoryName);
			setSelectedTodo(todos[0].id);
		}
	}, [todos, selectedTodo]);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading todos</div>;

	return (
		<TimerPageTemplates>
			<div className="relative flex h-[108rem] w-[192rem] bg-[url('@/assets/images/img_timer_bg.png')]">
				<div className="absolute left-0">
					<TimerSideBox />
				</div>
				<div className="ml-[56.6rem] mt-[-0.8rem]">
					<TimerTitle targetName={targetName} targetCategoryName={targetCategoryName} />
					<Timer
						selectedTodo={selectedTodo}
						totalTimeOfToday={tasktotaltime.totalTimeOfToday}
						targetTime={targetTime}
						setIsPlaying={setIsPlaying}
						isPlaying={isPlaying}
						formattedTodayDate={formattedTodayDate}
						timerTime={timerTime}
						timerIncreasedTime={timerIncreasedTime}
						resetIncreasedSideBarTime={resetIncreasedSideBarTime}
					/>
					<FriendInfoCarousel />
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
							<TimerSideBar
								targetTime={targetTime}
								ongoingTodos={ongoingTasks}
								completedTodos={completedTasks}
								toggleSidebar={toggleSidebar}
								setTargetTime={setTargetTime}
								setTargetName={setTargetName}
								setSelectedTodo={setSelectedTodo}
								selectedTodo={selectedTodo}
								setIsPlaying={setIsPlaying}
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
