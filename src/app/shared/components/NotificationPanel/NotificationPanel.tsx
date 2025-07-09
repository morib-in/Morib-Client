import { forwardRef } from 'react';

const NotificationPanel = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div
			ref={ref}
			className="absolute right-[3.2rem] top-[11.5rem] h-[38.2rem] w-[36.9rem] rounded-[14px] bg-gray-bg-03 p-[2.8rem] drop-shadow-calendarDrop"
		>
			<h3 className="text-gray-05 body-semibold-16">알림</h3>

			<div className="flex h-[240px] flex-col items-center justify-center">
				<p className="text-center text-white subhead-semibold-18">아직 받은 알림이 없어요.</p>
			</div>
		</div>
	);
});

NotificationPanel.displayName = 'NotificationPanel';

export default NotificationPanel;
