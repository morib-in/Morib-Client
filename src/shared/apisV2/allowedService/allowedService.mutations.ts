import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostAddAllowedServiceReq } from '@/shared/types/api/allowedService';
import { ApiErrorResponseType } from '@/shared/types/api/error';

import {
	deleteAllowedService,
	deleteAllowedServiceGroup,
	patchChangeAllowedServiceGroupColor,
	patchChangeAllowedServiceGroupName,
	postAddAllowedService,
	postAddAllowedServiceGroup,
	postMergeAllowedSite,
} from './allowedService.api';
import { allowedServiceKeys } from './allowedService.keys';

export const usePostAddAllowedServiceGroup = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postAddAllowedServiceGroup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const usePatchChangeAllowedServiceGroupName = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchChangeAllowedServiceGroupName,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const usePatchChangeAllowedServiceGroupColor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: patchChangeAllowedServiceGroupColor,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const useDeleteAllowedServiceGroup = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAllowedServiceGroup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const usePostAddAllowedService = () => {
	const queryClient = useQueryClient();

	return useMutation<undefined, ApiErrorResponseType, PostAddAllowedServiceReq>({
		mutationFn: postAddAllowedService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const useDeleteAllowedService = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteAllowedService,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};

export const usePostMergeToParentDomain = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: postMergeAllowedSite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: allowedServiceKeys.allowedService });
		},
	});
};
