import React, { useState, useEffect } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Select, Divider, Typography } from 'antd';
// API
import API from '../../adapters';
// Utilities
import { POSITIONS } from '../../utils/constants';
import { bemClass } from '../../utils';
// Components
import LoadMemberModal from '../modals/LoadMemberModal';
import ButtonContainer from '../ButtonContainer';

function EditMember() {
  const [loadedData, setLoadedData] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(loadedData);
  }, [form, loadedData]);

  const onFinish = async (values) => {
    try {
      await API.saveMember(values);
      form.resetFields();
    } catch (_) {}
  };

  const onReset = () => {
    setLoadedData(false);
    form.resetFields();
  };

  const requiredRule = [{ required: true }];

  return (
    <section className="admin__form-container">
      <Typography.Title level={3}>Create/Edit Member</Typography.Title>

      <ButtonContainer fullWidth center>
        <LoadMemberModal setLoadedData={setLoadedData} />
      </ButtonContainer>

      <Divider />

      <Form
        layout="vertical"
        form={form}
        name="edit-member"
        onFinish={onFinish}
        className="admin-form admin-edit-member-form"
        autoComplete="off"
        preserve={false}
      >
        <Form.Item label="ID" name="id" className="admin-form__item">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Name" name="name" className="admin-form__item" rules={requiredRule}>
          <Input />
        </Form.Item>

        <div className={bemClass('admin-form__items', '2')}>
          <Form.Item label="Color" name="color" className="admin-form__item" rules={requiredRule}>
            <Input />
          </Form.Item>
          <Form.Item label="Color Name" name="colorName" className="admin-form__item">
            <Input />
          </Form.Item>
        </div>

        <div className={bemClass('admin-form__items', '2')}>
          <Form.Item label="Codename" name="codename" className="admin-form__item">
            <Input />
          </Form.Item>
          <Form.Item label="Tagline" name="tagline" className="admin-form__item">
            <Input />
          </Form.Item>
        </div>

        <div className={bemClass('admin-form__items', '4')}>
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
          <Form.Item label="Positions" name="positions" className={bemClass('admin-form__item', 'double')}>
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

        <Form.Item className="admin-form__item">
          <div className={bemClass('admin-button-container', 'right')}>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Save Member
            </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
}

export default EditMember;
