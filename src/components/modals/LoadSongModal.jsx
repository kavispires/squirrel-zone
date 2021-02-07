import React, { useState, useCallback, useEffect, Fragment } from 'react';

// Design Resources
import { Button, Modal, Spin, Table } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
import { loadSongState } from '../../states/functions';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';

function LoadSongModal({ buttonLabel = 'Load Song', onBeforeLoad = () => {}, onAfterLoad = () => {} }) {
  const [isSongLoading] = useLoadingState('isSongLoading');

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <Fragment>
      <Button type="primary" onClick={() => setIsModalVisible(true)} disabled={isSongLoading}>
        {isSongLoading ? <Spin size="small" /> : buttonLabel}
      </Button>

      {isModalVisible && (
        <SongModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          onBeforeLoad={onBeforeLoad}
          onAfterLoad={onAfterLoad}
        />
      )}
    </Fragment>
  );
}

function SongModal({ isModalVisible, setIsModalVisible, onBeforeLoad = () => {}, onAfterLoad = () => {} }) {
  const [isSongLoading] = useLoadingState('isSongLoading');

  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    async function fetchSongs() {
      setData(await store.getCollection('songs'));
    }
    fetchSongs();
  }, []);

  const onCancelModal = () => {
    setIsModalVisible(false);
  };

  const onLoadSong = useCallback(() => {
    async function fetchSongData() {
      onBeforeLoad();

      await loadSongState(selectedId);

      setSelectedId(null);
      onAfterLoad();
      setIsModalVisible(false);
    }

    fetchSongData();
  }, [selectedId, setIsModalVisible, onBeforeLoad, onAfterLoad]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, data) => (data.version ? `${title} (${data.version})` : title),
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
      setSelectedId(selectedRows[0].id);
    },
  };

  return (
    <Modal
      title="Load Song"
      visible={isModalVisible}
      onOk={onLoadSong}
      okText="Load Song"
      onCancel={onCancelModal}
      okButtonProps={{ disabled: isSongLoading || Boolean(!selectedId) }}
    >
      <LoadingContainer waitFor="song">
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
