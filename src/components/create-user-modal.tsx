import { Modal, Form, Input } from 'antd';
import { nameValidator } from '../utils';
import { CreateUserFormValues } from '../types';

interface CreateUserModalProps {
    onCreate?: (values: CreateUserFormValues) => void;
    onCancel?: () => void;
    modalOpen: boolean;
}

const CreateUserModal = (props: CreateUserModalProps) => {
    const { onCreate, onCancel, modalOpen } = props;
    const [form] = Form.useForm<CreateUserFormValues>();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        form.resetFields();
    };

    const handleOk = async () => {
        const values = await form.validateFields();
        if (onCreate) {
            onCreate(values);
        }
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Please register"
                open={modalOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                cancelText="Cancel"
                okText="Ok"
                centered
            >
                <Form
                    preserve={false}
                    form={form}
                    name="create-scene"
                    layout="horizontal"
                    requiredMark="optional"
                    labelCol={{
                        xs: { span: 24 },
                        sm: { span: 8 },
                    }}
                    wrapperCol={{
                        xs: { span: 24 },
                        sm: { span: 14 },
                    }}
                >
                    <Form.Item
                        label="User name"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                type: 'string',
                                message: 'Its required fiels',
                            },
                            nameValidator('Name is not valid'),
                        ]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export type { CreateUserFormValues, CreateUserModalProps };
export default CreateUserModal;
