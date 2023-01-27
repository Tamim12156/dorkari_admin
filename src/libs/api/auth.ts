/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseAPI } from './baseAPI';
import { BR, IAuth, IPayloadGetOTP, IUpdatePassword } from './interfaces';

class AuthAPI extends BaseAPI {
	constructor(baseURL: string) {
		super(baseURL);
	}
	validateAuth = (token: string) => this.post<BR<IAuth>>('auth/validateUser', { token });

	resetPassSendOTP = (mobileNumber: string) => this.post<BR<string>>('auth/forgot-password', { mobileNumber });

	resetPassCheckOTP = (mobileNumber: string, code: string) =>
		this.post<BR<string>>('auth/forgot-password/check-otp', { mobileNumber, code });

	resetPassword = (mobileNumber: string, password: string, code: string) =>
		this.post<BR<string>>('auth/update-password', { mobileNumber, password, code });

	login = (data:any) => this.post<BR<any>>('auth/login', data);

	userRegister = (payload: any) => {
		return this.post<BR<any>>('auth/registration', payload);
	};

	userDetails = (phoneNumber:string)=> {
		return this.get<BR<any>>(`userDetail/${phoneNumber}`);
	};

	authGetOTP = (payload: IPayloadGetOTP) => this.post<BR<string>>('auth/register/phone', payload);
	updatePassword = (payload: IUpdatePassword) => this.post<BR<string>>('auth/update-new-password', payload);
}

export const authAPI = new AuthAPI(process.env.apiUrl);
