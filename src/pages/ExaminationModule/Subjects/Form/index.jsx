import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const CustomForm = (props) => {

  const { title, instanceForm, isModalOpen, setIsModalOpen, onOk, onCancel } = props;

  return (
    <Modal title={title} open={isModalOpen} onOk={onOk} onCancel={onCancel}>
      <Form form={instanceForm} autoComplete="off">
        <Form.Item name='name' rules={[{ required: true, message: "科目名称不能为空" }]}>
          <Input placeholder='请输入科目名称' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

CustomForm.propTypes = {
  title: PropTypes.string.isRequired,
  instanceForm: PropTypes.object.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default CustomForm;
