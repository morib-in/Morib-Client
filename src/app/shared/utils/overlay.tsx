import { overlay as overlayKit } from 'overlay-kit';

import { ReactNode } from 'react';

interface OverlayProps {
	backdrop?: boolean;
	content: (props: { isOpen: boolean; close: () => void }) => ReactNode;
}

export const overlay = ({ content, backdrop = true }: OverlayProps) => {
	overlayKit.open(({ isOpen, close }) =>
		isOpen ? (
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center ${
					backdrop ? 'bg-[rgba(0,0,0,0.7)]' : 'bg-transparent'
				}`}
				onClick={close}
			>
				<div onClick={(e) => e.stopPropagation()}>{content({ isOpen, close })}</div>
			</div>
		) : null,
	);
};
