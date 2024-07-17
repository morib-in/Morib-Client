import { useRef, useState } from 'react';

import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput/index';
import GetCategoryBtn from '@/components/atoms/GetCategoryBtn/index';
import AddCategoryListModal from '@/components/templates/AddCategoryListModal';

interface UrlInfo {
	url: string;
	domain?: string;
	favicon: string;
}

interface CategoryCommonMoribSetProps {
	onUrlInputChange: (url: string) => void;
	selectedInfo: UrlInfo[];
	handleSelectedInfo: (urlInfo: UrlInfo) => void;
	handleDeleteUrlInfo: (url: UrlInfo) => void;
	setSelectedInfo: (urlInfo: UrlInfo[]) => void;
}

const CategoryCommonMoribSet = ({
	onUrlInputChange,
	selectedInfo,
	handleSelectedInfo,
	handleDeleteUrlInfo,
	setSelectedInfo,
}: CategoryCommonMoribSetProps) => {
	const [isOpen, setOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const showModal = () => {
		dialogRef.current?.showModal();
		setOpen(true);
	};

	const closeModal = () => {
		dialogRef.current?.close();
		setOpen(false);
	};

	const handleMoveToNextModal = () => {
		showModal();
	};

	const handleCloseModal = () => {
		closeModal();
	};

	return (
		<div>
			<div className="flex justify-between">
				<CategoryInputTitle title="모립 세트 *" />
				<GetCategoryBtn onMoveCategoryModal={handleMoveToNextModal} />
				<AddCategoryListModal
					dialogRef={dialogRef}
					handleCloseModal={handleCloseModal}
					selectedInfo={selectedInfo}
					handleSelectedInfo={(urlInfo: UrlInfo) => handleSelectedInfo(urlInfo)}
					handleDeleteUrlInfo={(url: UrlInfo) => handleDeleteUrlInfo(url)}
					setSelectedInfo={setSelectedInfo}
				/>
			</div>
			<CategoryUrlInput variant="basic" onUrlInputChange={(url: string) => onUrlInputChange(url)} />
		</div>
	);
};

export default CategoryCommonMoribSet;
