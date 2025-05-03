import ButtonAlert from '../ButtonAlert/ButtonAlert';
import { AlertModalProps } from '../types/index';

const TimerRestriction = ({ onConfirm }: AlertModalProps) => (
	<div className="flex h-[19.8rem] w-[47.2rem] flex-col gap-[3rem] rounded-[8px] bg-gray-bg-04 p-[3rem]">
		<div className="flex flex-col">
			<p className="text-center text-gray-05 subhead-bold-22">오늘 날짜에 해당하는 할 일만</p>
			<p className="text-center text-gray-05 subhead-bold-22">추가할 수 있어요.</p>
		</div>
		<ButtonAlert variant="primary" onClick={onConfirm}>
			확인
		</ButtonAlert>
	</div>
);

export default TimerRestriction;
