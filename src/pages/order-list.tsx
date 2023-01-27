import { MainLayout } from '@components/Layouts';
import { categoryAPI } from '@libs/api/addCategory';
import { Button, Col, Empty, Row, message as Msg } from 'antd';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const OrderList: NextPage = () => {
	const [orderLists, setOrderLists] = useState([]);

	useEffect(() => {
		getAllListData();
	}, []);

	const getAllListData = async () => {
		try {
			const { data, success, message } = await categoryAPI.getAllOrders();
			if (success) {
				setOrderLists(data);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleClickBtn = async (status: string, _id: string) => {
		const payload = {
			status:status,
			_id:_id,
		};

		try {
			const { data, success, message } = await categoryAPI.updateStatus(payload);
			if (success) {
                Msg.success(message.toString());
                getAllListData();
				// setOrderLists(data);
			}
            else {
                Msg.error(message.toString());
            }
		} catch (error) {
			Msg.error(error.toString());
		}
	};
	return (
		<div>
			<Container className="my-3 p-3 bg-white rounded">
				<h6 style={{ fontSize: '0.825rem' }}>Order List</h6>
				{orderLists?.length > 0 ? (
					orderLists.map((el, idx) => {
						return (
							<ListWrapper key={idx}>
								<Row>
									<Col span={10}>
										<h6 style={{ fontSize: '0.875rem' }}>{el.serviceName}</h6>
									</Col>
									<Col span={14} className="text-end">
										<h6 style={{ fontSize: '0.725rem' }}>
											{' '}
											BDT <span>{el.price}</span>{' '}
										</h6>
									</Col>
									<Col span={24} className="text-start">
										<h6 style={{ fontSize: '0.725rem' }}>
											User Name: <span>{el.firstName + ' ' + el.lastName}</span>{' '}
										</h6>
									</Col>
									<Col span={24} className="text-start">
										<h6 style={{ fontSize: '0.725rem' }}>
											Category: <span>{el.title}</span>{' '}
										</h6>
									</Col>
									<Col span={24} className="text-start">
										<h6 style={{ fontSize: '0.725rem' }}>
											status: <span className="text-info">{el.status}</span>{' '}
										</h6>
									</Col>
									<Col span={20} className="text-start">
										<h6 style={{ fontSize: '0.725rem' }}>
											Payment Method:{' '}
											<span className="text-info">
												{el.paymentMethod ? (
													<span className="text-success">{el.paymentMethod}</span>
												) : (
													<span className="text-danger">Not Selected Yet!</span>
												)}
											</span>{' '}
										</h6>
									</Col>
									<Col span={4}>
										<Button
											className="me-2"
											type="primary"
                                            disabled={el.status === 'accept'}
											onClick={() => handleClickBtn('accept', el._id)}
										>
											Accept
										</Button>
										<Button disabled={el.status === 'reject'} onClick={() => handleClickBtn('reject', el._id)}>Reject</Button>
									</Col>
								</Row>
							</ListWrapper>
						);
					})
				) : (
					<Empty />
				)}
			</Container>
		</div>
	);
};

const ListWrapper = styled.div`
	padding: 1rem;
	background-color: #e0e0e0;
	border-radius: 4px;
	margin: 8px 8px;
`;

export default OrderList;
