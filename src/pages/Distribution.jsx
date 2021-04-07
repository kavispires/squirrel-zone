import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Tabs, Typography } from 'antd';
import { EyeFilled, FileAddOutlined, HighlightFilled, ProfileFilled } from '@ant-design/icons';
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

function Distribution() {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeSong] = useGlobalState('activeSong');
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

          <Tabs activeKey={mode} tabPosition="left" className="distribution__tabs" onChange={onSwitchMode}>
            <Tabs.TabPane
              tab={TabIcon('view')}
              key="view"
              className="distribution__tab"
              disabled={!activeDistribution?.id}
            >
              <LoadingContainer forceLoading={!activeMembers || !activeDistribution || !activeSong}>
                {mode === 'view' && <LineDistributionView playerRef={playerRef} />}
              </LoadingContainer>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={TabIcon('lyrics')}
              key="lyrics"
              className="distribution__tab"
              disabled={!activeDistribution?.id}
            >
              <LoadingContainer forceLoading={!activeMembers || !activeDistribution || !activeSong}>
                {mode === 'lyrics' && <LineDistributionLyrics />}
              </LoadingContainer>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={TabIcon('edit')}
              key="edit"
              className="distribution__tab"
              disabled={!activeDistribution}
            >
              <LoadingContainer forceLoading={!activeMembers || !activeDistribution || !activeSong}>
                {mode === 'edit' && <LineDistributionEdit playerRef={playerRef} />}
              </LoadingContainer>
            </Tabs.TabPane>
            {mode === 'new' && (
              <Tabs.TabPane tab={TabIcon('new')} key="new" className="distribution__tab">
                {mode === 'new' && (
                  <LoadingContainer forceLoading={!activeMembers || !activeGroupSongs}>
                    <LineDistributionNew activeGroupSongs={activeGroupSongs} onLoadNewSong={onLoadNewSong} />
                  </LoadingContainer>
                )}
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
