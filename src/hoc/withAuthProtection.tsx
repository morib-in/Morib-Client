import React from 'react';

// import { Navigate } from 'react-router-dom';

// import { getAccessTotken } from '@/utils/token';

const withAuthProtection = (WrappedComponent: React.ComponentType) => {
	const HOC: React.FC = (props) => {
		//Todo: 개발이 진행되면 실제 토큰 상태를 받아서 login page로 이동 시킴
		// const accessToken = getAccessTotken();
		// if (!accessToken) {
		// 	alert('로그인 해주세요');
		// 	return <Navigate to="/login" replace />;
		// }

		return <WrappedComponent {...props} />;
	};

	return HOC;
};

export default withAuthProtection;
