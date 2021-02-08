import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Divider, Layout, Progress, Spin, Switch, Select } from 'antd';
// State
import useGlobalState from '../states/useGlobalState';
import useLoadingState from '../states/useLoadingState';
import useDistributorState from '../states/useDistributorState';
import { loadSongState } from '../states/functions';
// Store
import store from '../services/store';
// API
import API from '../api';
// Utilities
import { serializeKey } from '../utils/distributor';
import { bemClassConditionalModifier } from '../utils';
import { DEFAULT_MEMBERS, DISTRIBUTION_NAME } from '../utils/constants';
// Components
import LoadSongModal from './modals/LoadSongModal';
import YoutubeVideo from './distributor/YoutubeVideo';
import Log from './log/Log';
import Member from './Member';

function Distribute() {
  const history = useHistory();
  const [isLoading] = useLoadingState('isLoading');
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers, setActiveMembers] = useGlobalState('activeMembers');
  const [song] = useDistributorState('song');
  const [isFullyLoaded] = useDistributorState('isFullyLoaded');
  const [loadedLineDistribution, setLoadedDistribution] = useGlobalState('loadedLineDistribution');
  const [lineDistribution, setLineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');
  const [stats, setStats] = useGlobalState('stats');

  const [distributionName, setDistributionName] = useState(loadedLineDistribution?.name || 'ORIGINAL');

  // Run on mount
  useEffect(() => {
    // Redirect if there is no active group
    if (!activeGroup) {
      history.push('/groups');
    }

    // Load members
    async function loadMembers() {
      const members = await store.getCollection('members', true);
      setActiveMembers({ ...members, ...DEFAULT_MEMBERS });
    }
    loadMembers();
  }, []);

  // Load line distribution if one exists
  useEffect(() => {
    async function loadContent() {
      await loadSongState(loadedLineDistribution.songId);
    }

    if (loadedLineDistribution?.id) {
      loadContent();
    }
  }, [loadedLineDistribution?.id, loadedLineDistribution?.songId]);

  if (!activeGroup) {
    return <Spin size="large" />;
  }

  const resetDistribution = () => {
    setLineDistribution({});
    setStats({});
    setDistributionName('');
  };

  const updateName = (distributionName) => {
    setDistributionName(distributionName);
  };

  const saveDistribution = async (values) => {
    try {
      const response = await API.saveDistribution({
        id: loadedLineDistribution?.id ?? null,
        type: 'distribution',
        name: distributionName || loadedLineDistribution.name || 'original',
        songId: song.id,
        songTitle: song.title,
        groupId: activeGroup.id,
        assignedParts: lineDistribution,
        stats,
      });

      setLoadedDistribution(response);
      history.push('/groups');
    } catch (_) {}
  };

  const distributionCompletion = Math.floor(
    (100 * Object.keys(lineDistribution ?? {}).length) / Object.keys(parts ?? {}).length
  );

  return (
    <Layout.Content className="container">
      <main className="main distribute">
        <h1>Distribute{song ? `: ${song.title}` : ''}</h1>
        <div className="distribute__actions">
          <LoadSongModal onBeforeLoad={resetDistribution} />
        </div>

        {isFullyLoaded && (
          <Fragment>
            <DistributeWidget
              members={activeMembers}
              distributionCompletion={distributionCompletion}
              resetDistribution={resetDistribution}
            />

            <div className="distribute__actions">
              <Select
                defaultValue={DISTRIBUTION_NAME.ORIGINAL}
                onChange={updateName}
                disabled={isLoading}
                className="distribute__actions-input"
              >
                {Object.entries(DISTRIBUTION_NAME).map(([distValue, distText]) => (
                  <Select.Option key={distValue} value={distValue}>
                    {distText}
                  </Select.Option>
                ))}
              </Select>
              <Button
                type="primary"
                onClick={saveDistribution}
                disabled={isLoading || distributionCompletion < 100}
              >
                {loadedLineDistribution?.id ? 'Update' : 'Save'} Distribution
              </Button>
            </div>
          </Fragment>
        )}
      </main>
    </Layout.Content>
  );
}

