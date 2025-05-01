import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	elementId: 'modal' | 'overlay';
	children: ReactNode;
}

const Portal = ({ elementId, children }: PortalProps) => {
	const modalElement = document.getElementById(elementId);

	if (!modalElement) return null;

	return createPortal(children, modalElement);
};

export default Portal;
