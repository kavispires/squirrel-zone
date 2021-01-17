// Global State
import { getFrameFromTimestamp, getTimestampFromFrame } from '..';

const ALL_NONE_MEMBERS = ['ALL', 'NONE', 'member::ALL', 'member::NONE'];

class DistributedPart {
  constructor(part, membersIds) {
    this.id = part.id;
    this.type = 'distributed-part';
    this.text = part.text;
    this.startTime = part.startTime;
    this.endTime = part.endTime;
    this.duration = part.duration;
    this.assignees =
      Array.isArray(membersIds) && membersIds.length
        ? membersIds
        : Array.isArray(part.assignee) && part.assignee.length
        ? part.assignee
        : ['NONE'];
  }
}

class ChartEntry {
  constructor({ id, name, color, key }) {
    this.id = key ?? id;
    this.label = name;
    this.value = 0;
    this.color = color;
    this.on = false;
    this.percentage = 0;
  }
}

/**
 * Class representing a Distribution Preview.
 */
export class Previewer {
  /**
   * Create a Previewer.
   * @constructor
   * @param {object} data - An object with the necessary data to be loaded in this instance
   */
  constructor({ song, parts, members, distribution, framerate = 30 }) {
    this.members = members;
    this.framerate = framerate;
    this.distributedParts = [];
    this.totalDuration = 0;
    this.winningDuration = 0;
    this.winnerId = null;
    this.totals = {};

    this.distributedParts = [];
    this.membersIndices = {};
    this.membersChartData = [];
    this.membersCountCache = {};

    this.lineDistribution = null;

    this._buildDistribution(song, parts, distribution);
  }

  _buildDistribution(song, parts, distribution) {
    this.distributedParts = song.allPartsIds
      .map((partId) => {
        const part = parts[partId];
        const distributedPart = distribution[partId];
        const distributedAssignees = Array.isArray(distributedPart)
          ? distributedPart
          : Object.keys(distributedPart);

        return new DistributedPart(part, distributedAssignees);
      })
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    // Calculate max
    this._calculateMax();
  }

  _calculateMax() {
    const result = this.distributedParts.reduce(
      (acc, part) => {
        // Add total
        acc.totalDuration += part.duration;
        // Add each member duration
        part.assignees.forEach((assignee) => {
          if (acc.cache[assignee] === undefined) {
            acc.cache[assignee] = 0;
          }
          acc.cache[assignee] += part.duration;

          if (!ALL_NONE_MEMBERS.includes(assignee) && acc.cache[assignee] > acc.winningDuration) {
            acc.winningDuration = acc.cache[assignee];
            acc.winnerId = assignee;
          }
        });

        return acc;
      },
      {
        totalDuration: 0,
        winningDuration: 0,
        winnerId: null,
        cache: {},
      }
    );

    this.totalDuration = result.totalDuration;
    this.winningDuration = result.winningDuration;
    this.winnerId = result.winnerId;
    this.totals = result.cache;
  }

  buildMembersIndexing() {
    this.membersIndices = Object.keys(this.members).reduce((acc, memberId, index) => {
      if (!ALL_NONE_MEMBERS.includes(memberId)) {
        acc[memberId] = index;
      }

      return acc;
    }, {});
  }

  buildMembersLineBarChartData() {
    this.membersCountCache = {};
    this.membersChartData = Object.keys(this.membersIndices).map((id) => {
      const member = this.members[id];
      this.membersCountCache[id] = 0;
      return new ChartEntry(member);
    });
  }

  /**
   * Builds an array of n elements from each time a timestamp starts until it ends
   * with the index being its fame (calculated from given framerate)
   * The element in each child array will be a ChartEntry
   * @returns {ChartEntry[][]}
   */
  build() {
    if (this.lineDistribution) {
      return this.lineDistribution;
    }

    this.buildMembersIndexing();
    this.buildMembersLineBarChartData();
    console.log(this.membersChartData);

    const temp = [[...JSON.parse(JSON.stringify(this.membersChartData))]];

    this.distributedParts.forEach((dPart) => {
      const startIndex = getFrameFromTimestamp(dPart.startTime, this.framerate);
      const endIndex = getFrameFromTimestamp(dPart.endTime, this.framerate);

      for (let i = startIndex; i <= endIndex; i++) {
        if (temp[i] === undefined) {
          temp[i] = [...JSON.parse(JSON.stringify(this.membersChartData))];
        }
        dPart.assignees.forEach((assignee) => {
          if (!ALL_NONE_MEMBERS.includes(assignee)) {
            const assigneeIndex = this.membersIndices[assignee];
            if (!temp[i][assigneeIndex]) {
              debugger;
            }
            temp[i][assigneeIndex].on = i !== endIndex;
          }
        });
      }
    });

    // Add the initial state
    const result = [temp[0]];
    // Calculate value and percentage for each entry (undefined indexes will remain undefined)
    for (let i = 1; i < temp.length; i++) {
      const entry = temp[i];
      if (entry) {
        // Add whoever is 'on'
        entry.forEach((chartEntry) => {
          if (chartEntry.on) {
            this.membersCountCache[chartEntry.id] += 1;
          }

          // Update value and percentage
          chartEntry.value = getTimestampFromFrame(this.membersCountCache[chartEntry.id], this.framerate);
          chartEntry.percentage = Math.ceil((100 * chartEntry.value) / this.winningDuration);
        });

        result[i] = entry;
      }
    }

    this.lineDistribution = result;
    return this.lineDistribution;
  }
}

export default Previewer;
