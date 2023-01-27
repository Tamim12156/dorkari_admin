import { Button, Col, Form, Input, Radio, Row, Switch } from 'antd';
import React, { FC, useState } from 'react';
import Icon, { PlusOutlined } from '@ant-design/icons';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const AddSideBarMenu: FC = () => {
    const [form] = Form.useForm();
    const [hasSubMenu, setHasSubMenu] = useState(false);
    const [menuLength, setMenuLength] = useState(1);

    const onFinish = (values) => {
        console.log(values);
    };

    const handleSwitch = (e: boolean) => {
        // console.log(e);
        setHasSubMenu(e);
    };

    const handleAddMoreMenu = () => {
        setMenuLength(menuLength + 1);
    };

    return (
        <Row gutter={6}>

            <Col span={12}>
                <Form layout="vertical" form={form} onFinish={onFinish} name="register" scrollToFirstError>
                    {new Array(menuLength).fill('').map((_, id) => {
                        return (
                            <div key={id} className="border rounded p-3 my-3 shadow shadow-md">
                                <Form.Item
                                    name="label"
                                    label="Menu Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please add menu name',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Home or About" />
                                </Form.Item>
                                <Form.Item
                                    name="pageUrl"
                                    label="Page URL"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please add Page URL',
                                        },
                                    ]}
                                >
                                    <Input placeholder="/home or /about" />
                                </Form.Item>
                                <Form.Item label="Has Submenu?" valuePropName="checked" name="hasSubmenu">
                                    <Switch onChange={handleSwitch} />
                                </Form.Item>
                            </div>
                        );
                    })}

                    <Col span={24} className='d-flex'>
                        
                        <Form.Item className="my-3">
                            <Button htmlType="submit" type="primary">
                                Submit
                            </Button>
                        </Form.Item>
                        <Button
                            onClick={handleAddMoreMenu}
                            icon={<PlusOutlined />}
                            className="my-3 ms-3"
                            type="dashed"
                            htmlType="button"
                        >
                            Add More
                        </Button>
                    </Col>
                </Form>
            </Col>
            <Col></Col>
        </Row>
    );
};

export default AddSideBarMenu;
