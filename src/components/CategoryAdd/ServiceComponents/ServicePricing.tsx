import { categoryAPI } from '@libs/api/addCategory';
import { getAllServiceType } from '@store/categories/categories.actions';
import { getCategoriesState } from '@store/categories/categories.slice';
import { swalError, swalSuccess } from '@utils/helpers';
import { Button, Col, Form, Input, InputNumber, Select, Switch } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DetailsForm } from './DetailsForm';

export const ServicePricing: FC<any> = (props) => {
	const [form] = Form.useForm();
	const [hasPackage, setHasPackage] = useState(false);
	const [menuLength, setMenuLength] = useState(1);
	const { categoryList,allServices } = useSelector(getCategoriesState);

    console.log('fuchkar reee',allServices);
    

	const onFinish = (values) => {
        console.log(values);
        
		const submitInfo = [];
		const employeeObj: any = Object.entries(values)[0].map((el) => el)[1];
        
		for (const item in employeeObj) {
			const newDate = moment().format('YYYY-MM-DD');
            
			employeeObj[item]['created_at'] = newDate;
			submitInfo.push(employeeObj[item]);
		}
		submitData(submitInfo);
	};

	const submitData = async (payload) => {
        console.log(payload);
        
		try {
			const { data, success, message } = await categoryAPI.addServiceType({serviceTypeData:payload});
			if (success) {
				// console.log(data);
				form.resetFields();
				getAllServiceType();
				// getAllCategoryData();
				swalSuccess(message);
			} else {
				swalError(message);
			}
		} catch (error) {
			swalError(error);
		}
	};

	const handleSwitchChange = (checked: boolean) => {
		console.log(checked);
		setHasPackage(checked);
	};

	return (
		<div>
			<h6>Add Service Type</h6>
			<Form layout="vertical" form={form} onFinish={onFinish} name="register" scrollToFirstError>
				{new Array(menuLength).fill('').map((_, id) => {
					return (
						<div key={id} className="border rounded p-3 pb-2 mt-3 mb-2 shadow shadow-sm">
							{/* <Form.Item initialValue={hasPackage} name={['services', `${id}`, 'isPackage']} label="Is it has package?">
								<Switch defaultChecked={hasPackage} onChange={handleSwitchChange} />
							</Form.Item> */}
							<Form.Item
								name={['serviceType', `${id}`, 'title']}
								label="Type Name"
								rules={[
									{
										required: true,
										message: 'Package name required!',
									},
								]}
							>
								<Input placeholder="X package" />
							</Form.Item>
							
                            <Form.Item
								name={['serviceType', `${id}`, 'serviceName']}
								label="Choose Service"
								rules={[
									{
										required: true,
										message: 'Service Required!',
									},
								]}
							>
								{allServices && (
									<Select
										className="w-100"
										showSearch
										style={{ width: 200 }}
										placeholder="Search to Select"
										optionFilterProp="children"
										filterOption={(input, option) => (option?.label ?? '').includes(input)}
										filterSort={(optionA, optionB) =>
											(optionA?.label ?? '')
												.toLowerCase()
												.localeCompare((optionB?.label ?? '').toLowerCase())
										}
										options={
											allServices &&
											[...allServices]?.map((el) => {
												return {
													value: el.title,
													label: `${el.title}`,
												};
											})
										}
									/>
								)}
							</Form.Item>
							<Form.Item
								name={['serviceType', `${id}`, 'price']}
								label="Price"
								rules={[
									{
										required: true,
										message: 'Price is required',
									},
								]}
							>
								<InputNumber min={0}/>
							</Form.Item>
						

							<div className="my-2">
								<DetailsForm form={form} id={id} name="details" parentName='serviceType' />
							</div>
						</div>
					);
				})}

				<Col span={24} className="d-flex">
					<Form.Item className="my-3 w-100 px-3">
						<Button htmlType="submit" type="primary" className="w-100">
							Submit
						</Button>
					</Form.Item>
					{/* <Button
					onClick={handleAddMoreMenu}
					icon={<PlusOutlined />}
					className="my-3 ms-3"
					type="dashed"
					htmlType="button"
				>
					Add More
				</Button> */}
				</Col>
			</Form>
		</div>
	);
};
