import CategoryModalLeft from '@/components/molecules/CategoryModalLeft';

import { CATEGORY_API } from '@/mocks/categoryData';

const LoginPage = () => {
	return (
		<>
			<CategoryModalLeft optionData={CATEGORY_API} />
		</>
	);
};

export default LoginPage;
