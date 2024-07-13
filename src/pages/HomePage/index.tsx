import SVGBtn from '@/components/atoms/SVGBtn';
import CategoryBox from '@/components/molecules/CategoryBox';
import DatePicker from '@/components/molecules/DatePicker';
import HomeSideBar from '@/components/molecules/HomeSideBar';
import TodayTodoBox from '@/components/molecules/TodayTodoBox';

import BellIcon from '@/assets/svgs/bell.svg?react';
import FriendSettingIcon from '@/assets/svgs/friend_setting.svg?react';

import { todoData } from '@/mocks/homeData';

const HomePage = () => {
	return (
		<div className="flex h-[1080px] w-[1920px] bg-gray-bg-01">
			<HomeSideBar />
			<div className="flex h-full w-full justify-between p-[4.2rem]">
				<section>
					<div className="h-[11rem] bg-black"></div>
					<DatePicker />
					<article>
						<CategoryBox title={'morib 프로젝트'} />
					</article>
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
						<TodayTodoBox time={0} selectedTodayTodos={[]} todos={todoData} />
					</div>
				</section>
			</div>
		</div>
	);
};

export default HomePage;
