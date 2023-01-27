import { Button, Col, Form, Input, Upload } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import { createRef, useState } from 'react';
import { categoryAPI } from '@libs/api/addCategory';
import { swalError, swalSuccess } from '@utils/helpers';
import moment from 'moment';
import { getAllCategoryData } from '@store/categories/categories.actions';


const CategoryAddForm = () => {
   
	const [form] = Form.useForm();
	const formRef = createRef<FormInstance>();
	const [menuLength, setMenuLength] = useState(1);
    

	const submitCategoryData = async (payload) => {
		try {
			const { data, success, message } = await categoryAPI.createCategory({ categoryData: [...payload] });
			if (success) {
				console.log(data);
				getAllCategoryData();
				formRef.current?.resetFields();
				swalSuccess(message);
				setMenuLength(1);
			} else {
				swalError(message);
			}
		} catch (error) {
			swalError(error?.message);
		}
	};

	const handleAddMoreMenu = () => {
		setMenuLength(menuLength + 1);
	};

	const onCategorySubmit = (values) => {
		console.log(values);
		const submitInfo = [];
		const employeeObj: any = Object.entries(values)[0].map((el) => el)[1];
		for (const item in employeeObj) {
			const newDate = moment(employeeObj[item].created_at).format('YYYY-MM-DD HH:mm:ss');
			employeeObj[item].created_at = newDate;
			submitInfo.push(employeeObj[item]);
		}

		submitCategoryData(submitInfo);
	};
	const handlePictureGet = (event, index) => {
		if (event.fileList[0]?.response) {
			swalSuccess('Uploaded Successfully!');
			return event.fileList[0]?.response?.data?.display_url;
		}
		// return imageUrl;
	};

	return (
		<Form
			ref={formRef}
			layout="vertical"
			form={form}
			onFinish={onCategorySubmit}
			name="register"
			autoComplete='off'
			scrollToFirstError
		>
			{new Array(menuLength).fill('').map((_, id) => {
				return (
					<div key={id} className="border rounded p-3 pb-2 mt-3 mb-2 shadow shadow-sm">
						<Form.Item
							name={['categories', `${id}`, 'title']}
							label="Category Name"
							rules={[
								{
									required: true,
									message: 'Please add category name!',
								},
							]}
						>
							<Input placeholder="Appliance Repair" />
						</Form.Item>
						<Form.Item
							name={['categories', `${id}`, 'iconUrl']}
							label="Upload Icon"
							getValueFromEvent={(file) => handlePictureGet(file, id)}
							rules={[
								{
									required: true,
									message: 'Please add Icon',
								},
							]}
						>
							<Upload
								maxCount={1}
								action="https://api.imgbb.com/1/upload"
								data={{ key: process.env.imageKey }}
								name="image"
								listType="picture"
							>
								<Button icon={<UploadOutlined />}>Click to upload</Button>
							</Upload>
						</Form.Item>
						<Form.Item
							name={['categories', `${id}`, 'imageUrl']}
							label="Upload Image"
							getValueFromEvent={(file) => handlePictureGet(file, id)}
							rules={[
								{
									required: true,
									message: 'Please add Image',
								},
							]}
						>
							<Upload
								maxCount={1}
								action="https://api.imgbb.com/1/upload"
								data={{ key: process.env.imageKey }}
								name="image"
								listType="picture"
							>
								<Button icon={<UploadOutlined />}>Click to upload</Button>
							</Upload>
						</Form.Item>
					</div>
				);
			})}

			<Col span={24} className="d-flex">
				<Form.Item className="my-3">
					<Button htmlType="submit" type="primary">
						Submit
					</Button>
				</Form.Item>
				<Button
					onClick={handleAddMoreMenu}
					icon={<PlusOutlined />}
					className="my-3 ms-3"
					type="dashed"
					htmlType="button"
				>
					Add More
				</Button>
			</Col>
		</Form>
	);
};

export default CategoryAddForm;
