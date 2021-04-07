import React, { useState, useCallback, useEffect, Fragment } from 'react';

// Design Resources
import { Button, Modal, Spin, Table } from 'antd';
// State
import useLoadingState from '../../states/useLoadingState';
import useGlobalState from '../../states/useGlobalState';
import { loadSongState } from '../../states/functions';
// Store
import store from '../../services/store';
// Components
import LoadingContainer from '../global/LoadingContainer';
import { CheckOutlined } from '@ant-design/icons';

function LoadSongModal({
  buttonLabel = 'Load Song',
  onBeforeLoad = () => {},
  onLoad = loadSongState,
  onAfterLoad = () => {},
}) {
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
          onLoad={onLoad}
          onAfterLoad={onAfterLoad}
        />
      )}
    </Fragment>
  );
}

function SongModal({
  isModalVisible,
  setIsModalVisible,
  onLoad = loadSongState,
  onBeforeLoad = () => {},
  onAfterLoad = () => {},
}) {
  const [isSongLoading] = useLoadingState('isSongLoading');
  const [activeGroupSongs] = useGlobalState('activeGroupSongs');

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

      const response = await onLoad(selectedId);

      setSelectedId(null);
      onAfterLoad(response);
      setIsModalVisible(false);
    }

    fetchSongData();
  }, [selectedId, setIsModalVisible, onBeforeLoad, onAfterLoad, onLoad]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: (title, data) => (data.version ? `${title} (${data.version})` : title),
    },
    {
      title: 'Genre/Style',
      dataIndex: 'genre',
      render: (genre, data) => `${genre}/${data.style}`,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Done',
      dataIndex: 'id',
      render: (id) => (activeGroupSongs[id] ? <CheckOutlined /> : ''),
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
      width={750}
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
