import CategoryDropdown from '@/components/molecules/CategoryDropdown';

const LoginPage = () => {
	const disabled = false;
	return (
		<div style={{ margin: '30px' }}>
			<CategoryDropdown disabled={disabled} />
		</div>
	);
};

export default LoginPage;
