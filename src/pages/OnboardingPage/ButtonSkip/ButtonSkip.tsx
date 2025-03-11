import { useNavigate } from 'react-router-dom';

import { ROUTES_CONFIG } from '@/router/routesConfig';

const ButtonSkip = () => {
	const navigate = useNavigate();
	const handleNavigateToHome = () => {
		navigate(ROUTES_CONFIG.home.path);
	};
	return (
		<button onClick={handleNavigateToHome} className="subhead-reg-20 text-gray-04 underline underline-offset-[0.6rem]">
			건너뛰기
		</button>
	);
};

export default ButtonSkip;
