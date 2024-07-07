interface CategoryInputTitleType {
	title: string;
}

const CategoryInputTitle = ({ title }: CategoryInputTitleType) => {
	return <div className="subhead-bold-22 pb-[1rem] pl-[1rem] text-white">{title}</div>;
};

export default CategoryInputTitle;
