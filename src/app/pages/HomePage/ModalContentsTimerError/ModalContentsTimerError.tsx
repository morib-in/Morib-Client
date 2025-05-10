import { forwardRef } from 'react';

import { ButtonRadius5 } from '@/shared/components/ButtonRadius5/ButtonRadius5';

interface ModalContentsTimerErrorProps {
	onClick: () => void;
}

const ModalContentsTimerError = forwardRef<HTMLDivElement, ModalContentsTimerErrorProps>(({ onClick }, ref) => {
	return (
		<div
			ref={ref}
			className="flex w-[47.2rem] flex-col justify-center gap-[3rem] whitespace-pre-line rounded-[8px] bg-gray-bg-04 p-[3rem] text-center text-white subhead-bold-22"
		>
			<p>
				자정이 지나 할 일이 초기화되었어요.
				<br />
				다시 할 일을 선택하고 몰입해 볼까요?
			</p>
			<ButtonRadius5.Md color="gray" onClick={onClick} className="h-[4.6rem] text-white outline-none">
				확인
			</ButtonRadius5.Md>
		</div>
	);
});

ModalContentsTimerError.displayName = 'ModalContentsTimerError';

export default ModalContentsTimerError;
