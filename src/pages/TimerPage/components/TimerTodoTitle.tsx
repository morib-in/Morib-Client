interface TodoTitleProps {
	title: string;
}

const TodoTitle = ({ title }: TodoTitleProps) => {
	return <h1 className="title-semibold-64 text-white">{title}</h1>;
};

export default TodoTitle;
