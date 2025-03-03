export interface ApiErrorResponseType {
	response: {
		data: {
			status: number;
			message: string;
		};
	};
}
