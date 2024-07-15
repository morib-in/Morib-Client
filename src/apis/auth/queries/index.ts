import { useMutation } from '@tanstack/react-query';

import { signIn, singUp } from '../axios';

export const useSignIn = () => {
	return useMutation({ mutationFn: signIn });
};

export const useSignUp = () => {
	return useMutation({
		mutationFn: singUp,
	});
};
