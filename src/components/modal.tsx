import { Modal, Image } from 'antd';
import './modal.css';

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
            <div className="modal-content">
                {content ? <p>{content}</p> : null}
                {image ? <Image width={64} src={image} /> : null}
            </div>
        </Modal>
    );
};

export default CustomModal;
