import ButtonAlert from '../ButtonAlert/ButtonAlert';
import { AlertModalProps } from '../types/index';

const TimerRestriction = ({ onConfirm }: AlertModalProps) => (
	<div className="flex h-[19.8rem] w-[47.2rem] flex-col gap-[3rem] rounded-[8px] bg-gray-bg-04 p-[3rem]">
		<p className="text-center text-gray-05 subhead-bold-22">오늘 날짜에 해당하는 할 일만 타이머를 실행할 수 있어요.</p>
		<ButtonAlert variant="primary" onClick={onConfirm}>
			확인
		</ButtonAlert>
	</div>
);

export default TimerRestriction;
