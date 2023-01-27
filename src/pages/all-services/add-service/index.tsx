import ServiceAddForm from '@components/CategoryAdd/ServiceAddForm';
import { ServicePricing, ServiceTypeList } from '@components/CategoryAdd/ServiceComponents';
import { Col, Row } from 'antd';
import type { NextPage } from 'next';

const AddService:NextPage = () => {
    return (
        <Row className='m-2 ' gutter={12}>
            <Col span={8}>
				<ServiceAddForm />
			</Col>
            <Col span={8}>
				<ServicePricing />
			</Col>
            <Col span={8}>
				<ServiceTypeList/>
			</Col>
        </Row>
    );
};

export default AddService;