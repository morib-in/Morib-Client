import TodayTodoSmallBtn from '@/components/atoms/TodayTodoSmallBtn';
import TodayTodoBox from '@/components/molecules/TodayTodoBox';

const LoginPage = () => {
	return (
		<>
			Login Page <TodayTodoSmallBtn>취소</TodayTodoSmallBtn>
			<TodayTodoBox time={2000} />
		</>
	);
};

export default LoginPage;
