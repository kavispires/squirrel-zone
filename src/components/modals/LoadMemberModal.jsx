import React, { useState, useCallback, useEffect, Fragment } from 'react';

// Design Resources
import { Button, Modal, Spin, Table } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadMemberModal({
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
        <MemberModal
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

function MemberModal({ isModalVisible, setIsModalVisible, onBeforeLoad, setLoadedData, onAfterLoad }) {
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
    setIsModalVisible(false);
  };

  const onLoadMember = useCallback(() => {
    async function fetchData() {
      onBeforeLoad();

      setLoadedData(await store.getRecord('member', selectedId));

      setSelectedId(null);
      onAfterLoad();
      setIsModalVisible(false);
    }

    fetchData();
  }, [selectedId, setLoadedData, onBeforeLoad, onAfterLoad, setIsModalVisible]);

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
      onOk={onLoadMember}
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
