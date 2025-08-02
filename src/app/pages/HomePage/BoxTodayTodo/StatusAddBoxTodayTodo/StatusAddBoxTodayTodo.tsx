import { useNavigate } from 'react-router-dom';

import BoxTodo from '@/shared/components/BoxTodo/BoxTodo';
import ButtonRadius5 from '@/shared/components/ButtonRadius5/ButtonRadius5';
import Spacer from '@/shared/components/Spacer/Spacer';

import { overlay } from '@/shared/utils/overlay';

import type { TaskType } from '@/shared/types/tasks';

import { LARGE_BTN_TEXT, SMALL_BTN_TEXT } from '@/shared/constants/btnText';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import RegisterAllowedService from '@/pages/HomePage/ModalContentsAlert/RegisterAllowedService/RegisterAllowedService';
import { useGetPopoverAllowedServiceList } from '@/shared/apisV2/timer/timer.queries';

interface StatusAddBoxTodayTodoProps {
	selectedTodayTodos: Omit<TaskType, 'isComplete'>[];
	onDisableAddStatus: () => void;
	deleteTodayTodos: (todo: Omit<TaskType, 'isComplete'>) => void;
	getSelectedNumber: (id: number) => number;
	enableComplete: () => void;
	cancelComplete: () => void;
	addingComplete: boolean;
	onCreateTodayTodos: () => void;
	addingTodayTodoStatus: boolean;
}

const StatusAddBoxTodayTodo = ({
	selectedTodayTodos,
	onDisableAddStatus,
	deleteTodayTodos,
	getSelectedNumber,
	enableComplete,
	cancelComplete,
	addingComplete,
	onCreateTodayTodos,
	addingTodayTodoStatus,
}: StatusAddBoxTodayTodoProps) => {
	const { data: allowedServiceList } = useGetPopoverAllowedServiceList();
	const navigate = useNavigate();

	const allowedServicePath = ROUTES_CONFIG.allowedService.path;

	const hasTodayTodos = !(selectedTodayTodos.length === 0);
	const clickable = addingComplete ? '' : 'pointer-events-none cursor-default ';
	const handleMouseEnter = () => {
		import('@/pages/TimerPage/TimerPage').catch((error) => {
			console.error('타이머 페이지를 받아오는데 오류가 발생했습니다.', error);
		});
	};

	const handleCancelComplete = () => {
		onDisableAddStatus();
	};

	const handleStartTimer = () => {
		if (allowedServiceList && allowedServiceList.data.length === 0) {
			handleRegisterServiceModal();
		} else {
			onCreateTodayTodos();
		}
	};

	const handleRegisterServiceModal = () => {
		overlay({
			backdrop: true,
			content: ({ close }) => (
				<RegisterAllowedService
					onCloseModal={() => {
						close();
						onCreateTodayTodos();
					}}
					onConfirm={() => {
						close();
						navigate(allowedServicePath);
					}}
				/>
			),
		});
	};

	return (
		<Spacer.Height className="flex flex-grow flex-col justify-between">
			{hasTodayTodos ? (
				<Spacer.Height as="ul" className="mt-[0.7rem] overflow-y-auto">
					{selectedTodayTodos.map(({ id, elapsedTime, startDate, endDate, name }) => {
						const selectedNumber = getSelectedNumber(id);

						return (
							<li key={id}>
								<BoxTodo
									id={id}
									elapsedTime={elapsedTime}
									startDate={startDate}
									endDate={endDate}
									name={name}
									clickable={true}
									isSelected={!!selectedNumber}
									selectedNumber={selectedNumber}
									updateTodayTodos={deleteTodayTodos}
									addingComplete={addingComplete}
									addingTodayTodoStatus={addingTodayTodoStatus}
								/>
							</li>
						);
					})}
				</Spacer.Height>
			) : (
				<div className="mx-auto mt-[22.2rem] flex flex-col gap-[0.5rem]">
					<p className="text-center text-gray-05 subhead-semibold-18">할 일 카드를 선택하여</p>
					<p className="text-center text-gray-05 subhead-semibold-18">오늘 할 일을 추가해 보세요.</p>
				</div>
			)}

			<span className="mt-[1rem] flex justify-between">
				{selectedTodayTodos.length !== 0 ? (
					addingComplete ? (
						<ButtonRadius5.Sm color="gray" onClick={cancelComplete}>
							<span className="px-[1.7rem]">{SMALL_BTN_TEXT.MODIFICATION}</span>
						</ButtonRadius5.Sm>
					) : (
						<ButtonRadius5.Sm color="gray" onClick={enableComplete}>
							<span className="px-[1.7rem]">{SMALL_BTN_TEXT.COMPLETION}</span>
						</ButtonRadius5.Sm>
					)
				) : (
					<ButtonRadius5.Sm color="gray" onClick={handleCancelComplete}>
						<span className="px-[1.7rem]">{SMALL_BTN_TEXT.CANCEL}</span>
					</ButtonRadius5.Sm>
				)}
				<div className={clickable}>
					<ButtonRadius5.Sm
						color="main"
						disabled={!addingComplete}
						onClick={handleStartTimer}
						onMouseEnter={handleMouseEnter}
					>
						{LARGE_BTN_TEXT.START_TIMER}
					</ButtonRadius5.Sm>
				</div>
			</span>
		</Spacer.Height>
	);
};

export default StatusAddBoxTodayTodo;
