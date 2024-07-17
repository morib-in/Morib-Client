import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';
import HomeSmallBtn from '@/components/atoms/HomeSmallBtn';
import TodoBox from '@/components/atoms/TodoBox';

import { HomeLargeBtnVariant } from '@/types/global';

import { LARGE_BTN_TEXT, SMALL_BTN_TEXT } from '@/constants/btnText';

interface TodayTodoAddStatusProps {
	selectedTodayTodos: TodoBoxProps[];
	onDisableAddStatus: () => void;
}

interface TodoBoxProps {
	title: string;
	date: string;
	accumulatedTime: number;
}

const TodayTodoBoxAddStatus = ({ selectedTodayTodos, onDisableAddStatus }: TodayTodoAddStatusProps) => {
	//Todo: 선택된 Todo들을 취소하고 다시 추가하는 로직 추가
	const hasTodayTodos = !(selectedTodayTodos.length === 0);

	return (
		<div className="flex flex-grow flex-col justify-between">
			{hasTodayTodos ? (
				<ul className="mt-[0.7rem] max-h-[57.5rem] overflow-auto">
					{selectedTodayTodos.map(({ accumulatedTime, date, title }, index) => (
						<li key={index}>
							<TodoBox targetTime={accumulatedTime} startDate={'2024-07-07'} endDate={'2024-07-21'} name={title} />
						</li>
					))}
				</ul>
			) : (
				<p className="head-bold-24 mx-auto mt-[22.2rem] text-center text-gray-05">
					할 일 카드를 선택하여
					<br />
					오늘 할 일을 추가해 보세요.
				</p>
			)}

			<div className="flex justify-between">
				<HomeSmallBtn onClick={onDisableAddStatus}>{SMALL_BTN_TEXT.CANCEL}</HomeSmallBtn>
				<HomeLargeBtn variant={HomeLargeBtnVariant.LARGE} disabled={!hasTodayTodos}>
					{LARGE_BTN_TEXT.START_TIMER}
				</HomeLargeBtn>
			</div>
		</div>
	);
};

export default TodayTodoBoxAddStatus;
