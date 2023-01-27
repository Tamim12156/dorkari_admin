/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseAPI } from './baseAPI';
import { BR } from './interfaces';

class CategoryApi extends BaseAPI {
	constructor(baseURL: string) {
		super(baseURL);
	}
	createCategory = (payload: any) => this.post<BR<any>>('create_category', payload);
	createService = (payload: any) => this.post<BR<any>>('create_service', payload);

	getCategory = () => this.get<BR<any>>('allCategories');
	getAllServiceType = () => this.get<BR<any>>('all_service_type');

	deleteCategory = (id:any)=> this.delete<BR<any>>('delete_category',id);

	addServiceType = (payload:any)=> this.post<BR<any>>('add_service_type',payload);

	addProperty = (payload:any)=> this.post<BR<any>>('add_property',payload);
	getAllProperty = () => this.get<BR<any>>('all_property');
	deleteProperty = (id:any)=> this.delete<BR<any>>('delete_property',id);
	getAllOrders = () => this.get<BR<any>>('get_all_orders');
	updateStatus = (payload) => this.post<BR<any>>('update_status',payload);
	bookingUpdateStatus = (payload) => this.post<BR<any>>('booking_update_status',payload);
	getAllUsers = () => this.get<BR<any>>('get_all_users');
	getAllBookings = ()=> this.get<BR<any>>('get_all_property_booking');
}

export const categoryAPI = new CategoryApi(process.env.apiUrl);
