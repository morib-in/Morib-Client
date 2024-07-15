import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput/index';
import GetCategoryBtn from '@/components/atoms/GetCategoryBtn/index';

interface CategoryCommonMoribSetProps {
	onUrlInputChange: (url: string) => void;
}

const CategoryCommonMoribSet = ({ onUrlInputChange }: CategoryCommonMoribSetProps) => {
	const handleMoveToNextModal = () => {
		console.log();
	};
	return (
		<div>
			<div className="flex justify-between">
				<CategoryInputTitle title="모립 세트 *" />
				<GetCategoryBtn onMoveCategoryModal={handleMoveToNextModal} />
			</div>
			<CategoryUrlInput variant="basic" onUrlInputChange={(url: string) => onUrlInputChange(url)} />
		</div>
	);
};

export default CategoryCommonMoribSet;
