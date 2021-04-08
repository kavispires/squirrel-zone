import React, { useState, useCallback } from 'react';

// Design Resources
import { Button, Form, Input, Switch, Select, Divider, Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// Engine and utilities
import { SKILL, SKILL_TYPE } from '../../utils/enums';

function OptionsLine({ line, onValuesChange }) {
  const [skill, setSkill] = useState(line?.skill ?? SKILL.VOCAL);

  const onSkillChange = useCallback((value) => {
    setSkill(value);
  }, []);

  const initialValues = {
    text: line.text,
    skill: line.skill,
    skillType: line.skillType,
    skillLevel: line.skillLevel,
    isDismissible: line.isDismissible,
    partsTotal: line.partsIds.length,
  };

  const skillTypes = SKILL_TYPE[skill];

  return (
    <Form
      layout="vertical"
      name="options-line"
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      className="modal-options-form"
      autoComplete="off"
      preserve={false}
    >
      <div className="modal-options-form__items modal-options-form__items--3">
        <Form.Item label="Skill" name="skill" valuePropName="checked" className="modal-options-form__item">
          <Select onChange={onSkillChange} defaultValue={line.skill}>
            {Object.values(SKILL).map((entry) => (
              <Select.Option key={entry} value={entry}>
                {entry}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Skill Type"
          name="skillType"
          valuePropName="checked"
          className="modal-options-form__item"
        >
          <Select defaultValue={line.skillType}>
            {Object.values(skillTypes).map((entry) => (
              <Select.Option key={entry} value={entry}>
                {entry}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Skill Level"
          name="skillLevel"
          valuePropName="checked"
          className="modal-options-form__item"
        >
          <Rate count={3} defaultValue={line.skillLevel} />
        </Form.Item>
      </div>

      <div className="modal-options-form__items">
        <Form.Item
          label="Dismissible"
          name="isDismissible"
          className="modal-options-form__item"
          valuePropName="checked"
          help="Dismissible lines are lines that do not need to be displayed, usually vocalizing parts and some ad-libs."
        >
          <Switch />
        </Form.Item>
      </div>

      <Form.Item
        label="Lyrics"
        name="text"
        className="modal-options-form__item"
        help={`Collection of lyrics from all parts (${line.partsIds.length}).`}
      >
        <Input disabled placeholder="No lyrics available yet" />
      </Form.Item>

      <Divider />

      <Form.Item
        label=""
        name="text"
        className="modal-options-form__action-button"
        help="Permanently delete this entire line."
      >
        <Button type="primary" disabled onClick={() => {}} danger icon={<DeleteOutlined />}>
          Delete This Line
        </Button>
      </Form.Item>
    </Form>
  );
}

export default OptionsLine;
