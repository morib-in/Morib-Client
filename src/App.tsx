import { Provider } from 'jotai';

import { RouterProvider } from 'react-router-dom';

import { router } from './Router';

const App = () => {
	return (
		<Provider>
			<RouterProvider router={router} />;
		</Provider>
	);
};

export default App;
