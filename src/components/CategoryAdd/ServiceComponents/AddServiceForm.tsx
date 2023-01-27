import { Button, Col, Form, Input, Modal, Select, Upload } from 'antd';
import React, { FC, useState } from 'react';
import { PlusOutlined, CloseCircleOutlined,UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getCategoriesState } from '@store/categories/categories.slice';
import { DetailsForm } from './DetailsForm';
import { swalSuccess } from '@utils/helpers';
// import { CkEditorComp } from './CkEditorComp';

export const AddServiceForm: FC<any> = (props) => {
	const { categoryList } = useSelector(getCategoriesState);
	const { menuLength, handleAddMoreMenu, form } = props;
	const [moreDetails, setMoreDetails] = useState([
		{
			label: 'Top Details',
		},
	]);

	const handleAddMoreDetails = () => {
		setMoreDetails((prevState) => [
			...prevState,
			{
				label: 'Top Details',
			},
		]);
	};

	const handlePictureGet = (event, index) => {
		if (event.fileList[0]?.response) {
			swalSuccess('Uploaded Successfully!');
			return event.fileList[0]?.response?.data?.display_url;
		}
		// return imageUrl;
	};

	const deleteDetails = (id) => {
		const newMoreDetails = [...moreDetails];
		const finalData = newMoreDetails.filter((el, idx) => idx !== id);
		setMoreDetails(finalData);
	};

	// console.log('lololoo',categoryList);
	

	return (
		<div>
			{new Array(menuLength).fill('').map((_, id) => {
				return (
					<div key={id} className="border rounded p-3 pb-2 mt-3 mb-2 shadow shadow-sm">
						<Form.Item
							name={['services', `${id}`, 'title']}
							label="Service Name"
							rules={[
								{
									required: true,
									message: 'Service required!',
								},
							]}
						>
							<Input placeholder="AC Repair" />
						</Form.Item>
						<Form.Item
							name={['services', `${id}`, 'categoryFor']}
							label="Choose Category"
							rules={[
								{
									required: true,
									message: 'Category Required!',
								},
							]}
						>
							{categoryList && (
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
										categoryList &&
										[...categoryList]?.map((el) => {
											return {
												value: el.categoryId,
												label: el.title,
											};
										})
									}
								/>
							)}
						</Form.Item>
						<Form.Item
							name={['services', `${id}`, 'imageUrl']}
							label="Upload Image"
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
							name={['services', `${id}`, 'slug']}
							label="Slug"
							rules={[
								{
									required: true,
									message: 'Slug required!',
								},
							]}
						>
							<Input placeholder="/ac-repair" />
						</Form.Item>

						{/* </Form.Item> */}
						{moreDetails.map((_, idx) => {
							return (
								<Form.Item
									style={{ position: 'relative' }}
									key={idx}
									name={['services', `${id}`, 'topDetails', `${idx}`]}
									label={
										<div className="d-flex align-items-center ">
											{' '}
											<span>Top Details</span>{' '}
											{idx > 0 && (
												<span
													onClick={() => deleteDetails(idx)}
													style={{ position: 'absolute', left: '240px', bottom: '3px' }}
												>
													<CloseCircleOutlined />
												</span>
											)}
										</div>
									}
									rules={[
										{
											required: true,
											message: 'Top Details Required!',
										},
									]}
								>
									<Input placeholder="Your Top Details" />
								</Form.Item>
							);
						})}
						<Button onClick={handleAddMoreDetails} className="mb-2" type="dashed" icon={<PlusOutlined />}>
							Add more
						</Button>

						<div className="my-2">
							<DetailsForm form={form} id={id} name='details' />
						</div>
						<div className="my-2">
							<DetailsForm form={form} id={id} name='faq' />
						</div>
					</div>
				);
			})}

			<Col span={24} className="d-flex">
				<Form.Item className="my-3 w-100 px-3">
					<Button htmlType="submit" type="primary" className='w-100'>
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
		</div>
	);
};
