import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput/index';
import GetCategoryBtn from '@/components/atoms/GetCategoryBtn/index';

interface CategoryCommonMoribSetProps {
	onUrlInputChange: (url: string) => void;
}

const CategoryCommonMoribSet = ({ onUrlInputChange }: CategoryCommonMoribSetProps) => {
	return (
		<div>
			<div className="flex justify-between">
				<CategoryInputTitle title="모립 세트 *" />
				<GetCategoryBtn />
			</div>
			<CategoryUrlInput variant="basic" onUrlInputChange={onUrlInputChange} />
		</div>
	);
};

export default CategoryCommonMoribSet;
