import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Spin, Table } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
// Store
import store from '../../services/store';

function LoadMemberModal({ isModalVisible, setModalVisibility, setLoadedData }) {
  const [isLoading] = useGlobalState('isLoading');
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
    // Note: Modal.onCancel has a weird bug that forces overflow hidden on the body.
    // Note2: Do not use useCallback in this.
    document.body.style.overflow = 'auto';
  };

  const onLoadSong = useCallback(() => {
    async function loadMember() {
      setLoadedData(await store.getRecord('member', selectedId));

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
      okButtonProps={{ disabled: isLoading || Boolean(!setSelectedId) }}
    >
      {isLoading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data ?? []}
        />
      )}
    </Modal>
  );
}

export default LoadMemberModal;
