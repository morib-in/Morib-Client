import TodoBox from '@/components/atoms/TodoBox';
import TodoToggleBtn from '@/components/atoms/TodoToggleBtn';

const LoginPage = () => {
	return (
		<div>
			Login Page
			<TodoToggleBtn title="하이" />
			<TodoBox title="노션세팅하기" date="2024-07-07" accumulatedTime={20000} />
		</div>
	);
};

export default LoginPage;
