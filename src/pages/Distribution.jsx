import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Layout, Tabs, Typography } from 'antd';
import { EyeFilled, HighlightFilled, ProfileFilled } from '@ant-design/icons';
// State
import useGlobalState from '../states/useGlobalState';
// Utilities
import { loadActiveDistribution, loadActiveMembers, loadActiveSong } from '../states/functions';
import { NEW_INSTANCE_ID } from '../utils/constants';
// Components
import LoadingContainer from '../components/global/LoadingContainer';

import LineDistributionView from '../components/distribution/LineDistributionView';

function Distribution() {
  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeSong] = useGlobalState('activeSong');

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

      if (distributionId && distributionId !== NEW_INSTANCE_ID) {
        const { songId } = await loadActiveDistribution(activeGroup.id, distributionId);
        await loadActiveSong(songId);
      }
    }
    loadContent();
  }, [history, distributionId, activeGroup]);

  const onSwitchMode = useCallback(
    (newMode) => {
      if (mode !== newMode) {
        history.push(`/distribution/${distributionId}/${newMode}`);
      }
    },
    [mode, history, distributionId]
  );

  const playerRef = useRef();

  return (
    <LoadingContainer forceLoading={!activeMembers || !activeDistribution || !activeSong}>
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
              {mode === 'view' && <LineDistributionView playerRef={playerRef} />}
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={TabIcon('lyrics')}
              key="lyrics"
              className="distribution__tab"
              disabled={!activeDistribution?.id}
            >
              {mode === 'lyrics' && (
                <div>
                  <p>Here comes the lyrics things</p>
                  {console.log('lyrics Panel is rendered')}
                </div>
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab={TabIcon('edit')} key="edit" className="distribution__tab">
              {mode === 'edit' && (
                <div>
                  <p>Here comes the edit things</p>
                  {console.log('edit Panel is rendered')}
                </div>
              )}
            </Tabs.TabPane>
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

  return (
    <span className="distribution__tab-icon">
      <HighlightFilled />
      <span>Edit</span>
    </span>
  );
}

export default Distribution;
