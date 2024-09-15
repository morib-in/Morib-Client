import { ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './dialog.css';

interface ModalWrapperProps {
	children: ReactNode;
	modalBorderRadius?: keyof typeof modalVariant;
}

const modalVariant = {
	radius14: 'rounded-[14px]',
	radius10: 'rounded-[10px]',
};

export interface ModalWrapperRef {
	open: () => void;
	close: () => void;
}

let openModalCount = 0;

const ModalWrapper = forwardRef<ModalWrapperRef, ModalWrapperProps>(function Modal(
	{ children, modalBorderRadius = 'radius14' },
	ref,
) {
	const dialog = useRef<HTMLDialogElement>(null);
	const [isFirstModal, setIsFirstModal] = useState(false);

	useImperativeHandle(ref, () => ({
		open() {
			if (openModalCount === 0) {
				setIsFirstModal(true);
			} else {
				setIsFirstModal(false);
			}
			openModalCount++;
			dialog.current?.showModal();
		},
		close() {
			openModalCount--;
			if (openModalCount < 0) openModalCount = 0;
			dialog.current?.close();
		},
	}));
	const modalElement = document.getElementById('modal');

	if (!modalElement) {
		return null;
	}

	return createPortal(
		<dialog
			ref={dialog}
			className={`custom-dialog ${modalVariant[modalBorderRadius]} ${isFirstModal ? 'with-backdrop' : ''}`}
		>
			{children}
		</dialog>,
		modalElement,
	);
});

export default ModalWrapper;
