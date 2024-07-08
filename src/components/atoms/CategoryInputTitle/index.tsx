interface CategoryInputTitleProps {
	title: string;
}

const CategoryInputTitle = ({ title }: CategoryInputTitleProps) => {
	return <div className="subhead-bold-22 pb-[1rem] text-white">{title}</div>;
};

export default CategoryInputTitle;
