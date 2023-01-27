import { getCategoriesState } from '@store/categories/categories.slice';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Collapse, Image, Popconfirm, Tag } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { categoryAPI } from '@libs/api/addCategory';
import { swalError, swalSuccess } from '@utils/helpers';
import { getAllCategoryData } from '@store/categories/categories.actions';

const { Panel } = Collapse;

const CategoryList: FC = () => {
	const { categoriesData } = useSelector(getCategoriesState);

	const handleCollapseChange = (key: string | string[]) => {
		// console.log(key);
	};

	const handleConfirmDelete = async (element) => {
		// console.log(element);
		try {
			const { data, success, message } = await categoryAPI.deleteCategory({_id:element?._id});
			if (success) {
				getAllCategoryData();
				swalSuccess(message);
			} else {
				swalError(message);
			}
		} catch (error) {
			swalError(error);
		}
	};

	return (
		<div className="mt-3">
			<Collapse onChange={handleCollapseChange}>
				{categoriesData?.length > 0 ? categoriesData?.map((el, idx) => {
					return (
						<Panel
							key={idx}
							header={
								<div className="d-flex justify-content-between">
									<span>{el?.title}</span>
									<div onClick={(e) => e.stopPropagation()}>
										<Button
											className="me-2"
											type="primary"
											shape="circle"
											icon={<EditOutlined />}
										/>
										<span>
											<Popconfirm
												title="Are you sure?"
												onConfirm={() => handleConfirmDelete(el)}
												placement="topRight"
											>
												<Button type="primary" shape="circle" icon={<DeleteOutlined />} />
											</Popconfirm>
										</span>
									</div>
								</div>
							}
						>
							<h6>Services : </h6>
							<span>
								{el.services?.length > 0 &&
									el?.services?.map((el: any, idx) => (
										<Tag className="mb-1" color="#0c4acf" key={idx}>
											{el?.title}
										</Tag>
									))}
							</span>

							<div className="mt-2">
								<Image width={180} src={el.imageUrl} loading="lazy" />
							</div>
						</Panel>
					);
				}) : <p className='text-center my-2 pb-2 text-secondary'>No data found!</p>}
			</Collapse>
		</div>
	);
};

export default CategoryList;
