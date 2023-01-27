import { categoryAPI } from '@libs/api/addCategory';
import type { NextPage } from 'next';
import { Col, Empty, Image, message as Msg, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const UserList: NextPage = () => {
	const [userList, setUserList] = useState([]);
	useEffect(() => {
		getAllUserList();
	}, []);
	const getAllUserList = async () => {
		try {
			const { data, success, message } = await categoryAPI.getAllUsers();
			if (success) {
				setUserList(data);
			} else {
				Msg.error(message.toString());
			}
		} catch (error) {
			Msg.error(error.toString());
		}
	};
	return (
		<Container className="my-3 p-3 bg-white rounded">
			<Row>
				{userList?.length > 0 ? (
					userList.map((el, idx) => {
						if (el.firstName) {
							return (
								<UserBox key={idx} span={6}>
									<>
										<div className=" rounded bg-success p-3">
											<h6 style={{ fontSize: '0.875rem' }} className="text-white">
												Name: {el?.firstName + ' ' + el.lastName}
											</h6>
											<h6 style={{ fontSize: '0.875rem' }} className="text-white">
												Phone: {el?.phoneNumber}
											</h6>
										</div>
									</>
								</UserBox>
							);
						}
					})
				) : (
					<Empty />
				)}
			</Row>
		</Container>
	);
};

const UserBox = styled(Col)`
	margin: 8px 0;
	padding: 1rem;
`;

export default UserList;
