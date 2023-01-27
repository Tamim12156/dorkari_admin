import { AddPropertyForm } from '@components/AddProperty';
import { categoryAPI } from '@libs/api/addCategory';
import { getAllPropertyData } from '@store/categories/categories.actions';
import { swalError, swalSuccess } from '@utils/helpers';
import { Form } from 'antd';
import React, { FC, useEffect } from 'react';

const AddProperty: FC = () => {
	const [form] = Form.useForm();
	const handleSubmitForm = async (e) => {
		console.log(e);
		try {
			const { data, success, message } = await categoryAPI.addProperty({ propertyData: [e] });
			if (success) {
				swalSuccess(message);
				getAllPropertyData();
				form.resetFields();
			} else {
				swalError(message);
			}
		} catch (error) {
			swalError(error);
		}
	};

	useEffect(() => {
		getAllPropertyData();
	}, []);
	return (
		<div>
			<Form layout="vertical" form={form} onFinish={handleSubmitForm} name="register" scrollToFirstError>
				<AddPropertyForm form={form} />
			</Form>
		</div>
	);
};

export default AddProperty;
