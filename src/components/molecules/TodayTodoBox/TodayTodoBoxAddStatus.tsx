import TodayTodoLargeBtn from '@/components/atoms/TodayTodoLargeBtn';

interface TodayTodoDefaultStatusProps {
	hasTodos: boolean;
	onEnableAddStatus: () => void;
}

const TodayTodoBoxDefaultStatus = ({ hasTodos, onEnableAddStatus }: TodayTodoDefaultStatusProps) => {
	return (
		<div className="mt-[21.4rem] flex w-full flex-col justify-center text-white">
			<p className="subhead-med-18 text-center text-gray-03">아직 오늘 할 일이 없어요</p>
			<p className="subhead-bold-22 mb-[2.2rem] mt-[1.2rem] text-center text-gray-05">
				할 일을 추가해
				<br />
				타이머를 시작해보세요.
			</p>
			<div className="mx-auto">
				<TodayTodoLargeBtn variant="추가" disabled={!hasTodos} onClick={onEnableAddStatus} />
			</div>
		</div>
	);
};

export default TodayTodoBoxDefaultStatus;
