import ButtonRadius8 from '@/shared/components/ButtonRadius8/ButtonRadius8';

interface StatusDefaultBoxTodayTodoProps {
	hasTodos: boolean;
	onEnableAddStatus: () => void;
}

const StatusDefaultBoxTodayTodo = ({ hasTodos, onEnableAddStatus }: StatusDefaultBoxTodayTodoProps) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center text-white">
			{/* NOTE: 중앙에 정렬된 레이아웃이 아니어서 임의 값로 살짝 위로 올림, 추후 정확하게 수정 */}
			<div className="mb-[24%]">
				<p className="text-center text-gray-03 body-med-16">아직 오늘 할 일이 없어요</p>
				<p className="mb-[2.2rem] mt-[1.2rem] text-center text-gray-05 subhead-semibold-18">
					할 일을 추가하려면
					<br />
					아래 버튼을 선택해주세요.
				</p>
				<div className="mx-auto">
					<ButtonRadius8.Md disabled={!hasTodos} onClick={onEnableAddStatus}>
						오늘 할 일 추가
					</ButtonRadius8.Md>
				</div>
			</div>
		</div>
	);
};

export default StatusDefaultBoxTodayTodo;
