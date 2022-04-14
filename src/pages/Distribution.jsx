import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Layout, Tabs, Typography } from 'antd';
import {
  CompressOutlined,
  EyeFilled,
  FileAddOutlined,
  HighlightFilled,
  ProfileFilled,
} from '@ant-design/icons';
// State
import useGlobalState from '../states/useGlobalState';
// Utilities
import {
  loadActiveDistribution,
  loadActiveGroupSongs,
  loadActiveMembers,
  loadActiveSong,
  setupNewActiveDistribution,
} from '../states/functions';
import { NEW_INSTANCE_ID } from '../utils/constants';
// Components
import LoadingContainer from '../components/global/LoadingContainer';
import LineDistributionView from '../components/distribution/LineDistributionView';
import LineDistributionLyrics from '../components/distribution/LineDistributionLyrics';
import LineDistributionEdit from '../components/distribution/LineDistributionEdit';
import LineDistributionNew from '../components/distribution/LineDistributionNew';
import LoadingChecklist from '../components/LoadingChecklist';

const ViewOptions = () => {
  const history = useHistory();

  const clickButton = (resolution) => {
    if (resolution) {
      history.push({
        search: `?${new URLSearchParams({ fixedVideo: resolution })}`,
      });
    }
  };

  return (
    <div className="distribution__tab-options">
      <span>
        <CompressOutlined alt="Video Resolution" />
      </span>
      <Button type="text" onClick={() => clickButton('')} size="small">
        Auto
      </Button>
      <Button type="text" onClick={() => clickButton('720')} size="small">
        720p
      </Button>
      <Button type="text" onClick={() => clickButton('1080')} size="small">
        1080p
      </Button>
    </div>
  );
};

function Distribution() {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeDistributionData] = useGlobalState('activeDistributionData');
  const [activeSong] = useGlobalState('activeSong');
  const [activeSongData] = useGlobalState('activeSongData');
  const [activeGroupSongs] = useGlobalState('activeGroupSongs');

  const [, , distributionId, mode] = (history?.location?.pathname ?? '').split('/');

  useEffect(() => {
    // Redirect if there is no active group
    if (!activeGroup) {
      history.push('/groups');
      return;
    }

    // Load members, distribution, and song
    async function loadContent() {
      await loadActiveMembers(activeGroup);

      if (mode === 'new') {
        return await loadActiveGroupSongs(activeGroup.id);
      }

      if (distributionId && distributionId !== NEW_INSTANCE_ID) {
        const { songId } = await loadActiveDistribution(activeGroup.id, distributionId);
        return await loadActiveSong(songId);
      }

      if (distributionId === NEW_INSTANCE_ID && activeSong) {
        return await setupNewActiveDistribution({
          groupId: activeGroup.id,
          songId: activeSong.id,
          songTitle: activeSong.title,
        });
      }
    }

    loadContent();
  }, [mode, history, distributionId, activeGroup, activeSong]);

  const onSwitchMode = useCallback(
    (newMode) => {
      if (mode !== newMode) {
        history.push(`/distribution/${distributionId}/${newMode}`);
      }
    },
    [mode, history, distributionId]
  );

  const onLoadNewSong = useCallback(() => {
    history.push(`/distribution/${NEW_INSTANCE_ID}/edit`);
  }, [history]);

  const playerRef = useRef();

  const viewRequirementsList = [
    { value: activeMembers, text: 'Recruiting members...' },
    { value: activeSong, text: 'Loading song...' },
    { value: activeSongData, text: 'Loading beats and kicks...' },
    { value: activeDistribution, text: 'Gathering distribution...' },
    { value: activeDistributionData?.assignedParts, text: 'Splitting distribution...' },
  ];

  const newRequirementsList = [
    { value: activeMembers, text: 'Recruiting members...' },
    { value: activeGroupSongs, text: 'Checking what they already sang...' },
  ];

  return (
    <LoadingContainer forceLoading={!activeMembers}>
      <Layout.Content className="container">
        <main className="main distribution">
          <Typography.Title>
            Line Distribution
            {Boolean(activeSong?.title) && (
              <span className="distribution__title-song">{activeSong.title}</span>
            )}
          </Typography.Title>

          <Tabs
            activeKey={mode}
            tabPosition="left"
            className="distribution__tabs"
            onChange={onSwitchMode}
            tabBarExtraContent={mode === 'view' && <ViewOptions />}
          >
            <Tabs.TabPane
              tab={TabIcon('view')}
              key="view"
              className="distribution__tab distribution__tab--dark"
              disabled={!activeDistribution?.id}
            >
              {mode === 'view' && (
                <LoadingChecklist list={viewRequirementsList}>
                  <LineDistributionView playerRef={playerRef} />
                </LoadingChecklist>
              )}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={TabIcon('lyrics')}
              key="lyrics"
              className="distribution__tab"
              disabled={!activeDistribution?.id}
            >
              {mode === 'lyrics' && (
                <LoadingChecklist list={viewRequirementsList}>
                  <LineDistributionLyrics />
                </LoadingChecklist>
              )}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={TabIcon('edit')}
              key="edit"
              className="distribution__tab"
              disabled={!activeDistribution}
            >
              {mode === 'edit' && (
                <LoadingChecklist list={viewRequirementsList}>
                  <LineDistributionEdit playerRef={playerRef} />
                </LoadingChecklist>
              )}
            </Tabs.TabPane>
            {mode === 'new' && (
              <Tabs.TabPane tab={TabIcon('new')} key="new" className="distribution__tab">
                <LoadingChecklist list={newRequirementsList}>
                  <LineDistributionNew activeGroupSongs={activeGroupSongs} onLoadNewSong={onLoadNewSong} />
                </LoadingChecklist>
              </Tabs.TabPane>
            )}
          </Tabs>
        </main>
      </Layout.Content>
    </LoadingContainer>
  );
}

function TabIcon(mode) {
  if (mode === 'view') {
    return (
      <span className="distribution__tab-icon">
        <EyeFilled />
        <span>View</span>
      </span>
    );
  }

  if (mode === 'lyrics') {
    return (
      <span className="distribution__tab-icon">
        <ProfileFilled />
        <span>Lyrics</span>
      </span>
    );
  }

  if (mode === 'new') {
    return (
      <span className="distribution__tab-icon">
        <FileAddOutlined />
        <span>New</span>
      </span>
    );
  }

  return (
    <span className="distribution__tab-icon">
      <HighlightFilled />
      <span>Edit</span>
    </span>
  );
}

export default Distribution;
