interface titleNameProps {
	targetTodoTitle: string;
	targetCategoryTitle: string;
}

const TitleTimer = ({ targetTodoTitle, targetCategoryTitle }: titleNameProps) => {
	return (
		<header className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<h1 className="title-semibold-64 text-white">{targetTodoTitle}</h1>
			<h2 className="title-med-32 text-gray-04">{targetCategoryTitle}</h2>
		</header>
	);
};
export default TitleTimer;
