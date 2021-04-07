import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Design Resources
import { Button, Divider, Layout, Progress, Spin, Switch, Select } from 'antd';
// State
import useGlobalState from '../../states/useGlobalState';
import useLoadingState from '../../states/useLoadingState';
import useDistributorState from '../../states/useDistributorState';
// Store
import store from '../../services/store';
// API
import API from '../../adapters';
// Utilities
import { bemClassConditionalModifier, serializeKey } from '../../utils';
import { DEFAULT_MEMBERS, DISTRIBUTION_NAME } from '../../utils/constants';
// Components
import YoutubeVideo from '../YoutubeVideo';
import Log from '../log/Log';
import Member from '../Member';
import {
  loadSongStateOffline,
  resetStateForDistribution,
  setupNewActiveDistribution,
} from '../../states/functions';

function LineDistributionEdit({ playerRef }) {
  const [isLoading] = useLoadingState('isLoading');

  const history = useHistory();
  const [activeGroup] = useGlobalState('activeGroup');
  const [activeMembers] = useGlobalState('activeMembers');
  const [activeDistribution] = useGlobalState('activeDistribution');
  const [activeDistributionData] = useGlobalState('activeDistributionData');
  const [activeSong] = useGlobalState('activeSong');
  const [activeSongData] = useGlobalState('activeSongData');

  const [parts] = useDistributorState('parts');

  const [localMembers] = useState({ ...activeMembers, ...DEFAULT_MEMBERS });
  const [stats, setStats] = useState({});
  const [assignedParts, setAssignedParts] = useState(activeDistributionData.assignedParts ?? {});
  const [distributionName, setDistributionName] = useState(
    activeDistribution?.name || DISTRIBUTION_NAME.ORIGINAL
  );

  useEffect(() => {
    async function loadContent() {
      const response = await loadSongStateOffline(activeSong, activeSongData);
    }

    loadContent();
  }, []);

  const resetDistribution = () => {
    setupNewActiveDistribution({});
    setStats({});
    setDistributionName('');
    setAssignedParts({});
  };

  const updateName = (distributionName) => {
    setDistributionName(distributionName);
  };

  const saveDistribution = async () => {
    try {
      const response = await API.saveDistribution({
        id: activeDistribution?.id ?? null,
        type: 'distribution',
        name: distributionName || activeDistribution.name || DISTRIBUTION_NAME.ORIGINAL,
        songId: activeSong.id,
        songTitle: activeSong.title,
        groupId: activeGroup.id,
        assignedParts: assignedParts,
        stats,
      });

      resetStateForDistribution();
      history.push(`/distribution/${response.id}/view`);
    } catch (_) {}
  };

  const distributionCompletion = Math.floor(
    (100 * Object.keys(assignedParts ?? {}).length) / Object.keys(parts ?? {}).length
  );

  return (
    <section className="line-distribution-edit">
      <DistributeWidget
        playerRef={playerRef}
        members={localMembers}
        stats={stats}
        setStats={setStats}
        assignedParts={assignedParts}
        setAssignedParts={setAssignedParts}
        parts={parts}
        activeGroup={activeGroup}
      />
      <div className="options">
        <Divider />
        <Progress percent={distributionCompletion} className="distribute__line-distribution-completion" />
        <div className="distribute__controls">
          <Button type="default" onClick={resetDistribution} disabled={isLoading}>
            Reset Distribution
          </Button>
          <Button type="default" disabled>
            Magic Distribution
          </Button>
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
            {activeDistribution?.id ? 'Update' : 'Save'} Distribution
          </Button>
        </div>
      </div>
    </section>
  );
}

function DistributeWidget({
  playerRef,
  members,
  stats,
  setStats,
  assignedParts,
  setAssignedParts,
  parts,
  activeGroup,
}) {
  const [selectedMember, setSelectedMember] = useState('member::ALL');
  const [isAbsoluteProgress, setAbsoluteProgress] = useState(false);
  const [progressType, setProgressType] = useState('');

  useEffect(() => {
    let total = 0;
    let totalAll = 0;
    let totalAllNone = 0;
    let max = 0;
    let maxAll = 0;
    let maxAllNone = 0;
    const newStats = {};
    // Calculate progress, max, counts
    Object.entries(assignedParts).forEach(([partId, memberKeysObj]) => {
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
  }, [assignedParts, parts, setStats]);

  const seekAndPlay = (timestamp) => {
    playerRef?.current?.internalPlayer?.seekTo(timestamp);
    playerRef?.current?.internalPlayer?.playVideo();
  };

  const toggleMember = (memberKey) => {
    setSelectedMember((state) => (state === memberKey ? 'member::ALL' : memberKey));
  };

  const assignMembers = (partId) => {
    setAssignedParts((state) => {
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
      </div>
      <Log
        seekAndPlay={seekAndPlay}
        className="distribute-log"
        defaultCompactSetting
        locked
        members={members}
        assignMembers={assignMembers}
        assignedParts={assignedParts}
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

export default LineDistributionEdit;
