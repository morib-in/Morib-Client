import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoFixedGrid from '@/shared/components/AutoFixedGrid/AutoFixedGrid';
import ModalContentsFriends from '@/shared/components/ModalContentsFriends/ModalContentsFriends';
import ModalWrapper, { ModalWrapperRef } from '@/shared/components/ModalWrapper/ModalWrapper';
import NotificationPanel from '@/shared/components/NotificationPanel/NotificationPanel';
import Spacer from '@/shared/components/Spacer/Spacer';

import useClickOutside from '@/shared/hooks/useClickOutside';

import { getThisWeekRange } from '@/shared/utils/date';
import { getDailyCategoryTask, isTaskExist, splitTasksByCompletion } from '@/shared/utils/tasks';

import { TaskType } from '@/shared/types/tasks';

import BellIcon from '@/shared/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/shared/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/shared/assets/svgs/large_plus.svg?react';
import PopoverAddCategoryIcon from '@/shared/assets/svgs/popover_add_category.svg?react';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import TooltipFriendInfo from '@/pages/HomePage/TooltipFriendInfo/TooltipFriendInfo';
import { useGetFriendList } from '@/shared/apisV2/friends/friends.queries';
import {
	useAddCategory,
	useDeleteCategory,
	usePatchCategory,
	usePostAddTodayTodos,
} from '@/shared/apisV2/home/home.mutations';
import { useGetCategoryTask, useGetWorkTime } from '@/shared/apisV2/home/home.queries';
import { useGetProfile } from '@/shared/apisV2/setting/setting.queries';
import { useGetTimerFriends } from '@/shared/apisV2/timer/timer.queries';

import BoxAddCategory from './BoxAddCategory/BoxAddCategory';
import BoxCategory from './BoxCategory/BoxCategory';
import BoxTodayTodo from './BoxTodayTodo/BoxTodayTodo';
import ButtonMoreFriends from './ButtonMoreFriends/ButtonMoreFriends';
import ButtonUserProfile from './ButtonUserProfile/ButtonUserProfile';
import DatePicker from './DatePicker/DatePicker';
import TimerRestriction from './ModalContentsAlert/TimerRestriction/TimerRestriction';
import StatusDefaultHome from './StatusDefaultHome/StatusDefaultHome';

dayjs.extend(utc);
dayjs.extend(timezone);

