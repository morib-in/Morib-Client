export const SSE_ENDPOINT = {
	GET_SSE_CONNECTION: 'api/v2/sse/connect',
	GET_SSE_REFRESH: ({ runningCategoryName }: { runningCategoryName: string }) =>
		`api/v2/sse/refresh?runningCategoryName=${runningCategoryName}`,
};
