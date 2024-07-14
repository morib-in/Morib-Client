import CategoryInputTitle from '@/components/atoms/CategoryInputTitle/index';
import CategoryUrlInput from '@/components/atoms/CategoryUrlInput/index';

interface CategoryCommonMoribSetProps {
	onUrlInputChange: (url: string) => void;
}

const CategoryCommonMoribSet = ({ onUrlInputChange }: CategoryCommonMoribSetProps) => {
	return (
		<div>
			<CategoryInputTitle title="모립 세트 *" />
			<CategoryUrlInput variant="basic" onUrlInputChange={onUrlInputChange} />
		</div>
	);
};

export default CategoryCommonMoribSet;
