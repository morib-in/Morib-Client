import { MouseEvent, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './styles/dialog.css';

interface ModalWrapperProps {
	children: (props: { isModalOpen: boolean }) => ReactNode;
	backdrop?: boolean;
}

export interface ModalWrapperRef {
	open: () => void;
	close: () => void;
}

const ModalWrapper = forwardRef<ModalWrapperRef, ModalWrapperProps>(function Modal(
	{ children, backdrop = false },
	ref,
) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => ({
		open() {
			dialog.current?.showModal();
			setIsModalOpen(true);
		},
		close() {
			dialog.current?.close();
			setIsModalOpen(false);
		},
	}));
	const modalElement = document.getElementById('modal');

	const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialog.current) {
			dialog.current?.close();
			setIsModalOpen(false);
		}
	};

	if (!modalElement) {
		return null;
	}

	const content =
		typeof children === 'function'
			? (children as (props: { isModalOpen: boolean }) => ReactNode)({ isModalOpen })
			: children;

	return createPortal(
		<dialog
			ref={dialog}
			onClick={handleClick}
			className={`custom-dialog bg-transparent ${backdrop ? 'with-backdrop' : ''}`}
		>
			{content}
		</dialog>,
		modalElement,
	);
});

export default ModalWrapper;
