import CategoryDropdown from '@/components/molecules/CategoryDropdown';

import { CATEGORY_API } from '@/mocks/categoryData';

const LoginPage = () => {
	return (
		<div>
			<CategoryDropdown optionData={CATEGORY_API} />
		</div>
	);
};

export default LoginPage;
