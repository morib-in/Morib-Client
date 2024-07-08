import CategoryDropdownBtn from '@/components/atoms/CategoryDropdownBtn';
import DropdownOptionsList from '@/components/molecules/DropdownOptionsList';

import { CATEGORY_API } from '@/mocks/categoryData';

const CategoryDropdown = () => {
	return (
		<>
			<CategoryDropdownBtn />
			<DropdownOptionsList optionData={CATEGORY_API} />
		</>
	);
};

export default CategoryDropdown;
