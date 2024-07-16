export const formatCalendarTitle = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	return `${year}년 ${month < 10 ? `0${month}` : month}월`;
};

export const formatInputDate = (date: Date | null): string => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return `${year}년 ${month}월 ${day}일`;
};

export const formatCalendarDate = (date: Date | null): string => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}.${month}.${day}`;
};

export const formatCalendarApiDate = (date: Date | null): string => {
	if (!date) return '';
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
};
