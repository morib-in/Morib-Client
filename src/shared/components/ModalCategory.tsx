import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import ModalWrapper, { ModalWrapperRef } from './ModalWrapper';

interface CategoryProps {
	children: (handleCloseModal: () => void) => ReactNode;
}

export interface CategoryRef {
	open: () => void;
	close: () => void;
}

const ModalCategory = forwardRef<CategoryRef, CategoryProps>(function CategoryModal({ children }: CategoryProps, ref) {
	const queryClient = useQueryClient();
	const modalWrapperRef = useRef<ModalWrapperRef>(null);

	const handleCloseModal = () => {
		modalWrapperRef.current?.close();
		queryClient.invalidateQueries({ queryKey: ['categories'] });
		queryClient.invalidateQueries({ queryKey: ['msets'] });
	};

	useImperativeHandle(ref, () => ({
		open: () => modalWrapperRef.current?.open(),
		close: handleCloseModal,
	}));

	return (
		<ModalWrapper ref={modalWrapperRef} backdrop={false}>
			{children(handleCloseModal)}
		</ModalWrapper>
	);
});

export default ModalCategory;
