import { getCategoriesState } from '@store/categories/categories.slice';
import { UploadOutlined } from '@ant-design/icons';
import { swalError, swalSuccess } from '@utils/helpers';
import { Button, Col, Form, Image, Input, InputNumber, message, Popconfirm, Row, Upload } from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { DetailsForm } from '@components/CategoryAdd/ServiceComponents';
import styled from 'styled-components';
import { categoryAPI } from '@libs/api/addCategory';
import { getAllPropertyData } from '@store/categories/categories.actions';

export const AddPropertyForm: FC<any> = ({ form }) => {
	const { allProperties } = useSelector(getCategoriesState);

	const handlePictureGet = (event, index) => {
		if (event.fileList[0]?.response) {
			swalSuccess('Uploaded Successfully!');
			return event.fileList[0]?.response?.data?.display_url;
		}
		// return imageUrl;
	};

	const confirm = async (_id:string) => {
        try {
            const {data,success,message} = await categoryAPI.deleteProperty({_id:_id});
            if(success) {
                swalSuccess(message);
                getAllPropertyData();
            }
            else {
                swalError(message);
            }
        } catch (error) {
            swalError(error);
        }
		
	};

	const cancel = (e: React.MouseEvent<HTMLElement>) => {
		console.log(e);
		message.error('Click on No');
	};

	return (
		<Row>
			<Col span={12} className="border rounded p-3 pb-2 mt-3 mb-2 shadow shadow-sm">
				<Form.Item
					name="title"
					label="Property Name"
					rules={[
						{
							required: true,
							message: 'Property required!',
						},
					]}
				>
					<Input placeholder="1336 Sq Ft Ready Flat For Sale In Uttar Badda" />
				</Form.Item>

				<Form.Item
					name={'imageUrl'}
					label="Upload Image"
					getValueFromEvent={(file) => handlePictureGet(file, null)}
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
					name={'price'}
					label="Price"
					rules={[
						{
							required: true,
							message: 'Price required!',
						},
					]}
				>
					<InputNumber placeholder="120000" />
				</Form.Item>
				<Form.Item
					name={'contactPhone'}
					label="Contact Phone"
					rules={[
						{
							required: true,
							message: 'Contact required!',
						},
					]}
				>
					<Input placeholder="0171102***6" />
				</Form.Item>
				<Form.Item
					name={'contactEmail'}
					label="Contact Email"
					
				>
					<Input placeholder="example@gmail.com" />
				</Form.Item>
				<Form.Item
					name="location"
					label="Location Name"
					rules={[
						{
							required: true,
							message: 'Location required!',
						},
					]}
				>
					<Input placeholder="Badda, Dhaka" />
				</Form.Item>
				<Form.Item
					name={'slug'}
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

				<div className="my-2">
					<DetailsForm form={form} name="details" />
				</div>
				<div className="my-2">
					<DetailsForm form={form} name="faq" />
				</div>
				<Form.Item className="my-3 w-100 ">
					<Button htmlType="submit" className="w-100 bg-dark text-white">
						Submit
					</Button>
				</Form.Item>
			</Col>
			<Col span={12}>
				<h6>Property List</h6>

				{allProperties?.map((el, idx) => {
					return (
						<BoxWrapper key={idx}>
							<Row gutter={12} className="align-items-center">
								<Col span={3}>
									<Image src={el.imageUrl} height={45} />
								</Col>
								<Col span={11}>
									<h6 style={{ fontSize: '0.725rem' }}>{el.title}</h6>
									<p className="my-0">{el.location}</p>
									<p className="my-0">
										<b>TK {el.price}</b>
									</p>
								</Col>
								<Col span={10} className="text-end">
									<Popconfirm
										placement="bottomLeft"
										title="Are you sure to delete this task?"
										onConfirm={()=>confirm(el._id)}
										onCancel={cancel}
										okText="Yes"
										cancelText="No"
									>
										<a href="#">Delete</a>
									</Popconfirm>
								</Col>
							</Row>
						</BoxWrapper>
					);
				})}
			</Col>
		</Row>
	);
};

const BoxWrapper = styled.div`
	margin: 0.425rem;
	padding: 0.825rem;
	border: 1px dotted #c7c7c7;
	background-color: #ececec;
	border-radius: 3px;
`;
