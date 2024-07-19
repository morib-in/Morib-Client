import HomeLargeBtn from '@/components/atoms/HomeLargeBtn';
import HomeSmallBtn from '@/components/atoms/HomeSmallBtn';
import TodoBox from '@/components/atoms/TodoBox';

import { HomeLargeBtnVariant } from '@/types/global';
import { Task } from '@/types/home';

import { LARGE_BTN_TEXT, SMALL_BTN_TEXT } from '@/constants/btnText';

interface TodayTodoAddStatusProps {
	selectedTodayTodos: Omit<Task, 'isComplete'>[];
	onDisableAddStatus: () => void;
	deleteTodayTodos: (todo: Omit<Task, 'isComplete'>) => void;
	getSelectedNumber: (id: number) => number;
	enableComplete: () => void;
	cancelComplte: () => void;
	addingComplete: boolean;
	onCreateTodayTodos: () => void;
}

const TodayTodoBoxAddStatus = ({
	selectedTodayTodos,
	onDisableAddStatus,
	deleteTodayTodos,
	getSelectedNumber,
	enableComplete,
	cancelComplte,
	addingComplete,
	onCreateTodayTodos,
}: TodayTodoAddStatusProps) => {
	//Todo: 선택된 Todo들을 취소하고 다시 추가하는 로직 추가
	const hasTodayTodos = !(selectedTodayTodos.length === 0);
	const clickable = addingComplete ? '' : 'pointer-events-none cursor-default ';

	return (
		<div className="flex flex-grow flex-col justify-between">
			{hasTodayTodos ? (
				<ul className="mt-[0.7rem] max-h-[57.5rem] overflow-auto">
					{selectedTodayTodos.map(({ id, targetTime, startDate, endDate, name }) => {
						const selectedNumber = getSelectedNumber(id);

						return (
							<li key={id}>
								<TodoBox
									id={id}
									targetTime={targetTime}
									startDate={startDate}
									endDate={endDate}
									name={name}
									clickable={true}
									isSelected={!!selectedNumber}
									selectedNumber={selectedNumber}
									updateTodayTodos={deleteTodayTodos}
									addingComplete={addingComplete}
								/>
							</li>
						);
					})}
				</ul>
			) : (
				<p className="head-bold-24 mx-auto mt-[22.2rem] text-center text-gray-05">
					할 일 카드를 선택하여
					<br />
					오늘 할 일을 추가해 보세요.
				</p>
			)}

			<div className="flex justify-between">
				{selectedTodayTodos.length !== 0 ? (
					addingComplete ? (
						<HomeSmallBtn onClick={cancelComplte}>{SMALL_BTN_TEXT.MODIFICATION}</HomeSmallBtn>
					) : (
						<HomeSmallBtn onClick={enableComplete}>{SMALL_BTN_TEXT.COMPLETION}</HomeSmallBtn>
					)
				) : (
					<HomeSmallBtn onClick={onDisableAddStatus}>{SMALL_BTN_TEXT.CANCEL}</HomeSmallBtn>
				)}
				<div className={clickable}>
					<HomeLargeBtn variant={HomeLargeBtnVariant.LARGE} disabled={!addingComplete} onClick={onCreateTodayTodos}>
						{LARGE_BTN_TEXT.START_TIMER}
					</HomeLargeBtn>
				</div>
			</div>
		</div>
	);
};

export default TodayTodoBoxAddStatus;
