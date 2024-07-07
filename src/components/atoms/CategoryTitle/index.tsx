interface CategoryTitleProps {
	title: string;
}

const CategoryTitle = (props: CategoryTitleProps) => {
	return <h1 className="title-med-32 text-gray-04">{props.title}</h1>;
};

export default CategoryTitle;
