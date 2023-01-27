import { categoryAPI } from '@libs/api/addCategory';
import store from '@store';
import { swalError } from '@utils/helpers';
import { setAllServices, setCategories, setCategoryList,setAllServiceType, setAllProperties } from './categories.slice';

export const setCategoriesData = async (data: CategoriesState): Promise<void> => {
	store.dispatch(setCategories(data));
	setAllCategoryList(data);
};

export const setAllCategoryList = async (data: CategoriesState): Promise<void> => {
	if (data?.length > 0) {
		const categoryData = [...data].map((el) => {
			console.log('ahonaaa',el);
			return {
				title: el.title,
				categoryId: el._id,
			};
		});
		store.dispatch(setCategoryList(categoryData));
	}
	else {
		store.dispatch(setCategoryList([]));
	}

	// console.log('nice');
};

export const getAllCategoryData = async () => {
	try {
		const { data, success, message } = await categoryAPI.getCategory();
		if (success) {
			if (data?.length > 0) {
				// alert('ok');
				setAllCategoryList(data);
				store.dispatch(setCategories(data));
				setAllServicesFunc(data);
			}
			else {
				setAllCategoryList([]);
				store.dispatch(setCategories([]));
			}
		} else {
			store.dispatch(setCategories(data));
			setAllCategoryList(data);
		}
	} catch (error) {
		swalError(error);
	}
};

export const setAllServicesFunc = async (data:CategoriesState) => {
	const serviceArray:AllServiceState = [];
	[...data].map((el,idx)=> {
		console.log(el);
		
		 el?.services?.map((service)=> serviceArray.push(service)
		 );
	});
	store.dispatch(setAllServices(serviceArray));
};

export const getAllServiceType = async ()=> {
	try {
		const { data, success, message } = await categoryAPI.getAllServiceType();
		if (success) {
			if (data?.length > 0) {
				// alert('ok');
				store.dispatch(setAllServiceType(data));
			}
			else {
				store.dispatch(setAllServiceType([]));
			}
		} else {
			store.dispatch(setAllServiceType(data));
		}
	} catch (error) {
		swalError(error);
	}
};
export const getAllPropertyData = async ()=> {
	try {
		const { data, success, message } = await categoryAPI.getAllProperty();
		if (success) {
			if (data?.length > 0) {
				// alert('ok');
				store.dispatch(setAllProperties(data));
			}
			else {
				store.dispatch(setAllProperties([]));
			}
		} else {
			store.dispatch(setAllProperties(data));
		}
	} catch (error) {
		swalError(error);
	}
};

// export const setAllServiceTypeFunc = async (data:any)=> {
// 	store.dispatch(setAllServiceType(data));
// };

type CategoriesState = {
	imageUrl: string;
	title: string;
	services?: [];
	_id: string;
}[];

type AllServiceState = {
	categoryId:string;
    details:string;
	imageUrl: string;
    faq:string;
	title: string;
	slug: string;
    topDetails:[];
}[];
