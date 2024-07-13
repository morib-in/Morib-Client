import { useState } from 'react';

import { convertTime } from '@/utils/time';

import { TodoDataTypes } from '@/types/userData';

import TodayTodoBoxDefaultStatus from './TodayTodoBoxAddStatus';
import TodayTodoBoxAddStatus from './TodayTodoBoxDefaultStatus';

interface TodayTodoBoxProps {
	time: number;
	selectedTodayTodos: TodoDataTypes[];
	todos: TodoDataTypes[];
}

const TodayTodoBox = ({ time = 0, selectedTodayTodos = [], todos = [] }: TodayTodoBoxProps) => {
	const [addStatus, setAddStatus] = useState(false);
	// Todo: 배열 상태관련 로직 추가!
	const [hasTodos, setHasTodos] = useState(!(todos.length === 0)); // 배열이 있는 상태를 나타내기 위한 임시 상태

	const enableAddStatus = () => {
		setAddStatus(true);
	};

	const disableAddStatus = () => {
		setAddStatus(false);
	};

	const { hours, minutes, seconds } = convertTime(time);

	return (
		<div className="flex h-[88.6rem] w-[40.2rem] flex-col rounded-[1.6rem] bg-gray-bg-03 p-[1.8rem]">
			<div className="rounded-[0.8rem] bg-gray-bg-05 pb-[1.8rem] pl-[2.6rem] pt-[2.2rem] text-white">
				<p className="head-bold-24">몰입 시간</p>
				<p className="title-bold-32">{`${hours}시간 ${minutes}분 ${seconds}초`}</p>
			</div>
			<h3 className="head-bold-24 mt-[3.2rem] text-white">오늘 할 일</h3>
			{addStatus ? (
				<TodayTodoBoxAddStatus selectedTodayTodos={selectedTodayTodos} onDisableAddStatus={disableAddStatus} />
			) : (
				<TodayTodoBoxDefaultStatus hasTodos={hasTodos} onEnableAddStatus={enableAddStatus} />
			)}
		</div>
	);
};

export default TodayTodoBox;
