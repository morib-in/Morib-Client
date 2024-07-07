interface TodoTitleProps {
	title: string;
}

const TodoTitle = (props: TodoTitleProps) => {
	return <h1 className="title-semibold-64 text-white">{props.title}</h1>;
};

export default TodoTitle;
