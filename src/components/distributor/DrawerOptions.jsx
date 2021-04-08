import React, { useState, useCallback } from 'react';

// Design Resources
import { Button, Divider, Drawer, Progress } from 'antd';
// Components
import OptionsSection from './OptionsSection';
import OptionsLine from './OptionsLine';
import OptionsPart from './OptionsPart';
import ButtonContainer from '../ButtonContainer';

function DrawerOptions({ activeInstance, setActiveInstance }) {
  const [tempData, setTempData] = useState({});

  const onCancelDrawer = () => {
    setActiveInstance(null);
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
    <Drawer
      title={title}
      placement="right"
      closable={true}
      onClose={onCancelDrawer}
      visible={Boolean(activeInstance)}
      getContainer={false}
      style={{ position: 'absolute' }}
      maskClosable={false}
      width={500}
    >
      {type === 'section' && <OptionsSection section={activeInstance} onValuesChange={onFormChange} />}
      {type === 'line' && <OptionsLine line={activeInstance} onValuesChange={onFormChange} />}
      {type === 'part' && (
        <OptionsPart part={activeInstance} onValuesChange={onFormChange} onCancelModal={onCancelDrawer} />
      )}
      <Divider />
      <Progress percent={activeInstance.completion} />
      <Divider />
      <ButtonContainer alignment="right">
        <Button type="default" onClick={onCancelDrawer}>
          Cancel/Close
        </Button>
        <Button type="primary" onClick={onSaveModal}>
          Save
        </Button>
      </ButtonContainer>
    </Drawer>
  );
}

export default DrawerOptions;
