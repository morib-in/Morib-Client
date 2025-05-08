import { forwardRef } from 'react';

interface ActionFeedbackProps {
	isModalOpen: boolean;
}

const ActionFeedback = forwardRef<HTMLDivElement, ActionFeedbackProps>(({ isModalOpen }, ref) => {
	return (
		<div ref={ref} className="h-6 w-6 bg-white">
			삭제되었습니다!
		</div>
	);
});

ActionFeedback.displayName = 'ActionFeedback';

const ModalContentsAlert = {
	ActionFeedback,
};

export default ModalContentsAlert;
