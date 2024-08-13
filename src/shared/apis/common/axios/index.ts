import { nonAuthClient } from '@/shared/apis/client';

const COMMON_URL = {
	PATCH_TASKCHANGE: (taskId: number | null) => `api/v1/tasks/${taskId}/status`,
};

export const patchTaskStatus = async (taskId: number) => {
	const { data } = await nonAuthClient.patch(COMMON_URL.PATCH_TASKCHANGE(taskId));
	return data;
};
