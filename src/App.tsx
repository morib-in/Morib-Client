import { Provider } from 'jotai';

import { RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import router from './router/Router';
import GlobalErrorBoundary from './shared/components/ErrorBoundary/GlobalErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider>
				<GlobalErrorBoundary>
					<RouterProvider router={router} />
				</GlobalErrorBoundary>
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
