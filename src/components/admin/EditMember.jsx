import React from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Select } from 'antd';
// API
import API from '../../api';
// Utilities
import { POSITIONS } from '../../utils/constants';

function EditMember() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await API.saveMember(values);
      form.resetFields();
    } catch (_) {}
  };

  const onReset = () => {
    form.resetFields();
  };

  const requiredRule = [{ required: true }];

  return (
    <section className="admin__form-container">
      <h3>Create/Edit Member</h3>
      <Form
        layout="vertical"
        form={form}
        name="options-line"
        initialValues={{}}
        onFinish={onFinish}
        className="admin-form admin-edit-member-form"
        autoComplete="off"
        preserve={false}
      >
        <Form.Item label="Name" name="name" className="admin-form__item" rules={requiredRule}>
          <Input />
        </Form.Item>

        <div className="admin-form__items admin-form__items--2">
          <Form.Item label="Color" name="color" className="admin-form__item" rules={requiredRule}>
            <Input />
          </Form.Item>
          <Form.Item label="Color Name" name="colorName" className="admin-form__item">
            <Input />
          </Form.Item>
        </div>

        <div className="admin-form__items admin-form__items--2">
          <Form.Item label="Codename" name="codename" className="admin-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Tagline" name="tagline" className="admin-form__item">
            <Input />
          </Form.Item>
        </div>

        <div className="admin-form__items admin-form__items--4">
          <Form.Item label="Age" name="age" className="admin-form__item">
            <InputNumber min={12} />
          </Form.Item>
          <Form.Item
            label="Contestant"
            name="isContestant"
            className="admin-form__item"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
          <Form.Item label="Positions" name="positions" className="admin-form__item admin-form__item--double">
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="Please select a position"
            >
              {Object.values(POSITIONS).map((position) => (
                <Select.Option key={position}>{position}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div></div>
        </div>

        <Form.Item className="Item">
          <Button type="primary" htmlType="submit">
            Save Member
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
}

export default EditMember;
