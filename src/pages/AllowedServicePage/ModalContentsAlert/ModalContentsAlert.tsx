import { forwardRef } from 'react';

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
					return `'${pageName}' 허용 사이트가\n삭제되었습니다.`;
				default:
					return '';
			}
		};
		return (
			<div ref={ref} className="h-60 w-60 whitespace-pre-line bg-white">
				{getMessage()}
				<button onClick={onClick}>확인</button>
			</div>
		);
	},
);

ActionFeedback.displayName = 'ActionFeedback';

const ModalContentsAlert = {
	ActionFeedback,
};

export default ModalContentsAlert;
