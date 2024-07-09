import CategoryDropdown from '@/components/molecules/CategoryDropdown';

import { CATEGORY_API } from '@/mocks/categoryData';

const LoginPage = () => {
	return (
		<>
			<CategoryDropdown optionData={CATEGORY_API} />
		</>
	);
};

export default LoginPage;
