import { useMutation } from '@tanstack/react-query';

import { postLogout } from './auth.api';

export const usePostLogout = () => {
	return useMutation({
		mutationFn: postLogout,
	});
};