const HomePage = () => {
	const todayDate = dayjs().tz('Asia/Seoul');
	const formattedTodayDate = todayDate.format('YYYY-MM-DD');
	const categoryRef = useRef<HTMLDivElement>(null);

	const boxAddCategoryRef = useRef<HTMLDivElement>(null);
	const friendsModalRef = useRef<ModalWrapperRef>(null);
	const notificationPanelRef = useRef<HTMLDivElement>(null);
	const bellIconRef = useRef<HTMLButtonElement>(null);
	const timerRestrictionModalRef = useRef<ModalWrapperRef>(null);

	const [isNotificationVisible, setIsNotificationVisible] = useState(false);

	const MAX_VISIBLE_FRIENDS = 5;

	const [initialAdding, setInitialAdding] = useState(true);
	const [selectedDate, setSelectedDate] = useState(todayDate);
	const { startDate, endDate } = getThisWeekRange(selectedDate);

	const { data: categoriesData } = useGetCategoryTask({ startDate, endDate });
	const { data: userProfile } = useGetProfile();
	const { data: friendListData } = useGetFriendList();
	const { data: timerFriendsData } = useGetTimerFriends();

	const categories = categoriesData?.data || [];
	const friendList = friendListData?.data || [];
	const timerFriends = timerFriendsData?.data || [];

	// 현재 접속 중인 친구만 필터링
	const onlineFriends = friendList.filter((friend) => friend.isOnline);

	const dailyCategoryTask = getDailyCategoryTask(selectedDate, categories);

	const [isAddingCategory, setIsAddingCategory] = useState(false);

	const [addingTodayTodoStatus, setAddingTodayTodoStatus] = useState(false);
	const [addingComplete, setAddingComplete] = useState(false);
	// NOTE: 추후 사용 예정
	// const addTodayTodosOverlayStyle = addingTodayTodoStatus && !addingComplete ? 'opacity-30 pointer-events-none' : '';

	const [todayTodos, setTodayTodos] = useState<Omit<TaskType, 'isComplete'>[]>([]);
	const [categoryInput, setCategoryInput] = useState('');

	const { mutate: addTodayTodos } = usePostAddTodayTodos();
	const { mutate: deleteCategory } = useDeleteCategory();
	const { mutate: addCategory } = useAddCategory();
	const { mutate: patchCategory } = usePatchCategory();

	const navigate = useNavigate();

	const updateTodayTodos = (todo: Omit<TaskType, 'isComplete'>) => {
		const canAddTask = !todayTodos.some((prevTodo) => prevTodo.id === todo.id);
		if (canAddTask) setTodayTodos((prev) => [...prev, todo]);
		else setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const { data: workTimeData } = useGetWorkTime({ targetDate: formattedTodayDate });

	const handleAddCategory = () => {
		if (initialAdding) {
			setInitialAdding(false);
		}
		setIsAddingCategory(true);
	};

	const handleCategoryInputChange = (name: string) => {
		setCategoryInput(name);
	};

	const handleCategoryScroll = () => {
		if (categoryRef.current && !initialAdding) {
			categoryRef.current.scrollBy({
				left: categoryRef.current.scrollWidth + 316,
				behavior: 'smooth',
			});
		}
	};

	const handleOutsideClickWhileAddingCategory = () => {
		if (categoryInput.length === 0) {
			setIsAddingCategory(false);
		} else {
			addCategory(
				{ name: categoryInput },
				{
					onSuccess: () => {
						setCategoryInput('');
						setIsAddingCategory(false);
					},
				},
			);
		}
	};

	const handleCategoryInputKeydown = () => {
		addCategory(
			{ name: categoryInput },
			{
				onSuccess: () => {
					setCategoryInput('');
					setIsAddingCategory(false);
				},
			},
		);
	};

	const handleOpenFriendsModal = () => {
		friendsModalRef.current?.open();
	};

	const toggleNotification = () => {
		setIsNotificationVisible((prev) => !prev);
	};

	useClickOutside(boxAddCategoryRef, handleOutsideClickWhileAddingCategory);
	useClickOutside(
		notificationPanelRef,
		(event) => {
			if (!isNotificationVisible) return;

			if (bellIconRef.current && event && bellIconRef.current.contains(event.target as Node)) {
				return;
			}

			setIsNotificationVisible(false);
		},
		isNotificationVisible,
	);

	const deleteTodayTodos = (todo: Omit<TaskType, 'isComplete'>) => {
		setTodayTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== todo.id));
	};

	const disableAddingTodayTodo = () => {
		setTodayTodos([]);
		setAddingTodayTodoStatus(false);
	};

	const enableAddingTodayTodo = () => {
		setAddingTodayTodoStatus(true);
		setSelectedDate(todayDate);
	};

	const handleSelectedDateChange = (date: Dayjs) => {
		if (addingTodayTodoStatus && !todayDate.isSame(date, 'day')) {
			timerRestrictionModalRef.current?.open();
			return;
		}
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
			targetDate: formattedTodayDate,
			taskIdList: todayTodoData,
		};

		addTodayTodos(dataToPost, {
			onSuccess: () => {
				navigate(ROUTES_CONFIG.timer.path);
			},
		});
	};

	const handleDeleteCategory = (categoryId: number) => {
		const updatedTodayTodos = todayTodos.filter((todo) => {
			const belongsToDeletedCategory = dailyCategoryTask.some(
				({ category, tasks }) => category.id === categoryId && tasks.some((task) => task.id === todo.id),
			);
			return !belongsToDeletedCategory;
		});

		setTodayTodos(updatedTodayTodos);

		deleteCategory({ categoryId });
	};

	const handlePatchCategory = (categoryId: number, name: string) => {
		if (!name.trim()) return;
		patchCategory({ categoryId, name: name });
	};

	useEffect(() => {
		handleCategoryScroll();
	}, [isAddingCategory, dailyCategoryTask.length]);

	return (
		<AutoFixedGrid
			type="home"
			className="gap-[9.2rem] overflow-auto bg-gray-bg-01 p-[3.2rem] pt-[13.5rem] 2xl:pt-[15.2rem]"
		>
			<div className="absolute left-[3.2rem] top-[4rem] flex items-center gap-[0.8rem] 2xl:top-[5.4rem] 2xl:gap-[1.8rem]">
				<ul className="flex gap-[0.8rem] 2xl:gap-[1.8rem]">
					<li>
						<ButtonUserProfile isMyProfile imageUrl={userProfile?.data?.imageUrl} />
					</li>
					{onlineFriends.slice(0, MAX_VISIBLE_FRIENDS).map((friend) => {
						const onlineFriend = timerFriends.find((of) => of.id === friend.id);

						return (
							<li key={friend.id} className="group relative">
								<div className="transition-transform duration-300 group-hover:-translate-y-[1rem]">
									<ButtonUserProfile isConnecting isOnline={true} imageUrl={friend.imageUrl} />
								</div>
								<div className="absolute left-[-9.3rem] top-[8rem] z-[52] hidden transform group-hover:block">
									{onlineFriend ? (
										<TooltipFriendInfo
											key={friend.id}
											id={friend.id}
											image={onlineFriend.imageUrl}
											time={onlineFriend.elapsedTime}
											name={onlineFriend.name}
											categoryName={onlineFriend.categoryName || ''}
											isPlaying={onlineFriend.timerStatus === 'RUNNING'}
											isOnline={onlineFriend.isOnline}
										/>
									) : (
										<TooltipFriendInfo
											key={friend.id}
											id={friend.id}
											image={friend.imageUrl}
											time={0}
											name={friend.name}
											categoryName=""
											isPlaying={false}
											isOnline={false}
										/>
									)}
								</div>
							</li>
						);
					})}
					{onlineFriends.length < MAX_VISIBLE_FRIENDS &&
						friendList
							.filter((friend) => !friend.isOnline)
							.slice(0, MAX_VISIBLE_FRIENDS - onlineFriends.length)
							.map((friend) => {
								const offlineFriend = timerFriends.find((of) => of.id === friend.id);

								return (
									<li key={friend.id} className="group relative">
										<div className="transition-transform duration-300 group-hover:-translate-y-[1rem]">
											<ButtonUserProfile isConnecting isOnline={false} imageUrl={friend.imageUrl} />
										</div>
										<div className="absolute left-[-9.3rem] top-[8rem] z-[52] hidden transform group-hover:block">
											{offlineFriend ? (
												<TooltipFriendInfo
													key={friend.id}
													id={friend.id}
													image={offlineFriend.imageUrl}
													time={offlineFriend.elapsedTime}
													name={offlineFriend.name}
													categoryName={offlineFriend.categoryName || ''}
													isPlaying={offlineFriend.timerStatus === 'RUNNING'}
													isOnline={offlineFriend.isOnline}
												/>
											) : (
												<TooltipFriendInfo
													key={friend.id}
													id={friend.id}
													image={friend.imageUrl}
													time={0}
													name={friend.name}
													categoryName=""
													isPlaying={false}
													isOnline={false}
												/>
											)}
										</div>
									</li>
								);
							})}
				</ul>

				{friendList.length > MAX_VISIBLE_FRIENDS && (
					<ButtonMoreFriends friendsCount={friendList.length - MAX_VISIBLE_FRIENDS} />
				)}
			</div>

			<div className={`absolute right-[3.2rem] top-[4rem] flex gap-[0.8rem] 2xl:top-[5.4rem]`}>
				<button onClick={handleOpenFriendsModal}>
					<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
				</button>
				<button ref={bellIconRef} onClick={toggleNotification}>
					<BellIcon
						className={`rounded-[1.6rem] ${isNotificationVisible ? 'bg-gray-bg-04' : ''} hover:bg-gray-bg-04 active:bg-gray-bg-05`}
					/>
				</button>
			</div>

			{/* NOTE: 1440 이하일 때는 UI가 더이상 줄어들지 않게 조정 */}
			<AutoFixedGrid.Slot className="h-full min-h-0 min-w-[894px] max-w-[1374px]">
				{/* {isCategoriesDataError && <FallbackApiError resetError={() => {}} />} */}
				<Spacer.Height as="main" className="flex flex-col gap-[1.6rem]">
					<DatePicker
						todayDate={todayDate}
						selectedDate={selectedDate}
						onSelectedDateChange={handleSelectedDateChange}
					/>

					<Spacer.Height className="flex w-full">
						<div ref={categoryRef} className="flex h-full min-h-0 w-full min-w-0 gap-[1.4rem] overflow-x-auto">
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
												onPatchCategory={handlePatchCategory}
												isSelectedTodoExist={todayTodos.length > 0}
												selectedDate={selectedDate}
											/>
										);
									})}

									{isAddingCategory && (
										<BoxAddCategory
											categoryInput={categoryInput}
											onCategoryInputChange={handleCategoryInputChange}
											onCategoryInputKeydown={handleCategoryInputKeydown}
											ref={boxAddCategoryRef}
										/>
									)}

									{dailyCategoryTask.length <= 2 && (
										<div className="relative">
											{!isAddingCategory && (
												<button className="absolute left-[6rem] top-[1rem]">
													<PopoverAddCategoryIcon />
												</button>
											)}
											<button className="flex-shrink-0" onClick={handleAddCategory}>
												<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
											</button>
										</div>
									)}
								</>
							) : isAddingCategory ? (
								<BoxAddCategory
									categoryInput={categoryInput}
									onCategoryInputChange={handleCategoryInputChange}
									onCategoryInputKeydown={handleCategoryInputKeydown}
									ref={boxAddCategoryRef}
								/>
							) : (
								<StatusDefaultHome onClick={handleAddCategory} />
							)}
						</div>

						{dailyCategoryTask.length > 2 && (
							<div className="ml-[1.4rem] flex flex-col">
								<button className="flex-shrink-0" onClick={handleAddCategory}>
									<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
								</button>
							</div>
						)}
					</Spacer.Height>
				</Spacer.Height>
			</AutoFixedGrid.Slot>

			<AutoFixedGrid.Slot className="h-full min-h-0">
				<BoxTodayTodo
					time={workTimeData?.data?.sumTodayElapsedTime || 0}
					addingTodayTodoStatus={addingTodayTodoStatus}
					selectedTodayTodos={todayTodos}
					hasTodos={isTaskExist(dailyCategoryTask)}
					enableAddingTodayTodo={enableAddingTodayTodo}
					disableAddingTodayTodo={disableAddingTodayTodo}
					deleteTodayTodos={deleteTodayTodos}
					getSelectedNumber={getSelectedNumber}
					enableComplete={enableComplete}
					cancelComplete={cancelComplete}
					addingComplete={addingComplete}
					onCreateTodayTodos={handleCreateTodayTodos}
				/>
			</AutoFixedGrid.Slot>

			<ModalWrapper ref={friendsModalRef} backdrop={true}>
				{({ isModalOpen }) => <ModalContentsFriends isModalOpen={isModalOpen} />}
			</ModalWrapper>

			<ModalWrapper ref={timerRestrictionModalRef} backdrop={true}>
				{() => (
					<TimerRestriction
						onConfirm={() => {
							timerRestrictionModalRef.current?.close();
						}}
					/>
				)}
			</ModalWrapper>

			{isNotificationVisible && <NotificationPanel ref={notificationPanelRef} />}
		</AutoFixedGrid>
	);
};

export default HomePage;
