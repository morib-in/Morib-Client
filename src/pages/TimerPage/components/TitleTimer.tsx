interface titleNameProps {
	targetName: string;
	targetCategoryName: string;
}

const TitleTimer = ({ targetName, targetCategoryName }: titleNameProps) => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<h1 className="title-semibold-64 text-white">{targetName}</h1>;
			<h2 className="title-med-32 text-gray-04">{targetCategoryName}</h2>;
		</div>
	);
};
export default TitleTimer;
