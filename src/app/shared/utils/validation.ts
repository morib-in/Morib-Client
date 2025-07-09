export const isUrlValid = (url: string): boolean => {
	const urlPattern = /^(https?:\/\/)?(localhost|\w+(\.\w+)+)(:\d{1,5})?(\/[\w#!:.?+=&%@!\-/]*)?$/;
	return urlPattern.test(url);
};

export const isEmailValid = (email: string): boolean => {
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
	return emailRegex.test(email);
};
