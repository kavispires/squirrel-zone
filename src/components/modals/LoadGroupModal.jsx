import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Table } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadGroupModal({ isModalVisible, setModalVisibility, setLoadedData, onLoad = () => {} }) {
  const [isLoading] = useGlobalState('isLoading');
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function loadGroups() {
      setData(await store.getCollection('groups'));
    }
    loadGroups();
  }, []);

  const onCancelModal = () => {
    setModalVisibility(false);
  };

  const onLoadSong = useCallback(() => {
    async function loadGroup() {
      setLoadedData(await store.getRecord('group', selectedId));
      setSelectedId(null);
      setModalVisibility(false);
    }

    loadGroup();
  }, [selectedId, setLoadedData, setModalVisibility]);

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
      okButtonProps={{ disabled: isLoading || Boolean(!setSelectedId) }}
    >
      <LoadingContainer>
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
