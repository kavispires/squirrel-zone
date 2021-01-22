import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Table } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
import { loadSongState } from '../../states/functions';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadSongModal({
  isLoadSongModalVisible,
  setLoadSongModalVisibility,
  onBeforeLoad = () => {},
  onAfterLoad = () => {},
}) {
  const [isLoading] = useGlobalState('isLoading');

  const [data, setData] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    async function fetchSongs() {
      setData(await store.getCollection('songs'));
    }
    fetchSongs();
  }, []);

  const onCancelModal = () => {
    setLoadSongModalVisibility(false);
  };

  const onLoadSong = useCallback(() => {
    async function fetchSongData() {
      onBeforeLoad();

      await loadSongState(selectedSongId);

      setSelectedSongId(null);
      setLoadSongModalVisibility(false);
      onAfterLoad();
    }

    fetchSongData();
  }, [selectedSongId, setLoadSongModalVisibility, onBeforeLoad, onAfterLoad]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      render: (text) => (text ? `(${text})` : ''),
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
    },
    {
      title: 'Style',
      dataIndex: 'style',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
  ];

  const rowSelection = {
    onChange: (_, selectedRows) => {
      setSelectedSongId(selectedRows[0].id);
    },
  };

  return (
    <Modal
      title="Load Song"
      visible={isLoadSongModalVisible}
      onOk={onLoadSong}
      okText="Load Song"
      onCancel={onCancelModal}
      okButtonProps={{ disabled: isLoading || Boolean(!selectedSongId) }}
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

export default LoadSongModal;
