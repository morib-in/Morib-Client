import { useMutation, useQuery } from '@tanstack/react-query';

import { signIn, singUp } from '../axios';

export const useSignIn = () => {
	return useMutation({ mutationFn: signIn });
};

export const useSignUp = (authorizationCode: string | null) => {
	return useQuery({
		queryKey: ['auth', authorizationCode],
		queryFn: () => singUp(authorizationCode),
	});
};
