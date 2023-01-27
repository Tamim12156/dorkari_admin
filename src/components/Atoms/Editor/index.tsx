/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState, useRef,FC } from 'react';

export const  Editor:FC<any> = ({ onChange, name, value }) => {
	const editorRef = useRef<any>();
	const { CKEditor, ClassicEditor } = editorRef.current || {};
	const [editorLoaded, setEditorLoaded] = useState(false);
    const editorConfiguration = {
		fontSize: {
			options: [8, 10, 12, 14, 'default', 18, 20, 24, 32, 36, 40],
			supportAllValues: true,
		},
		removePlugins: [
			'MediaEmbed',
			'Style',
			// 'Image',
			// 'ImageInsert',
			// 'ImageUpload',
			// 'ImageToolbar',
			// 'ImageResize',
			// 'ImageCaption',
			// 'ImageStyle',
			// 'LinkImage',
		],
	};

	useEffect(() => {
		editorRef.current = {
			CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
			ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
		};
		setEditorLoaded(true);
	}, []);

	return (
		<div>
			{editorLoaded ? (
				<CKEditor
                
					type=""
					name={name}
					editor={ClassicEditor}
					data={value}
					onChange={(event, editor) => {
						const data = editor.getData();
						// console.log({ event, editor, data })
						onChange(data);
					}}
                    config={editorConfiguration}
				/>
			) : (
				<div>Editor loading</div>
			)}
		</div>
	);
};
