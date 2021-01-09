import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Divider, Layout, Progress, Spin, Switch } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
import useDistributorState from '../states/useDistributorState';
// Store
import store from '../services/store';
// Utilities
import { serializeKey } from '../utils/distributor';
// Components
import LoadSongModal from './modals/LoadSongModal';
import YoutubeVideo from './distributor/YoutubeVideo';
import Log from './log/Log';
import Member from './Member';
import { bemClassConditionalModifier } from '../utils';
import { DEFAULT_MEMBERS } from '../utils/constants';

function Distribute() {
  const history = useHistory();
  const [isLoading] = useGlobalState('isLoading');
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers, setActiveMembers] = useGlobalState('activeMembers');
  const [song] = useDistributorState('song');
  const [isFullyLoaded] = useDistributorState('isFullyLoaded');
  const [lineDistribution, setLineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');

  const [isLoadSongModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    if (!activeGroup) {
      history.push('/groups');
    }
  }, []);

  useEffect(() => {
    async function loadContent() {
      const members = await store.getCollection('members', true);
      setActiveMembers({ ...members, ...DEFAULT_MEMBERS });
    }
    loadContent();
  }, []);

  if (!activeGroup) {
    return <Spin size="large" />;
  }

  const resetDistribution = () => {
    setLineDistribution({});
  };

  const distributionCompletion = Math.round(
    (100 * Object.keys(lineDistribution ?? {}).length) / Object.keys(parts ?? {}).length
  );

  return (
    <Layout.Content className="container">
      <main className="main distribute">
        <h1>Distribute{song ? `: ${song.title}` : ''}</h1>
        <div className="distribute__actions">
          <Button type="primary" onClick={() => setModalVisibility(true)} disabled={isLoading}>
            {isLoading ? <Spin size="small" /> : 'Load Song'}
          </Button>
        </div>
        {isLoading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          isFullyLoaded && (
            <DistributeWidget members={activeMembers} distributionCompletion={distributionCompletion} />
          )
        )}

        {isFullyLoaded && (
          <div className="distribute__actions">
            <Button type="primary" onClick={() => {}} disabled={isLoading || distributionCompletion < 100}>
              Save Distribution
            </Button>
          </div>
        )}
      </main>

      {isLoadSongModalVisible && (
        <LoadSongModal
          isLoadSongModalVisible={isLoadSongModalVisible}
          setLoadSongModalVisibility={setModalVisibility}
          onBeforeLoad={resetDistribution}
        />
      )}
    </Layout.Content>
  );
}

function DistributeWidget({ members, distributionCompletion }) {
  const [activeGroup] = useGlobalState('activeGroup');
  const [lineDistribution, setLineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');

  const [selectedMember, setSelectedMember] = useState({});
  const [stats, setStats] = useState({});
  const [isAbsoluteProgress, setAbsoluteProgress] = useState(false);

  const playerRef = useRef();

  useEffect(() => {
    let total = 0;
    let max = 0;
    const newStats = {};
    // Calculate progress, max, counts
    Object.entries(lineDistribution).forEach(([partId, memberKeysObj]) => {
      const part = parts[partId];
      total += part.duration ?? 0;
      // Calculate progress and count
      Object.keys(memberKeysObj).forEach((memberKey) => {
        if (newStats[memberKey] === undefined) {
          newStats[memberKey] = {
            count: 0,
            total: 0,
            relativeProgress: 0,
            absoluteProgress: 0,
            lines: [],
          };
        }
        // Add member count (only new lines)
        if (!newStats[memberKey].lines.includes(part.lineId)) {
          newStats[memberKey].count += 1;
          newStats[memberKey].lines.push(part.lineId);
        }
        // Add member total
        newStats[memberKey].total += part.duration ?? 0;
        // Recalculate max
        max = newStats[memberKey].total > max ? newStats[memberKey].total : max;
      });
    });
    // Calculate member progress
    Object.entries(newStats).forEach(([key, value]) => {
      newStats[key].relativeProgress = Math.round((100 * newStats[key].total) / max);
      newStats[key].absoluteProgress = Math.round((100 * newStats[key].total) / total);
    });

    setStats(newStats);
  }, [lineDistribution, parts]);

  const seekAndPlay = (timestamp) => {
    playerRef?.current?.internalPlayer?.seekTo(timestamp);
    playerRef?.current?.internalPlayer?.playVideo();
  };

  const toggleMember = (memberKey) => {
    setSelectedMember((state) => (state === memberKey ? null : memberKey));
  };

  const assignMembers = (partId) => {
    setLineDistribution((state) => {
      const part = { ...state[partId] };
      if (part[selectedMember]) {
        delete part[selectedMember];
      } else {
        part[selectedMember] = true;
      }
      return { ...state, [partId]: part };
    });
  };

  return (
    <div className="distribute__container">
      <div className="distribute-options">
        <YoutubeVideo playerRef={playerRef} width="320" height="180" className="distribute-options__video" />
        <div className="distribute__mini-controls">
          <div>
            Absolute Progress{' '}
            <Switch
              defaultChecked={isAbsoluteProgress}
              onChange={(checked) => setAbsoluteProgress(checked)}
              size="small"
            />
          </div>
        </div>
        <ul className="members-selection">
          {Object.values(DEFAULT_MEMBERS).map((member) => {
            const progress = isAbsoluteProgress
              ? stats?.[member.key]?.absoluteProgress
              : stats?.[member.key]?.relativeProgress;
            return (
              <MemberSelection
                key={`member-selection-${member.key}`}
                member={member}
                selectedMember={selectedMember}
                toggleMember={toggleMember}
                progress={progress}
              />
            );
          })}

          {activeGroup.membersIds &&
            members &&
            activeGroup.membersIds.map((memberId) => {
              const member = members[serializeKey('member', memberId)] ?? {};
              const progress = isAbsoluteProgress
                ? stats?.[member.key]?.absoluteProgress
                : stats?.[member.key]?.relativeProgress;
              return (
                <MemberSelection
                  key={`member-selection-${member.key}`}
                  member={member}
                  selectedMember={selectedMember}
                  toggleMember={toggleMember}
                  progress={progress}
                  count={stats?.[member.key]?.count}
                />
              );
            })}
        </ul>
        <Divider />
        <Progress percent={distributionCompletion} className="distribute__line-distribution-completion" />
      </div>
      <Log
        seekAndPlay={seekAndPlay}
        className="distribute-log"
        defaultCompactSetting
        locked
        assignMembers={assignMembers}
      />
    </div>
  );
}

function MemberSelection({ member, selectedMember, toggleMember, progress = 0, count = 0 }) {
  return (
    <Button
      key={`button-${member.id}`}
      type="text"
      className={bemClassConditionalModifier(
        'distribute-member-button',
        'selected',
        selectedMember === member.key
      )}
      onClick={() => toggleMember(member.key)}
    >
      <Member
        member={member}
        showName
        showPosition
        isSelected
        progress={progress}
        count={count}
        className="member-component"
      />
    </Button>
  );
}

export default Distribute;
