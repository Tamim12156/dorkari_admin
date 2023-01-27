import store from '@store';
import { authPopup, authSignIn, authSignOut } from '@store/actions';
// import { destroyCookie, setCookie } from 'nookies';
/**
 * Set app user if credentials are valid
 * @param data
 */
export const setAuthUser = async (data: IAuth): Promise<void> => {
	const { token, ...rest } = data;
	// setCookie(null, 'token', token, {
	// 	maxAge: 2 * 24 * 60 * 60,
	// 	path: '/',
	// 	// sameSite: 'Strict',
	// 	// secure: process.env.nodeEnv === 'production',
	// });
	store.dispatch(authSignIn(rest));
	store.dispatch(authPopup({ isActive: false, type: null }));
};

/**
 * Revoke app user access
 */
export const revokeAuthUser = (): Promise<void> => {
	return new Promise((resolve) => {
		// destroyCookie(null, 'token');
		store.dispatch(authSignOut());
		resolve();
	});
};

/**
 * Set global data such as `cart count`, `notifications`
 */

export interface GlobeData {
	user: IAuth;
}
export interface IAuth {
	id: string;
	firstName: string;
	lastName: string;
	avatarURL?: string;
	mobileNumber?: string;
	token: string;
	email?: string;
}
