import { Editor } from '@components/Atoms';
import { Button, Form, Modal } from 'antd';
import React, { FC, useState } from 'react';

export const DetailsForm: FC<any> = ({ id, form, name, parentName }) => {
	const [editorData, setEditorData] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		form?.setFieldValue(name, editorData);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	// const Editor = dynamic(() => import("./CkEditorComp"), { ssr: false });

	const editorLoaded = (e) => {
		console.log(e);
	};
	return (
		<div>
			<Button onClick={showModal} type="primary" className="w-100">
				Add {name}
			</Button>
			<Modal width={1000} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<Form.Item
					labelCol={{ span: 24 }}
					name={id ? [parentName || 'services', `${id}`, name] : name}
					label={name}
					rules={[
						{
							required: true,
							message: `${name} Required!`,
						},
					]}
				>
					<Editor
						onReady={(editor) => {
							// You can store the "editor" and use when it is needed.
							console.log('Editor is ready to use!', editor);
						}}
						// name="description"
						onChange={(data) => {
							// console.log(data);

							setEditorData(data);
						}}
						editorLoaded={editorLoaded}
					/>
				</Form.Item>
			</Modal>
		</div>
	);
};
