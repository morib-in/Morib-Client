import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { useState } from 'react';

import MoreFriendsBtn from '@/components/atoms/MoreFriendsBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import UserProfile from '@/components/atoms/UserProfile';
import CategoryBox from '@/components/molecules/CategoryBox';
import DatePicker from '@/components/molecules/DatePicker';
import HomeDefaultStatus from '@/components/molecules/HomeDefaultStatus';
import HomeSideBar from '@/components/molecules/HomeSideBar';
import TodayTodoBox from '@/components/molecules/TodayTodoBox';
import HomePageWrapper from '@/components/templates/HomePageWrapper';

import { useGetAllCategoryTask } from '@/apis/home/queries';

import { getThisWeekRange } from '@/utils/date';
import { getDailyCategoryTask, splitTasksByCompletion } from '@/utils/home';

import BellIcon from '@/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/assets/svgs/large_plus.svg?react';

import { exampleResponse, todoData } from '@/mocks/homeData';

dayjs.extend(utc);
dayjs.extend(timezone);

const isEmptyObject = (obj: object) => {
	return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const HomePage = () => {
	const todayDate = dayjs().tz('Asia/Seoul');

	const [selectedDate, setSelectedDate] = useState(todayDate);

	const handleSelectedDateChange = (date: Dayjs) => {
		setSelectedDate(date);
	};

	const { startDate, endDate } = getThisWeekRange(selectedDate);

	const { data: categoriesData, isError, error } = useGetAllCategoryTask(startDate, endDate);

	const categories = categoriesData?.data || [];

	const dailyCategoryTask = getDailyCategoryTask(selectedDate, categories);
	console.log(dailyCategoryTask);

	if (isError) {
		console.error(error);
	}

	return (
		<HomePageWrapper>
			<HomeSideBar />
			<div className="flex h-full w-full justify-between p-[4.2rem]">
				<section>
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
					<div className="flex">
						<article className="flex h-[732px] w-[1262px] gap-[2.8rem] overflow-x-auto">
							{dailyCategoryTask.length !== 0 ? (
								<>
									{dailyCategoryTask.map(({ category, tasks }) => {
										// const { completedTasks, ongoingTasks } = splitTasksByCompletion(tasks);
										return (
											<CategoryBox
												key={category.id}
												title={category.name}
												ongoingTodos={todoData}
												completedTodos={todoData}
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
						<div className="mb-[4.4rem] flex justify-end">
							<SVGBtn>
								<FriendSettingIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
							</SVGBtn>
							<SVGBtn>
								<BellIcon className="rounded-[1.6rem] hover:bg-gray-bg-04 active:bg-gray-bg-05" />
							</SVGBtn>
						</div>
						<TodayTodoBox time={0} selectedTodayTodos={todoData} todos={todoData} />
					</div>
				</section>
			</div>
		</HomePageWrapper>
	);
};

export default HomePage;
