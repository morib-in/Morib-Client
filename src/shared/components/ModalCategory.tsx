import { ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import './dialog.css';

interface CategoryProps {
	children: (handleCloseModal: () => void) => ReactNode;
}

export interface CategoryRef {
	open: () => void;
	close: () => void;
}

const ModalCategory = forwardRef<CategoryRef, CategoryProps>(function CategoryModal({ children }: CategoryProps, ref) {
	const queryClient = useQueryClient();
	const dialogRef = useRef<HTMLDialogElement>(null);

	const handleOpenModal = () => {
		dialogRef.current?.showModal();
	};

	const handleCloseModal = () => {
		dialogRef.current?.close();
		queryClient.invalidateQueries({ queryKey: ['categories'] });
		queryClient.invalidateQueries({ queryKey: ['msets'] });
	};

	useImperativeHandle(ref, () => ({
		open: handleOpenModal,
		close: handleCloseModal,
	}));

	return (
		<dialog
			ref={dialogRef}
			className="custom-dialog h-[80rem] w-[81.6rem] rounded-[14px] bg-gray-bg-03 px-[4.4rem] pb-[3rem] pt-[2.8rem]"
		>
			{children(handleCloseModal)}
		</dialog>
	);
});

export default ModalCategory;
