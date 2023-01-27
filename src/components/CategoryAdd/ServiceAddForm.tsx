import { Form } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { categoryAPI } from '@libs/api/addCategory';
import { swalError, swalSuccess } from '@utils/helpers';
import { getAllCategoryData } from '@store/categories/categories.actions';
import { AddServiceForm } from './ServiceComponents';

const ServiceAddForm = () => {
	const [form] = Form.useForm();
	const [hasService, setHasService] = useState(false);
	const [menuLength, setMenuLength] = useState(1);
	

	const onFinish = (values) => {
		const submitInfo = [];
		const employeeObj: any = Object.entries(values)[0].map((el) => el)[1];
		for (const item in employeeObj) {
			const newDate = moment(employeeObj[item].created_at).format('YYYY-MM-DD');
			employeeObj[item].created_at = newDate;
			const topDetailsArr = [];
			if(Object.entries(employeeObj[item]?.topDetails).length > 0) {
				Object.entries(employeeObj[item]?.topDetails).map((el)=>{
					topDetailsArr.push(el[1]);
				});
				
			}
			employeeObj[item].topDetails = topDetailsArr;
			submitInfo.push(employeeObj[item]);

		}
		console.log(submitInfo);
		submitData(submitInfo[0]);
	};
	

	const submitData = async (payload) => {
		try {
			const { data, success, message } = await categoryAPI.createService(payload);
			if (success) {
				console.log(data);
				form.resetFields();
				getAllCategoryData();
				swalSuccess(message);
			} else {
				swalError(message);
			}
		} catch (error) {
			swalError(error);
		}
	};

	const handleAddMoreMenu = () => {
		setMenuLength(menuLength + 1);
		
	};


	return (
		<div>
			<h6>Add Service</h6>
			<Form layout="vertical" form={form} onFinish={onFinish} name="register" scrollToFirstError>
				<AddServiceForm form={form} handleAddMoreMenu={handleAddMoreMenu} menuLength={menuLength} />
			</Form>
		</div>
	);
};

export default ServiceAddForm;
