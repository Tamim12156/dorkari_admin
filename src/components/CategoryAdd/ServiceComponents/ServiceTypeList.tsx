import { getCategoriesState } from '@store/categories/categories.slice';
import { Collapse } from 'antd';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const { Panel } = Collapse;

export const ServiceTypeList: FC = () => {
	const { allServiceType } = useSelector(getCategoriesState);
	console.log('mama paisis', allServiceType);

	const onChange = () => {
		console.log('jani na');
	};

	return (
		<div>
			<h6 className="mb-3">Service Type List</h6>
			{[...allServiceType].map((el, idx) => {
				return <TypeBox key={idx}>{el.title} <span> - </span> <span style={{fontWeight:600}} >{el.serviceName}</span>  <span> - </span> <span className='text-success'>{el.price}</span> BDT </TypeBox>;
			})}
			{/* <Collapse defaultActiveKey={['1']} onChange={onChange}>
				<Panel header="This is panel header 1" key="1">
					<p>amiiii</p>
				</Panel>
			</Collapse> */}
		</div>
	);
};

const TypeBox = styled.div`
    padding: 1.2rem;
    border-radius: 3px;
    font-size: 0.815rem;
    border: 1px dashed #8d8d8d;
    margin-bottom: 0.425rem;
    transition: 0.3s;
    cursor: pointer;
    &:hover {
        background-color: #e7e7e79b;
    }
`;
