import React, { useState, useCallback } from 'react';

// Design Resources
import { Divider, Modal, Progress } from 'antd';
// Components
import OptionsSection from './OptionsSection';
import OptionsLine from './OptionsLine';
import OptionsPart from './OptionsPart';

function ModalOptions({ activeInstance, setActiveInstance }) {
  const [tempData, setTempData] = useState({});

  const onCancelModal = () => {
    setActiveInstance(null);
    // Note: Modal.onCancel has a weird bug that forces overflow hidden on the body.
    // Note2: Do not use useCallback in this.
    document.body.style.overflow = 'auto';
  };

  const onSaveModal = useCallback(() => {
    activeInstance.deserialize(tempData);
    setTempData({});
    setActiveInstance(null);
  }, [activeInstance, tempData, setTempData, setActiveInstance]);

  const onFormChange = useCallback((data) => {
    setTempData((state) => ({ ...state, ...data }));
  }, []);

  if (!activeInstance) return <span></span>;

  const id = activeInstance?.id;
  const type = activeInstance?.type;

  const title =
    {
      part: `Part "${activeInstance.text}" Options`,
      line: `Line "${activeInstance.text}" Options`,
      section: `Section ${activeInstance?.name ?? id} Options`,
      song: `Song ${id} Options`,
    }[type] ?? 'Unknown';

  return (
    <Modal
      title={title}
      visible={Boolean(activeInstance)}
      onOk={onSaveModal}
      okText="Save"
      onCancel={onCancelModal}
    >
      {type === 'section' && <OptionsSection section={activeInstance} onValuesChange={onFormChange} />}
      {type === 'line' && <OptionsLine line={activeInstance} onValuesChange={onFormChange} />}
      {type === 'part' && <OptionsPart part={activeInstance} onValuesChange={onFormChange} />}
      <Divider />
      <Progress percent={activeInstance.completion} />
    </Modal>
  );
}

export default ModalOptions;
