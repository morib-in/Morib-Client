import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reloginWithoutLogout } from '@/shared/utils/auth';

import { deleteAccount, putChangeProfile } from './setting.api';
import { settingKeys } from './setting.keys';

export const usePutChangeProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: putChangeProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: settingKeys.setting });
		},
	});
};

export const useDeleteAccount = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			queryClient.invalidateQueries();
			reloginWithoutLogout();
		},
	});
};
