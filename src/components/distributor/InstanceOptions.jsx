import React from 'react';

// Design Resources
import { Button, InputNumber, Form, Input, Checkbox, Switch, Select } from 'antd';
import { InfoCircleFilled, DeleteOutlined, CloseOutlined, SaveOutlined } from '@ant-design/icons';

// Global State
import useDistributorState from '../../states/useDistributorState';
import { ASSIGNEE, SECTION, SKILL } from '../../utils/distributor';

function Actions({ activeInstance, setActiveInstance }) {
  const onDelete = () => {
    console.log('DELETE', activeInstance.id);
  };

  const onCancel = () => {
    setActiveInstance(null);
  };

  return (
    <div className="form-actions">
      <Form.Item className="form-action">
        <Button onClick={onDelete} danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Form.Item>

      <Form.Item className="form-action">
        <Button htmlType="cancel" onClick={onCancel} icon={<CloseOutlined />}>
          Close
        </Button>
      </Form.Item>

      <Form.Item className="form-action">
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Submit
        </Button>
      </Form.Item>
    </div>
  );
}

function PartOptions({ activeInstance, setActiveInstance, onFinish }) {
  const initialValues = {
    text: activeInstance.text,
    startTime: activeInstance.startTime,
    endTime: activeInstance.endTime,
    assignee: activeInstance.assignee,
  };

  return (
    <Form
      layout="vertical"
      name="part-options"
      initialValues={initialValues}
      onFinish={onFinish}
      className="distributor-grid__options instance-options"
      autoComplete="off"
    >
      <div className="instance-options__title">Part Options [{activeInstance.id}]</div>
      <Form.Item label="Lyrics" name="text" className="form-item">
        <Input />
      </Form.Item>

      <div className="form-items form-items--2">
        <Form.Item label="Start time" name="startTime" className="form-item">
          <InputNumber />
        </Form.Item>

        <Form.Item label="End time" name="endTime" className="form-item">
          <InputNumber />
        </Form.Item>
      </div>

      <Form.Item label="Assignee" name="assignee" className="form-item">
        <Select>
          {Object.values(ASSIGNEE).map((entry) => (
            <Select.Option key={entry} value={entry}>
              {entry}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Actions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
    </Form>
  );
}

function LineOptions({ activeInstance, setActiveInstance, onFinish }) {
  const initialValues = {
    text: activeInstance.text,
    skill: activeInstance.skill,
    skillType: activeInstance.skillType,
    level: activeInstance.level,
    isDismissible: activeInstance.isDismissible,
  };

  return (
    <Form
      layout="vertical"
      name="line-options"
      initialValues={initialValues}
      onFinish={onFinish}
      className="distributor-grid__options instance-options"
      autoComplete="off"
    >
      <div className="instance-options__title">Line Options [{activeInstance.id}]</div>
      <Form.Item label="Lyrics" name="text" className="form-item">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Dismissible" name="isDismissible" className="form-item" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item label="Skill" name="skill" valuePropName="checked" className="form-item">
        <Select>
          {Object.values(SKILL).map((entry) => (
            <Select.Option key={entry} value={entry}>
              {entry}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Add Skill Type */}
      {/* Add Skill Level */}

      <Actions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
    </Form>
  );
}

function SectionOptions({ activeInstance, setActiveInstance, onFinish }) {
  const initialValues = {
    text: activeInstance.text,
    number: activeInstance.number,
    kind: activeInstance.kind,
  };

  return (
    <Form
      layout="vertical"
      name="section-options"
      initialValues={initialValues}
      onFinish={onFinish}
      className="distributor-grid__options instance-options"
      autoComplete="off"
    >
      <div className="instance-options__title">Section Options [{activeInstance.id}]</div>
      <Form.Item label="Lyrics" name="text" className="form-item">
        <Input.TextArea disabled />
      </Form.Item>

      <div className="form-items form-items--2">
        <Form.Item label="Type" name="kind" valuePropName="checked" className="form-item">
          <Select>
            {Object.values(SECTION).map((entry) => (
              <Select.Option key={entry} value={entry}>
                {entry}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Number" name="number" className="form-item">
          <InputNumber min={1} />
        </Form.Item>
      </div>

      <Actions activeInstance={activeInstance} setActiveInstance={setActiveInstance} />
    </Form>
  );
}

function SongOptions({ activeInstance, setActiveInstance, onFinish }) {
  return (
    <div className="distributor-grid__options instance-options">
      this.isDismissible = false; // yeahs and yous that don't need to be displayed this.section = ''; //
      Enum(SongSection) this.skill = ''; // Enum(Skill) this.subSkill = '' // Enum(SubSkill), depends on skill
      this.level = 1; // [1,2,3]
    </div>
  );
}

function InstanceOptions() {
  const [activeInstance, setActiveInstance] = useDistributorState('activeInstance');
  const [song] = useDistributorState('song');

  const onFinish = (data) => {
    activeInstance.deserialize(data);
  };

  const activateSong = () => {
    console.log({ song });
    setActiveInstance(song);
  };

  console.log({ activeInstance });

  if (activeInstance?.type === 'part') {
    return (
      <PartOptions
        activeInstance={activeInstance}
        setActiveInstance={setActiveInstance}
        onFinish={onFinish}
      />
    );
  }

  if (activeInstance?.type === 'line') {
    return (
      <LineOptions
        activeInstance={activeInstance}
        setActiveInstance={setActiveInstance}
        onFinish={onFinish}
      />
    );
  }

  if (activeInstance?.type === 'section') {
    return (
      <SectionOptions
        activeInstance={activeInstance}
        setActiveInstance={setActiveInstance}
        onFinish={onFinish}
      />
    );
  }

  if (activeInstance?.type === 'song') {
    return (
      <SongOptions
        activeInstance={activeInstance}
        setActiveInstance={setActiveInstance}
        onFinish={onFinish}
      />
    );
  }

  return (
    <div className="distributor-grid__options instance-options instance-options--no-instance">
      <InfoCircleFilled />
      <span className="hint">Click on a Part, Line, or Section to see its info.</span>
      <Button ghost onClick={activateSong}>
        Open Song Options
      </Button>
    </div>
  );
}

export default InstanceOptions;
