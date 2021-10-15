import { DISTRIBUTION_SEPARATOR } from '../utils/constants';

export class LyricEntry {
  constructor(entry) {
    this.startTime = entry.startTime;
    this.sectionId = entry.sectionId;
    this.assignees = entry.assignees;
    this.lines = [entry];
  }

  add(entry) {
    this.lines.push(entry);
  }

  data(members, framerate) {
    const assignees = [...new Set(this.assignees.split(DISTRIBUTION_SEPARATOR))].map((key) => members[key]);

    return {
      startTime: this.startTime,
      names: assignees.map((assignee) => {
        if (!assignee) {
          return 'ALL';
        }
        return assignee.name;
      }),
      colors: assignees.map((assignee) => {
        if (!assignee) {
          return '#808080';
        }
        return assignee.color;
      }),
      lines: this.lines.map((line) => line.text.join(' ')),
    };
  }
}

export default LyricEntry;
