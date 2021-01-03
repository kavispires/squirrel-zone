import React, { useState } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Divider, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Engine and utilities
import { ASSIGNEE } from '../../utils/distributor';

const ASSIGNEE_OPTIONS = Object.values(ASSIGNEE).map((i) => ({ value: i, label: i }));

function OptionsPart({ part, onValuesChange }) {
  const [tempAssignee, setTempAssignee] = useState(part.assignee);

  const initialValues = {
    text: part.text,
    assignee: part.assignee,
    startTime: part.startTime,
    endTime: part.endTime,
    lineId: part.lineId,
  };

  const formClass = `modal-options-form modal-options-form--assignee-${tempAssignee}`;

  return (
    <Form
      layout="vertical"
      name="options-line"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      className={formClass}
      autoComplete="off"
      preserve={false}
    >
      <Form.Item
        label="Assignee"
        name="assignee"
        className="modal-options-form__item"
        hint="This is just a reference if the next part could or should be sung by a different person"
      >
        <Radio.Group
          options={ASSIGNEE_OPTIONS}
          optionType="button"
          className="assignees-radio-group"
          onChange={(e) => setTempAssignee(e.target.value)}
        />
      </Form.Item>

      <Form.Item label="Lyrics" name="text" className="modal-options-form__item">
        <Input />
      </Form.Item>

      <div className="modal-options-form__items modal-options-form__items--3">
        <Form.Item label="Start Time" name="startTime" className="modal-options-form__item">
          <InputNumber />
        </Form.Item>

        <Form.Item label="End Time" name="endTime" className="modal-options-form__item">
          <InputNumber />
        </Form.Item>

        <Form.Item label="LineId" name="lineId" className="modal-options-form__item">
          <Input disabled />
        </Form.Item>
      </div>

      <Divider />

      <Form.Item
        label=""
        name="text"
        className="modal-options-form__action-button"
        help="Permanently delete this entire part."
      >
        <Button type="primary" disabled onClick={() => {}} danger icon={<DeleteOutlined />}>
          Delete This Part
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OptionsPart;
