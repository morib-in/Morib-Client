import { useRef, useState } from 'react';

import AddCategoryListModal from '@/components/templates/Button/AddCategoryListModal';

const LoginPage = () => {
	const [isOpen, setOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const showModal = () => {
		dialogRef.current?.showModal();
		setOpen(true);
	};
	return (
		<>
			<button onClick={showModal}>모달 열기</button>
			<AddCategoryListModal dialogRef={dialogRef} />
		</>
	);
};
export default LoginPage;
