interface TitleTodoProps {
	title: string;
}

const TitleTodo = ({ title }: TitleTodoProps) => {
	return <h1 className="title-semibold-64 text-white">{title}</h1>;
};

export default TitleTodo;
