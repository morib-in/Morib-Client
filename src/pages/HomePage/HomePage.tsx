import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQueryClient } from '@tanstack/react-query';

import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper';

import {
	useDeleteCategory,
	useGetAllCategoryTask,
	useGetTargetTime,
	usePostCreateTodayTodos,
} from '@/shared/apis/home/queries';

import { getThisWeekRange } from '@/shared/utils/date';
import { getDailyCategoryTask, isTaskExist, splitTasksByCompletion } from '@/shared/utils/homePage';

import { Task } from '@/shared/types/home';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/shared/assets/svgs/large_plus.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import HomePageWrapper from '@/components/templates/HomePageWrapper';

import ButtonSVG from '../../shared/components/ButtonSVG';
import BoxCategory from './components/BoxCategory';
import BoxTodayTodo from './components/BoxTodayTodo';
import ButtonMoreFriends from './components/ButtonMoreFriends';
import ButtonUserProfile from './components/ButtonUserProfile';
import DatePicker from './components/DatePicker';
import ModalAddCategory from './components/ModalAddCategory';
import SideBarHome from './components/SideBarHome';
import StatusDefaultHome from './components/StatusDefaultHome';

dayjs.extend(utc);
dayjs.extend(timezone);

//Todo: 에러 핸들링 및 로직 분리 리팩토링 필요
const HomePage = () => {
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');

	const modalRef = useRef<ModalWrapperRef>(null);

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

	const handleOpenModal = () => {
		modalRef.current?.open();
	};

	const queryClient = useQueryClient();

	const handleCloseModal = () => {
		modalRef.current?.close();
		queryClient.invalidateQueries({ queryKey: ['categories'] });
		queryClient.invalidateQueries({ queryKey: ['msets'] });
	};

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
				navigate(ROUTES_CONFIG.timer.path);
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
				<SideBarHome />
			</div>

			<div className={`absolute right-[4.4rem] top-[5.4rem] flex gap-[0.8rem] ${addTodayTodoOverlayStyle}`}>
				<button>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button>
					<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
			</div>

			<div className="flex h-full w-full justify-between p-[4.2rem]">
				<section>
					<div className={addTodayTodoOverlayStyle}>
						<div className="flex h-[11rem] items-center gap-[1.8rem] pt-[1.2rem]">
							<ButtonUserProfile isMyProfile />
							<ul className="flex gap-[1.8rem]">
								<li>
									<ButtonUserProfile isConnecting />
								</li>
								<li>
									<ButtonUserProfile isConnecting />
								</li>
								<li>
									<ButtonUserProfile isConnecting />
								</li>
							</ul>
							<ButtonMoreFriends friendsCount={12} />
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
											<BoxCategory
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
									{dailyCategoryTask.length <= 2 && (
										<div className="flex flex-col">
											<ButtonSVG className="flex-shrink-0" onClick={handleOpenModal}>
												<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
											</ButtonSVG>
										</div>
									)}
								</>
							) : (
								<StatusDefaultHome onClick={handleOpenModal} />
							)}
						</article>
						{dailyCategoryTask.length > 2 && (
							<div className="ml-[2.2rem] flex flex-col">
								<ButtonSVG className="flex-shrink-0" onClick={handleOpenModal}>
									<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
								</ButtonSVG>
							</div>
						)}
					</div>
				</section>
				<section className="flex items-end justify-end">
					<div className="flex flex-col">
						<BoxTodayTodo
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
			<ModalWrapper ref={modalRef} backdrop={true}>
				<ModalAddCategory handleCloseModal={handleCloseModal} />
			</ModalWrapper>
		</HomePageWrapper>
	);
};

export default HomePage;
