import CategoryAdd from '@components/CategoryAdd';
import { categoryAPI } from '@libs/api/addCategory';
import { setCategoriesData } from '@store/categories/categories.actions';
import { swalError } from '@utils/helpers';
import type { NextPage } from 'next';
import {  useEffect } from 'react';

const AddCategories: NextPage = (props: PropsType) => {
	// console.log(props);
	useEffect(() => {
		if (props?.categoryData?.length > 0) {
			setCategoriesData(props.categoryData);
		} else {
            setCategoriesData(null);
			// swalError('Something worng');
		}
	}, [props]);

	return (
		<div >
			<CategoryAdd />
		</div>
	);
};

export async function getServerSideProps() {
	try {
		const { data, success, message } = await categoryAPI.getCategory();
        
		if (success) {
			return {
				props: {
					categoryData: data ,
				},
			};
		} else {
			return {
				props: {
					categoryData: [],
				},
			};
		}
	} catch (error) {
		return {
			props: {
				categoryData: [],
			},
		};
	}
}

type PropsType = {
	categoryData: [];
};

export default AddCategories;
