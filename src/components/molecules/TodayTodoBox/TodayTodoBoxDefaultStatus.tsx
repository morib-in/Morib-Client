import TodayTodoLargeBtn from '@/components/atoms/TodayTodoLargeBtn';
import TodayTodoSmallBtn from '@/components/atoms/TodayTodoSmallBtn';
import TodoBox from '@/components/atoms/TodoBox';

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
							<TodoBox accumulatedTime={accumulatedTime} date={date} title={title} />
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
				<TodayTodoSmallBtn onClick={onDisableAddStatus}>취소</TodayTodoSmallBtn>
				<TodayTodoLargeBtn variant="시작" disabled={!hasTodayTodos} />
			</div>
		</div>
	);
};

export default TodayTodoBoxAddStatus;
