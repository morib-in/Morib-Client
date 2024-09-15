import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import './dialog.css';

interface ModalWrapperProps {
	children: ReactNode;
}

export interface ModalWrapperRef {
	open: () => void;
	close: () => void;
}

const ModalWrapper = forwardRef<ModalWrapperRef, ModalWrapperProps>(function Modal({ children }, ref) {
	const dialog = useRef<HTMLDialogElement>(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				dialog.current?.showModal();
			},
			close() {
				dialog.current?.close();
			},
		};
	});

	const modalElement = document.getElementById('modal');

	if (!modalElement) {
		return null;
	}

	return createPortal(
		<dialog ref={dialog} className="custom-dialog">
			{children}
		</dialog>,
		modalElement,
	);
});

export default ModalWrapper;
