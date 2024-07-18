import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MoreFriendsBtn from '@/components/atoms/MoreFriendsBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import UserProfile from '@/components/atoms/UserProfile';
import CategoryBox from '@/components/molecules/CategoryBox';
import DatePicker from '@/components/molecules/DatePicker';
import HomeDefaultStatus from '@/components/molecules/HomeDefaultStatus';
import HomeSideBar from '@/components/molecules/HomeSideBar';
import TodayTodoBox from '@/components/molecules/TodayTodoBox';
import HomePageWrapper from '@/components/templates/HomePageWrapper';

import {
	useDeleteCategory,
	useGetAllCategoryTask,
	useGetTargetTime,
	usePostCreateTodayTodos,
} from '@/apis/home/queries';

import { getThisWeekRange } from '@/utils/date';
import { getDailyCategoryTask, isTaskExist, splitTasksByCompletion } from '@/utils/homePage';

import { Task } from '@/types/home';

import { ROUTES } from '@/constants/router';

import BellIcon from '@/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/assets/svgs/large_plus.svg?react';

dayjs.extend(utc);
dayjs.extend(timezone);

//Todo: 에러 핸들링 및 로직 분리 리팩토링 필요
const HomePage = () => {
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');

	const [selectedDate, setSelectedDate] = useState(todayDate);
	const { startDate, endDate } = getThisWeekRange(selectedDate);

	const { data: categoriesData, isError, error } = useGetAllCategoryTask(startDate, endDate);
	const categories = categoriesData?.data || [];
	const dailyCategoryTask = getDailyCategoryTask(selectedDate, categories);

	const [addingTodayTodoStatus, setAddingTodayTodoStatus] = useState(false);
	const [addingComplete, setAddingComplete] = useState(false);
	const addTodayTodoOverlayStyle = addingTodayTodoStatus && !addingComplete ? 'opacity-30 pointer-events-none' : '';

	const [todayTodos, setTodayTodos] = useState<Omit<Task, 'isComplete'>[]>([]);

	const { mutate: createTodayTodos } = usePostCreateTodayTodos();
	const { mutate: deleteCategory } = useDeleteCategory();

	const navigate = useNavigate();

	const updateTodayTodos = (todo: Omit<Task, 'isComplete'>) => {
		const canAddTask = !todayTodos.some((prevTodo) => prevTodo.id === todo.id);
		if (canAddTask) setTodayTodos((prev) => [...prev, todo]);
		else setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const {
		data: targetTimeData,
		error: targetTimeError,
		isError: isTargetTimeError,
	} = useGetTargetTime(formattedTodayDate);

	const { targetTime } = targetTimeData?.data || 0;

	const deleteTodayTodos = (todo: Omit<Task, 'isComplete'>) => {
		setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const disableAddingTodayTodo = () => {
		setTodayTodos([]);
		setAddingTodayTodoStatus(false);
	};

	const enableAddingTodayTodo = () => {
		setAddingTodayTodoStatus(true);
	};

	const handleSelectedDateChange = (date: Dayjs) => {
		setSelectedDate(date);
	};

	const getSelectedNumber = (id: number) => {
		const index = todayTodos.findIndex((task) => task.id === id);
		const todoNumber = index === -1 ? 0 : index + 1;
		return todoNumber;
	};

	const enableComplete = () => {
		setAddingComplete(true);
	};

	const cancelComplete = () => {
		setAddingComplete(false);
	};

	const handleCreateTodayTodos = () => {
		const todayTodoData = todayTodos.map((todo) => todo.id);
		const dataToPost = {
			todayDate: formattedTodayDate,
			todayTodos: {
				taskIdList: todayTodoData,
			},
		};

		createTodayTodos(dataToPost, {
			onSuccess: () => {
				navigate(ROUTES.timer.path);
			},
		});
	};

	const handleDeleteCategory = (userId: number) => {
		deleteCategory(userId);
	};

	if (isError) {
		console.error(error);
	}

	if (isTargetTimeError) {
		console.error(targetTimeError);
	}

	return (
		<HomePageWrapper>
			<div className={addTodayTodoOverlayStyle}>
				<HomeSideBar />
			</div>
			<div className="flex h-full w-full justify-between p-[4.2rem]">
				<section>
					<div className={addTodayTodoOverlayStyle}>
						<div className="flex h-[11rem] items-center gap-[1.8rem] pt-[1.2rem]">
							<UserProfile isMyProfile />
							<ul className="flex gap-[1.8rem]">
								<li>
									<UserProfile isConnecting />
								</li>
								<li>
									<UserProfile isConnecting />
								</li>
								<li>
									<UserProfile isConnecting />
								</li>
							</ul>
							<MoreFriendsBtn friendsCount={12} />
						</div>
						<DatePicker
							todayDate={todayDate}
							selectedDate={selectedDate}
							onSelectedDateChange={handleSelectedDateChange}
						/>
					</div>
					<div className="flex">
						<article className="flex h-[732px] w-[1262px] gap-[2.8rem] overflow-x-auto">
							{dailyCategoryTask.length !== 0 ? (
								<>
									{dailyCategoryTask.map(({ category, tasks }) => {
										const { completedTasks, ongoingTasks } = splitTasksByCompletion(tasks);
										return (
											<CategoryBox
												id={category.id}
												key={category.id}
												title={category.name}
												ongoingTodos={ongoingTasks}
												completedTodos={completedTasks}
												updateTodayTodos={updateTodayTodos}
												addingTodayTodoStatus={addingTodayTodoStatus}
												getSelectedNumber={getSelectedNumber}
												addingComplete={addingComplete}
												onDeleteCategory={handleDeleteCategory}
											/>
										);
									})}
									{dailyCategoryTask.length < 2 && (
										<div className="ml-[2.2rem] flex flex-col">
											<SVGBtn className="flex-shrink-0">
												<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
											</SVGBtn>
										</div>
									)}
								</>
							) : (
								<HomeDefaultStatus />
							)}
						</article>
						{dailyCategoryTask.length > 2 && (
							<div className="ml-[2.2rem] flex flex-col">
								<SVGBtn className="flex-shrink-0">
									<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
								</SVGBtn>
							</div>
						)}
					</div>
				</section>
				<section className="flex items-end justify-end">
					<div className="flex flex-col">
						<div className={`mb-[4.4rem] flex justify-end ${addTodayTodoOverlayStyle}`}>
							<SVGBtn>
								<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
							</SVGBtn>
							<SVGBtn>
								<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
							</SVGBtn>
						</div>
						<TodayTodoBox
							time={targetTime}
							addingTodayTodoStatus={addingTodayTodoStatus}
							selectedTodayTodos={todayTodos}
							hasTodos={isTaskExist(dailyCategoryTask)}
							enableAddingTodayTodo={enableAddingTodayTodo}
							disableAddingTodayTodo={disableAddingTodayTodo}
							deleteTodayTodos={deleteTodayTodos}
							getSelectedNumber={getSelectedNumber}
							enableComplete={enableComplete}
							cancelComplte={cancelComplete}
							addingComplete={addingComplete}
							onCreateTodayTodos={handleCreateTodayTodos}
						/>
					</div>
				</section>
			</div>
		</HomePageWrapper>
	);
};

export default HomePage;
