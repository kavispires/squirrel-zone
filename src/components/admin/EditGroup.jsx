import React, { useState, useEffect } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Select, Divider, Typography } from 'antd';
// API
import API from '../../adapters';
// Store
import store from '../../services/store';
// Utilities
import { bemClass } from '../../utils';
// Components
import LoadGroupModal from '../modals/LoadGroupModal';
import ButtonContainer from '../ButtonContainer';

function EditGroup() {
  const [loadedData, setLoadedData] = useState(false);
  const [membersOptions, setMembersOptions] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(loadedData);
  }, [form, loadedData]);

  useEffect(() => {
    async function loadMembers() {
      setMembersOptions(await store.getCollection('members'));
    }
    loadMembers();
  }, []);

  const onFinish = async (values) => {
    try {
      await API.saveGroup(values);
      form.resetFields();
    } catch (_) {}
  };

  const onReset = () => {
    form.resetFields();
  };

  const requiredRule = [{ required: true }];

  return (
    <section className="admin__form-container">
      <Typography.Title level={3}>Create/Edit Group</Typography.Title>

      <ButtonContainer alignment="center">
        <LoadGroupModal setLoadedData={setLoadedData} />
      </ButtonContainer>

      <Divider />

      <Form
        layout="vertical"
        form={form}
        name="edit-group"
        onFinish={onFinish}
        className="admin-form admin-edit-group-form"
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
          <Form.Item label="Debut Year" name="debutYear" className="admin-form__item">
            <InputNumber min={1950} />
          </Form.Item>
          <Form.Item label="Disbandment Year" name="disbandmentYear" className="admin-form__item">
            <InputNumber min={1950} />
          </Form.Item>
        </div>

        <Form.Item label="Members" name="membersIds" className={bemClass('admin-form__item', 'double')}>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select the members"
          >
            {membersOptions &&
              membersOptions.map((member) => <Select.Option key={member.id}>{member.name}</Select.Option>)}
          </Select>
        </Form.Item>

        <Form.Item className="admin-form__item">
          <ButtonContainer alignment="right">
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Save Group
            </Button>
          </ButtonContainer>
        </Form.Item>
      </Form>
    </section>
  );
}

export default EditGroup;
