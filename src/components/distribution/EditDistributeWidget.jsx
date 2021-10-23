import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Design Resources
import { Divider, Switch, Select } from 'antd';

// Utilities
import { serializeKey } from '../../utils';
import { DEFAULT_MEMBERS } from '../../utils/constants';
// Components
import YoutubeVideo from '../YoutubeVideo';
import Log from '../log/Log';
import EditMemberSelection from './EditMemberSelection';

function EditDistributeWidget({
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
    <div className="distribute-widget">
      <div className="distribute-widget__options">
        <YoutubeVideo playerRef={playerRef} width={320} height={180} className="distribute-widget__video" />
        <div className="distribute-widget__controls">
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
        <ul className="distribute-widget__members-selection">
          {Object.values(DEFAULT_MEMBERS).map((member) => {
            const memberStats = stats?.[member.key] ?? {};
            const progress = isAbsoluteProgress
              ? memberStats?.[`absoluteProgress${progressType}`]
              : memberStats?.[`relativeProgress${progressType}`];
            return (
              <EditMemberSelection
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
                <EditMemberSelection
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
        className="distribute-widget__log"
        defaultCompactSetting
        locked
        members={members}
        assignMembers={assignMembers}
        assignedParts={assignedParts}
      />
    </div>
  );
}

EditDistributeWidget.propTypes = {
  activeGroup: PropTypes.object,
  assignedParts: PropTypes.object,
  members: PropTypes.object,
  parts: PropTypes.object,
  playerRef: PropTypes.any,
  setAssignedParts: PropTypes.func,
  setStats: PropTypes.func,
  stats: PropTypes.object,
};

export default EditDistributeWidget;
