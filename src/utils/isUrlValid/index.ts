export const isUrlValid = (url: string) => {
	const isUrlValid = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return isUrlValid.test(url);
};
