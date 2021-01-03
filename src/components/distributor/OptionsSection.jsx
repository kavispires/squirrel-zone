import React from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Select, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Engine and utilities
import { SECTION } from '../../utils/distributor';

function OptionsSection({ section, onValuesChange }) {
  const initialValues = {
    text: section.text,
    number: section.number,
    kind: section.kind,
    linesTotal: section.linesIds.length,
  };

  return (
    <Form
      layout="vertical"
      name="options-section"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      className="modal-options-form"
      autoComplete="off"
      preserve={false}
    >
      <Form.Item label="Type" name="kind" valuePropName="checked" className="modal-options-form__item">
        <Select defaultValue={section.kind}>
          {Object.values(SECTION).map((entry) => (
            <Select.Option key={entry} value={entry}>
              {entry}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <div className="modal-options-form__items modal-options-form__items--2">
        <Form.Item
          label="Number"
          name="number"
          className="modal-options-form__item"
          help="This number will be automatically generated when locking the song."
        >
          <InputNumber min={1} disabled />
        </Form.Item>

        <Form.Item label="Line Count" name="linesTotal" className="modal-options-form__item">
          <InputNumber disabled />
        </Form.Item>
      </div>

      <Form.Item
        label="Lyrics"
        name="text"
        className="modal-options-form__item"
        help="Collection of lyrics from all lines and parts."
      >
        <Input.TextArea disabled placeholder="No lyrics available yet" />
      </Form.Item>

      <Divider />

      <Form.Item
        label=""
        name="text"
        className="modal-options-form__action-button"
        help="Permanently delete this entire section."
      >
        <Button type="primary" disabled onClick={() => {}} danger icon={<DeleteOutlined />}>
          Delete This Section
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OptionsSection;
