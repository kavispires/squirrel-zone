import React, { useState, useEffect } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Select, Spin, Divider } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
// API
import API from '../../api';
// Utilities
import { POSITIONS } from '../../utils/constants';
import { bemClass } from '../../utils';
// Components
import LoadMemberModal from './LoadMemberModal';

function EditMember() {
  const [isLoading] = useGlobalState('isLoading');
  const [isModalVisible, setModalVisibility] = useState(false);
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
    form.resetFields();
  };

  const requiredRule = [{ required: true }];

  return (
    <section className="admin__form-container">
      <h3>Create/Edit Member</h3>
      <div className={bemClass('admin-button-container', 'center')}>
        <Button type="primary" onClick={() => setModalVisibility(true)} disabled={isLoading}>
          {isLoading ? <Spin size="small" /> : 'Load Member'}
        </Button>
      </div>

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

      {isModalVisible && (
        <LoadMemberModal
          isModalVisible={isModalVisible}
          setModalVisibility={setModalVisibility}
          setLoadedData={setLoadedData}
        />
      )}
    </section>
  );
}

export default EditMember;
