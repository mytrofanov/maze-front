import { Modal, Image } from 'antd';

interface CustomModalProps {
    modalOpen: boolean;
    onOk: () => void;
    onCancel: () => void;
    image?: string;
    content?: string;
    title: string;
    width?: number;
}

const CustomModal = (props: CustomModalProps) => {
    const { modalOpen, onOk, onCancel, image, content, title, width } = props;

    return (
        <Modal title={title} centered open={modalOpen} onOk={onOk} onCancel={onCancel} width={width}>
            {content ? <p>{content}</p> : null}
            {image ? <Image width={64} src={image} /> : null}
        </Modal>
    );
};

export default CustomModal;
