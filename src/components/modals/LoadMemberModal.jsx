import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Table } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadMemberModal({ isModalVisible, setModalVisibility, setLoadedData }) {
  const [isMemberLoading] = useLoadingState('isMemberLoading');
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function loadMembers() {
      setData(await store.getCollection('members'));
    }
    loadMembers();
  }, []);

  const onCancelModal = () => {
    setModalVisibility(false);
  };

  const onLoadSong = useCallback(() => {
    async function loadMember() {
      setLoadedData(await store.getRecord('member', selectedId));
      setSelectedId(null);
      setModalVisibility(false);
    }

    loadMember();
  }, [selectedId, setLoadedData, setModalVisibility]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },

    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Tagline',
      dataIndex: 'tagline',
      render: (text) => `"${text}"`,
    },
  ];

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedId(selectedRows[0].id);
    },
  };

  return (
    <Modal
      title="Members"
      visible={isModalVisible}
      onOk={onLoadSong}
      okText="Load Member"
      onCancel={onCancelModal}
      okButtonProps={{ disabled: isMemberLoading || Boolean(!setSelectedId) }}
    >
      <LoadingContainer waitFor="member">
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

export default LoadMemberModal;
