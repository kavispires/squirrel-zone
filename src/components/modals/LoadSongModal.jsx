import React, { useState, useCallback, useEffect } from 'react';

// Design Resources
import { Modal, Spin, Table } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
import useDistributorState from '../../states/useDistributorState';
// Store
import store from '../../services/store';
import { Line, Part, Section, Song } from '../../utils/distributor';

function LoadSongModal({
  isLoadSongModalVisible,
  setLoadSongModalVisibility,
  onBeforeLoad = () => {},
  onAfterLoad = () => {},
}) {
  const [isLoading] = useGlobalState('isLoading');

  const [, setSong] = useDistributorState('song');
  const [, setStep] = useDistributorState('step');
  const [, setLines] = useDistributorState('lines');
  const [, setParts] = useDistributorState('parts');
  const [, setSections] = useDistributorState('sections');
  const [, setVideoId] = useDistributorState('videoId');
  const [, setIsFullyLoaded] = useDistributorState('isFullyLoaded');

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
    // Note: Modal.onCancel has a weird bug that forces overflow hidden on the body.
    // Note2: Do not use useCallback in this.
    document.body.style.overflow = 'auto';
  };

  const onLoadSong = useCallback(() => {
    async function fetchSongData() {
      onBeforeLoad();
      setIsFullyLoaded(false);

      const song = await store.getRecord('song', selectedSongId);
      const songData = await store.getRecord('song-data', selectedSongId);

      const newSong = new Song({ ...song, sectionsIds: songData.sectionsIds });

      // Created instances looping through included data
      const newSections = {};
      const newLines = {};
      const newParts = {};
      songData.included.forEach((entry) => {
        if (entry.type === 'section') {
          const newInstance = new Section(entry);
          return (newSections[newInstance.id] = newInstance);
        }
        if (entry.type === 'line') {
          const newInstance = new Line(entry);
          return (newLines[newInstance.id] = newInstance);
        }
        if (entry.type === 'part') {
          const newInstance = new Part(entry);
          return (newParts[newInstance.id] = newInstance);
        }
      });

      setParts(newParts);
      setLines(newLines);
      setSections(newSections);
      setSong(newSong);
      setVideoId(newSong.videoId);
      setStep(newSong.isComplete ? 3 : 2);
      setIsFullyLoaded(true);
      setSelectedSongId(null);
      setLoadSongModalVisibility(false);
      onAfterLoad();
    }

    fetchSongData();
  }, [
    selectedSongId,
    setLines,
    setLoadSongModalVisibility,
    setParts,
    setSections,
    setSong,
    setStep,
    setVideoId,
    setIsFullyLoaded,
    onBeforeLoad,
    onAfterLoad,
  ]);

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      render: (text) => `(${text})`,
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
      title: 'Tempo',
      dataIndex: 'tempo',
      render: (text) => `${text}bpm`,
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
