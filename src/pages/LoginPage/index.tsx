import TodayTodoBox from '@/components/molecules/TodayTodoBox';

import { todoData } from '@/mocks/homeData';

const LoginPage = () => {
	return (
		<>
			Login Page
			<TodayTodoBox time={2000} selectedTodayTodos={todoData} todos={todoData} />
		</>
	);
};

export default LoginPage;
