import { Col,  Row } from 'antd';
import { FC } from 'react';
import ServiceAddForm from './ServiceAddForm';
import CategoryList from './CategoryList';
import CategoryAddForm from './CategoryAddForm';


const CategoryAdd: FC = () => {
	return (
		<Row className="p-3" gutter={12}>
			<Col span={12}>
				<h6>Add Category</h6>
				<CategoryAddForm />
			</Col>

			
			<Col span={12}>
				<h6>Category And Service List</h6>
				<CategoryList/>
			</Col>
		</Row>
	);
};

export default CategoryAdd;
