import { forwardRef } from 'react';

import ButtonRadius5 from '@/shared/components/ButtonRadius5/ButtonRadius5';

type ActionFeedbackVariant = 'title-required' | 'confirm-delete';
interface ActionFeedbackProps {
	isModalOpen: boolean;
	onClick: () => void;
	variant: ActionFeedbackVariant;
	pageName?: string;
}

const ActionFeedback = forwardRef<HTMLDivElement, ActionFeedbackProps>(
	({ isModalOpen, onClick, variant, pageName }, ref) => {
		const getMessage = () => {
			switch (variant) {
				case 'title-required':
					return '허용서비스 리스트의 이름을\n먼저 입력해주세요.';
				case 'confirm-delete':
					return (
						<>
							&apos;
							<span className="inline-block max-w-[22rem] overflow-hidden text-ellipsis whitespace-nowrap align-middle">
								{pageName}
							</span>
							&apos; 허용 사이트가
							<br />
							삭제되었습니다.
						</>
					);
				default:
					return '';
			}
		};
		return (
			<div
				ref={ref}
				className="flex h-[19.8rem] w-[47.2rem] flex-col justify-center gap-[3rem] whitespace-pre-line rounded-[8px] bg-gray-bg-04 p-[3rem] text-center text-white subhead-bold-22"
			>
				<p>{getMessage()}</p>
				<ButtonRadius5.Md color="gray" onClick={onClick} className="h-[4.6rem] text-white outline-none">
					확인
				</ButtonRadius5.Md>
			</div>
		);
	},
);

ActionFeedback.displayName = 'ActionFeedback';

const ModalContentsAlert = {
	ActionFeedback,
};

export default ModalContentsAlert;
