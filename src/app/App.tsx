import { Provider } from 'jotai';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/shared/apisV2/queryClient';

import router from './router/Router';

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<div style={{ fontSize: '16px' }}>
				<ReactQueryDevtools initialIsOpen={false} />
			</div>
			<Provider>
				<RouterProvider router={router} />
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
