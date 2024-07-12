interface TodoTitleProps {
	title: string;
}

const TodoTitle = ({ title }: TodoTitleProps) => {
	return <h1 className="title-semibold-64 text-white">{title}</h1>;
};

interface CategoryTitleProps {
	title: string;
}

const CategoryTitle = ({ title }: CategoryTitleProps) => {
	return <h2 className="title-med-32 text-gray-04">{title}</h2>;
};

const TimerTitle = () => {
	return (
		<div className="mt-[8.6rem] flex flex-col items-center gap-[1rem]">
			<TodoTitle title="스톱워치 와프 그리기" />
			<CategoryTitle title="모립 프로젝트" />
		</div>
	);
};
export default TimerTitle;