function DistributeWidget({ members, distributionCompletion, resetDistribution }) {
  const [isLoading] = useLoadingState('isLoading');
  const [activeGroup] = useGlobalState('activeGroup');
  const [lineDistribution, setLineDistribution] = useGlobalState('lineDistribution');
  const [parts] = useDistributorState('parts');
  const [stats, setStats] = useGlobalState('stats');

  const [selectedMember, setSelectedMember] = useState('member::ALL');
  const [isAbsoluteProgress, setAbsoluteProgress] = useState(false);
  const [progressType, setProgressType] = useState('');

  const playerRef = useRef();

  useEffect(() => {
    let total = 0;
    let totalAll = 0;
    let totalAllNone = 0;
    let max = 0;
    let maxAll = 0;
    let maxAllNone = 0;
    const newStats = {};
    // Calculate progress, max, counts
    Object.entries(lineDistribution).forEach(([partId, memberKeysObj]) => {
      const part = parts[partId];
      if (!part) {
        console.warn('Part was previously deleted from song');
        return;
      }
      const partDuration = part.duration ?? 0;
      const membersKeys = Object.keys(memberKeysObj);

      if (membersKeys.length === 1 && memberKeysObj['member::NONE']) {
        totalAllNone += partDuration;
      } else if (membersKeys.length === 1 && memberKeysObj['member::ALL']) {
        totalAllNone += partDuration;
        totalAll += partDuration;
      } else {
        totalAllNone += partDuration;
        totalAll += partDuration;
        total += partDuration;
      }

      // Calculate progress and count
      membersKeys.forEach((memberKey) => {
        if (newStats[memberKey] === undefined) {
          newStats[memberKey] = {
            count: 0,
            total: 0,
            totalAll: 0,
            totalAllNone: 0,
            relativeProgress: 0,
            relativeProgressAll: 0,
            relativeProgressAllNone: 0,
            absoluteProgress: 0,
            absoluteProgressAll: 0,
            absoluteProgressAllNone: 0,
            lines: [],
          };
        }
        // Add member count (only new lines)
        if (!newStats[memberKey].lines.includes(part.lineId)) {
          newStats[memberKey].count += 1;
          newStats[memberKey].lines.push(part.lineId);
        }
        // Add member total
        newStats[memberKey].total += partDuration;
        newStats[memberKey].totalAll += partDuration;
        newStats[memberKey].totalAllNone += partDuration;
        // Recalculate max
        if (memberKey === 'member::NONE') {
          maxAllNone =
            newStats[memberKey].totalAllNone > maxAllNone ? newStats[memberKey].totalAllNone : maxAllNone;
        } else if (memberKey === 'member::ALL') {
          maxAllNone =
            newStats[memberKey].totalAllNone > maxAllNone ? newStats[memberKey].totalAllNone : maxAllNone;
          maxAll = newStats[memberKey].totalAll > maxAll ? newStats[memberKey].totalAll : maxAll;
        } else {
          maxAllNone =
            newStats[memberKey].totalAllNone > maxAllNone ? newStats[memberKey].totalAllNone : maxAllNone;
          maxAll = newStats[memberKey].totalAll > maxAll ? newStats[memberKey].totalAll : maxAll;
          max = newStats[memberKey].total > max ? newStats[memberKey].total : max;
        }
      });
    });
    // Calculate member progress
    Object.keys(newStats).forEach((key) => {
      newStats[key].relativeProgress = Math.round((100 * newStats[key].total) / max);
      newStats[key].relativeProgressAll = Math.round((100 * newStats[key].totalAll) / maxAll);
      newStats[key].relativeProgressAllNone = Math.round((100 * newStats[key].totalAllNone) / maxAllNone);
      newStats[key].absoluteProgress = Math.round((100 * newStats[key].total) / total);
      newStats[key].absoluteProgressAll = Math.round((100 * newStats[key].totalAll) / totalAll);
      newStats[key].absoluteProgressAllNone = Math.round((100 * newStats[key].totalAllNone) / totalAllNone);
    });

    setStats(newStats);
  }, [lineDistribution, parts, setStats]);

  const seekAndPlay = (timestamp) => {
    playerRef?.current?.internalPlayer?.seekTo(timestamp);
    playerRef?.current?.internalPlayer?.playVideo();
  };

  const toggleMember = (memberKey) => {
    setSelectedMember((state) => (state === memberKey ? 'member::ALL' : memberKey));
  };

  const assignMembers = (partId) => {
    setLineDistribution((state) => {
      const part = { ...state[partId] };
      if (part[selectedMember]) {
        delete part[selectedMember];
      } else {
        part[selectedMember] = true;
      }

      if (!Object.keys(part).length) {
        const result = { ...state };
        delete result[partId];
        return result;
      }
      return { ...state, [partId]: part };
    });
  };

  const onProgressTypeChange = (key) => {
    setProgressType(key);
  };

  return (
    <div className="distribute__container">
      <div className="distribute-options">
        <YoutubeVideo playerRef={playerRef} width="320" height="180" className="distribute-options__video" />
        <div className="distribute__controls">
          <div>
            Progress Bar Type{' '}
            <Select defaultValue="" onChange={onProgressTypeChange}>
              <Select.Option value="">Members only</Select.Option>
              <Select.Option value="All">Include ALL lines</Select.Option>
              <Select.Option value="AllNone">Include All and None lines</Select.Option>
            </Select>
          </div>
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
            const memberStats = stats?.[member.key] ?? {};
            const progress = isAbsoluteProgress
              ? memberStats?.[`absoluteProgress${progressType}`]
              : memberStats?.[`relativeProgress${progressType}`];
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
          <Divider />
          {activeGroup.membersIds &&
            members &&
            activeGroup.membersIds.map((memberId) => {
              const member = members[serializeKey('member', memberId)] ?? {};
              const memberStats = stats?.[member.key] ?? {};
              const progress = isAbsoluteProgress
                ? memberStats?.[`absoluteProgress${progressType}`]
                : memberStats?.[`relativeProgress${progressType}`];
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
        <div className="distribute__controls">
          <Button type="default" onClick={resetDistribution} disabled={isLoading}>
            Reset Distribution
          </Button>
        </div>
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
        showProgressNumber
      />
    </Button>
  );
}

export default Distribute;
