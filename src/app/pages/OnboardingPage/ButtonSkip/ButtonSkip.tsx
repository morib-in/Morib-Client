import { useNavigate } from 'react-router-dom';

import type { PostInterestAreaReq } from '@/shared/types/api/onboarding';

import { ROUTES_CONFIG } from '@/router/routesConfig';

import { usePostInterestArea } from '@/shared/apisV2/onboarding/onboarding.mutations';

const ButtonSkip = () => {
	const { mutate: postInterestArea } = usePostInterestArea();
	postInterestArea({} as PostInterestAreaReq, {
		onSuccess: () => {
			navigate('/home');
		},
	});
	const navigate = useNavigate();
	const handleNavigateToHome = () => {
		navigate(ROUTES_CONFIG.home.path);
	};
	return (
		<button onClick={handleNavigateToHome} className="text-gray-04 underline underline-offset-[0.6rem] subhead-med-18">
			건너뛰기
		</button>
	);
};

export default ButtonSkip;
