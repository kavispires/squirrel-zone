import { deepCopy, getFrameFromTimestamp, getTimestampFromFrame } from '..';
import ChartEntry from './chartEntry';
import DistributedPart from './distributedPart';
import LineEntry from './lineEntry';
import LyricEntry from './lyricEntry';
import MemberEntry from './memberEntry';

const ALL_NONE_MEMBERS = ['ALL', 'NONE', 'member::ALL', 'member::NONE'];

/**
 * Class to generate a Line Distribution preview.
 */
export class Previewer {
  constructor({ songTitle, allParts, members, distribution, framerate = 30 }) {
    this._songTitle = songTitle;
    this._allParts = allParts;
    this._distribution = distribution;
    this._framerate = framerate;

    this._members = this._buildMembers(members);
    this._distributedParts = this._buildDistributionParts();
    this._max = this._calculateMax();
    this._priorityPosition = this._buildMemberPriorityPosition();
    this._membersCountCache = {};
    this._membersChartData = this._buildMembersLineBarChartData();
  }

  /**
   * Builds dictionary of MemberEntry where the key is the member key.
   * @param {object{}} members
   * @returns {MemberEntry{}}
   */
  _buildMembers(members) {
    return Object.values(members).reduce((result, member) => {
      result[member.key] = new MemberEntry(member);
      return result;
    }, {});
  }

  /**
   * Builds array of DistributedPart sorted by startTime.
   * @returns {DistributedPart[]}
   */
  _buildDistributionParts() {
    return this._allParts
      .map((part) => {
        const distributedPart = this._distribution[part.id];
        const distributedAssignees = Array.isArray(distributedPart)
          ? distributedPart
          : Object.keys(distributedPart);

        return new DistributedPart({
          ...part,
          membersIds: distributedAssignees,
        });
      })
      .sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
  }

  /**
   * Builds Max dictionary.
   * @returns {object}
   */
  _calculateMax() {
    return this._distributedParts.reduce(
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
            acc.winnerKey = assignee;
          }
        });

        return acc;
      },
      {
        totalDuration: 0,
        winningDuration: 0,
        winnerKey: null,
        cache: {},
      }
    );
  }

  /**
   * Builds Position priority based on age
   */
  _buildMemberPriorityPosition() {
    return this.members().reduce((acc, memberEntry, index) => {
      acc[memberEntry.key] = index;
      return acc;
    }, {});
  }

  /**
   * Creates a LineBars ChartEntry dictionary that has every member ChartEntry set to 0/
   * @returns {ChartEntry{}}
   */
  _buildMembersLineBarChartData() {
    this._membersCountCache = {};
    return Object.keys(this._members).reduce((acc, key) => {
      this._membersCountCache[key] = 0;
      acc[key] = new ChartEntry({ key, position: -1 });
      return acc;
    }, {});
  }

  /**
   * Outputs the members array
   * @return {Member[]}
   */
  members() {
    return Object.values(this._members).sort((a, b) => (b.age > a.age ? 1 : -1));
  }

  /**
   * Build distribution bars
   * @param {boolean} force - flag indicating if bars should be rebuilt
   */
  bars(force = false) {
    if (this._bars && !force) return this._bars;

    const temp = [deepCopy(this._membersChartData)];

    // Create an temp entry for each startTime and endTime on each distributedPart
    this._distributedParts.forEach((dPart) => {
      const startIndex = getFrameFromTimestamp(dPart.startTime, this._framerate);
      const endIndex = getFrameFromTimestamp(dPart.endTime, this._framerate);

      for (let i = startIndex; i <= endIndex; i++) {
        if (temp[i] === undefined) {
          temp[i] = deepCopy(this._membersChartData);
        }
        dPart.assignees.forEach((assigneeKey) => {
          if (!ALL_NONE_MEMBERS.includes(assigneeKey)) {
            temp[i][assigneeKey].on = i !== endIndex;
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
        Object.values(entry).forEach((chartEntry) => {
          if (chartEntry.on) {
            this._membersCountCache[chartEntry.key] += 1;
          }

          // Update value and percentage
          chartEntry.value = getTimestampFromFrame(this._membersCountCache[chartEntry.key], this._framerate);
          chartEntry.percentage = Math.ceil((100 * chartEntry.value) / this._max.winningDuration);
        });

        // Reposition
        const sortedEntry = Object.values(entry).sort((a, b) => (b.value > a.value ? 1 : -1));
        Object.values(entry).forEach((chartEntry) => {
          chartEntry.position =
            chartEntry.value > 0 ? sortedEntry.findIndex((e) => e.key === chartEntry.key) : -1;
          // Fix value
          chartEntry.value = Number(chartEntry.value / 1000).toFixed(1);
        });

        result[i] = entry;
      }
    }

    // Add an last entry that every member is on
    const newLastEntry = deepCopy(result[result.length - 1]);
    Object.values(newLastEntry).forEach((chartEntry) => {
      chartEntry.on = true;
    });
    result.push(newLastEntry);

    this._bars = result;
    return this._bars;
  }

  /**
   *
   * @param {*} force
   */
  lyrics(force = false) {
    if (this._lyrics && !force) return this._lyrics;

    const lineEntries = {};

    // Iterate through distributedParts building lyricLine
    this._distributedParts.forEach((dPart) => {
      // Ignore dismissible parts
      if (dPart.isDismissible) return;
      // Ignore parts with None
      if (dPart.assignees.includes('member::NONE')) return;
      // Create line entry where there is none for given lineId
      if (lineEntries[dPart.lineId] === undefined) {
        lineEntries[dPart.lineId] = new LineEntry(dPart);
      }

      lineEntries[dPart.lineId].add(dPart);
    });

    const lyricsEntries = {};

    // Grouping
    // Rules if different sectionId, new lyricEntry
    const sortedLineEntries = Object.values(lineEntries).sort((a, b) =>
      a.startTime >= b.startTime ? 1 : -1
    );

    let latestEntry = null;

    sortedLineEntries.forEach((entry) => {
      // Cleanup entry
      entry.cleanup();

      // If it has the same sectionId and assignees of previous entry, use it
      if (latestEntry?.sectionId === entry.sectionId && latestEntry.assignees === entry.assignees) {
        latestEntry.add(entry);
        return;
      }

      // Consume latestEntry
      if (latestEntry) {
        if (lyricsEntries[latestEntry?.startTime]) {
          lyricsEntries[latestEntry.startTime + 0.1] = latestEntry;
        } else {
          lyricsEntries[latestEntry.startTime] = latestEntry;
        }
        latestEntry = null;
      }

      // Create new entry
      latestEntry = new LyricEntry(entry);
    });

    // Consume last entry
    if (latestEntry) {
      lyricsEntries[latestEntry.startTime] = latestEntry;
    }

    // Cleanup
    Object.entries(lyricsEntries).forEach(([key, entry]) => {
      lyricsEntries[key] = entry.data(this._members, this._framerate);
    });

    // console.log({ lyricsEntries });

    this._lyrics = Object.values(lyricsEntries);
    return this._lyrics;
  }
}

export default Previewer;
