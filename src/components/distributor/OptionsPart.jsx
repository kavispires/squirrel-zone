import React, { useCallback, useState } from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Divider, Radio } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Engine and utilities
import { ASSIGNEE, ASSIGNEE_LABEL } from '../../utils/enums';

const ASSIGNEE_OPTIONS = Object.values(ASSIGNEE).map((i) => ({ value: i, label: ASSIGNEE_LABEL[i] }));

function OptionsPart({ part, onValuesChange, onCancelModal }) {
  const [tempAssignee, setTempAssignee] = useState(part.assignee);

  const initialValues = {
    text: part.text,
    assignee: part.assignee,
    startTime: part.startTime,
    endTime: part.endTime,
    lineId: part.lineId,
  };

  const formClass = `modal-options-form modal-options-form--assignee-${tempAssignee}`;

  const deletePart = useCallback(() => {
    const confirmation = window.confirm('Are you sure you want to delete this part?');
    if (confirmation) {
      part.disconnectLine(part.lineId);
      onCancelModal();
    }
  }, [part, onCancelModal]);

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
        help="This is just a reference if the next part could or should be sung by a different person. Keep it semantic! Use A and B for vocals, C and D for raps, E and F for Ad-libs, G for All, and H
        for None."
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
        <Button type="primary" onClick={deletePart} danger icon={<DeleteOutlined />}>
          Delete This Part
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OptionsPart;
