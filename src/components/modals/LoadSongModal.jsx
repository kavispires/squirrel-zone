import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Spin, Table } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
import useDistributorState from '../../states/useDistributorState';
// Store
import store from '../../services/store';
import { Line, Part, Section, Song } from '../../utils/distributor';
import { loadSongState } from '../../states/functions';

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

export default LoadSongModal;
