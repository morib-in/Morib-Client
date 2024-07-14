import MoreFriendsBtn from '@/components/atoms/MoreFriendsBtn';
import SVGBtn from '@/components/atoms/SVGBtn';
import UserProfile from '@/components/atoms/UserProfile';
import CategoryBox from '@/components/molecules/CategoryBox';
import DatePicker from '@/components/molecules/DatePicker';
import HomeDefaultStatus from '@/components/molecules/HomeDefaultStatus';
import HomeSideBar from '@/components/molecules/HomeSideBar';
import TodayTodoBox from '@/components/molecules/TodayTodoBox';

import BellIcon from '@/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/assets/svgs/friend_setting.svg?react';
import LargePlusIcon from '@/assets/svgs/large_plus.svg?react';

import { todoData } from '@/mocks/homeData';

const HomePage = () => {
	return (
		<div className="flex h-[1080px] w-[1920px] bg-gray-bg-01">
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
					<DatePicker />
					<div className="flex">
						<article className="flex h-[732px] w-[1262px] gap-[2.8rem] overflow-x-auto">
							{/*Todo: 서버 상태 받아서 map 로직 추가 */}
							{/* <CategoryBox title={'morib 프로젝트'} ongoingTodos={todoData} completedTodos={todoData} />
							<CategoryBox title={'morib 프로젝트'} />
							<CategoryBox title={'morib 프로젝트'} /> */}
							<HomeDefaultStatus />
						</article>
						{/* <div className="ml-[2.2rem] flex flex-col">
							<SVGBtn className="flex-shrink-0">
								<LargePlusIcon className="rounded-full bg-gray-bg-03 hover:bg-gray-bg-05" />
							</SVGBtn>
						</div> */}
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
		</div>
	);
};

export default HomePage;
