import React, { useState, useCallback, useEffect, Fragment } from 'react';

// Design Resources
import { Button, Modal, Spin, Table } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadGroupModal({
  setLoadedData,
  buttonLabel = 'Load Member',
  onBeforeLoad = () => {},
  onAfterLoad = () => {},
}) {
  const [isMemberLoading] = useLoadingState('isMemberLoading');

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Fragment>
      <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={isMemberLoading}>
        {isMemberLoading ? <Spin size="small" /> : buttonLabel}
      </Button>

      {isModalVisible && (
        <GroupModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onBeforeLoad={onBeforeLoad}
          setLoadedData={setLoadedData}
          onAfterLoad={onAfterLoad}
        />
      )}
    </Fragment>
  );
}

function GroupModal({ isModalVisible, setIsModalVisible, onBeforeLoad, setLoadedData, onAfterLoad }) {
  const [isGroupLoading] = useLoadingState('isGroupLoading');

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function loadGroups() {
      setData(await store.getCollection('groups'));
    }
    loadGroups();
  }, []);

  const onCancelModal = () => {
    setIsModalVisible(false);
  };
  const onLoadSong = useCallback(() => {
    async function loadGroup() {
      onBeforeLoad();

      setLoadedData(await store.getRecord('group', selectedId));

      setSelectedId(null);
      onAfterLoad();
      setIsModalVisible(false);
    }
    loadGroup();
  }, [selectedId, setLoadedData, onBeforeLoad, onAfterLoad, setIsModalVisible]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },

    {
      title: 'Debut Year',
      dataIndex: 'debutYear',
    },
    {
      title: 'Group Size',
      dataIndex: 'membersIds',
      render: (list) => `${list.length}`,
    },
  ];

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedId(selectedRows[0].id);
    },
  };

  return (
    <Modal
      title="Groups"
      visible={isModalVisible}
      onOk={onLoadSong}
      okText="Load Group"
      onCancel={onCancelModal}
      okButtonProps={{ disabled: isGroupLoading || Boolean(!setSelectedId) }}
    >
      <LoadingContainer waitFor="group">
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data ?? []}
        />
      </LoadingContainer>
    </Modal>
  );
}

export default LoadGroupModal;
