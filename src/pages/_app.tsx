import store, { persistor } from '@store';
import { MainLayout } from '@components/Layouts';
import type { AppProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../../public/scss/app.scss';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { getAllCategoryData, getAllServiceType } from '@store/categories/categories.actions';

function MyApp({ Component, pageProps }: AppProps) {

	useEffect(()=>{
		getAllServiceType();
		getAllCategoryData();
	},[]);
	return (
		<ConfigProvider
			getPopupContainer={(node: any) => {
				if (node) {
					return node?.parentNode;
				}
				return document?.body;
			}}
		>
			<div>
				<Provider store={store}>
					<PersistGate loading={<h6>Loading...</h6>} persistor={persistor}>
						<ProSidebarProvider>
							<MainLayout>
								<Component {...pageProps} />
							</MainLayout>
						</ProSidebarProvider>
					</PersistGate>
				</Provider>
			</div>
		</ConfigProvider>
	);
}

// MyApp.getInitialProps = async (appContext: AppContext) => {
// 	console.log(appContext);
// 	if (typeof window !== 'undefined') {
// 		// 	const {
// 		// 		user: { profile, isAuthenticate },
// 		// 	} = store.getState();

// 		// 	if (isAuthenticate) {
// 		// 		// const data = { ...profile, token: cookies.token };
// 		// 		// ctx.authUser = data;
// 		// 	}
// 		}
// 	// const { ctx } = appContext;
// 	// const cookies = parseCookies(ctx);

// 	// if (ctx?.req) {
// 	// 	if (cookies?.token) {
// 	// 		const { token } = cookies;
// 	// 		try {
// 	// 			// const { success, data } = await authAPI.validateAuth(token, ctx);
// 	// 			// if (success && data?.token) ctx.authUser = data;
// 	// 		} catch (error) {}
// 	// 	}
// 	// } else if (typeof window !== 'undefined') {
// 	// 	const {
// 	// 		user: { profile, isAuthenticate },
// 	// 	} = store.getState();

// 	// 	if (isAuthenticate) {
// 	// 		// const data = { ...profile, token: cookies.token };
// 	// 		// ctx.authUser = data;
// 	// 	}
// 	// }

// 	// const appProps = await App.getInitialProps({ ...appContext });
// 	// appProps.pageProps = {
// 	// 	...appProps.pageProps,
// 	// 	authUser: ctx?.authUser,
// 	// };
// 	// return { ...appProps };
// return {user:'none'};
// };

export default MyApp;
