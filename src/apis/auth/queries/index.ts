import { useQuery } from '@tanstack/react-query';

import { signIn, singUp } from '../axios';

//Todo: 서버 이슈로 회원가입/로그인/토큰 관련 API는 앱잼 끝나고 사용
export const useSignIn = () => {
	return useQuery({
		queryKey: ['auth'],
		queryFn: signIn,
	});
};

export const useSignUp = (authorizationCode: string | null) => {
	return useQuery({
		queryKey: ['auth', authorizationCode],
		queryFn: () => singUp(authorizationCode),
	});
};
