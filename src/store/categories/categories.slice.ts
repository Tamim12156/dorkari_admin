import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '@store';

//initial state declaration
const initialState: StateType ={
	categoriesData:[],
	categoryList:[],
	allServices:[],
	allServiceType:[],
	allProperties:[],
};

// creating slice of category data
const slice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		//here we set all the data to categoires
		setCategories: (state, action: PayloadAction<CategoriesState>) => {
			if(action.payload?.length > 0) {
				state.categoriesData = [...action.payload];
			}
			else {
				state.categoriesData = [];
			}
			
		},
		setCategoryList: (state, action: PayloadAction<any>)=> {
			if(action.payload?.length >0) {
				state.categoryList = [...action.payload];
			}
			else {
				state.categoryList = [];
			}
			
		},
		setAllServices: (state, action: PayloadAction<AllServiceState>) => {
			state.allServices = [...action.payload];
		},
		setAllServiceType: (state, action: PayloadAction<any>) => {
			state.allServiceType = [...action.payload];
		},
		setAllProperties: (state, action: PayloadAction<any>) => {
			state.allProperties = [...action.payload];
		},
	},
});

export default slice.reducer;

export const { setCategories,setCategoryList, setAllServices,setAllServiceType, setAllProperties } = slice.actions;

export const getCategoriesState = (state: AppState): typeof initialState => state.categories;

//categories state type
type CategoriesState = {
	imageUrl: string;
	title: string;
	services?: [];
}[];

type StateType = {
	categoriesData:CategoriesState;
	categoryList:{
		title:string;
		categoryId:string;
	}[];
	allServices:AllServiceState;
	allServiceType:any[];
	allProperties:any[];
}
type AllServiceState = {
	categoryId:string;
	categoryFor?:string;
    details:string;
	imageUrl: string;
    faq:string;
	title: string;
	slug: string;
    topDetails:[];
}[];
