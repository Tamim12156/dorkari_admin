import { PlusOutlined } from '@ant-design/icons';
import { imageApi } from '@libs/api/uploadImage';
import { swalError, swalSuccess } from '@utils/helpers';
import { Image, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useState } from 'react';

const getBase64 = (file: RcFile): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});

export const UploadImage: React.FC<any> = ({handleUploadFile,index}) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	
	const [progress, setProgress] = useState(0);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {

		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};

	const handleChange: UploadProps['onChange'] = async (e) => {
		const { file, fileList: newFileList, event } = e;
		setFileList(newFileList);
	};

	const uploadImagee = async (options) => {
		const { onSuccess, onError, file, onProgress } = options;
		const fmData = new FormData();
		fmData.append('image', file);
		fmData.append('key', process.env.imageKey);
		try {
			const { data, success, message } = await imageApi.uploadImageToBB(fmData);
			if (success) {
				swalSuccess(message);
				// console.log(data);
				handleUploadFile(data.display_url,index);
			} else {
				swalError(message);
			}
			onSuccess('Ok');
		} catch (err) {
			swalError(err?.message);
			console.log('Eroor: ', err);
			const error = new Error('Some error');
			onError({ err });
		}
	};

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);
	return (
		<>
			<Upload
			
				customRequest={uploadImagee}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				{fileList.length === 1 ? null : uploadButton}
			</Upload>
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<Image alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
           
		</>
	);
};
