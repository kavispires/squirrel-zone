class LineEntry {
  constructor({ lineId, startTime }) {
    this.lineId = lineId;
    this.sectionId = null;
    this.partsIds = [];
    this.text = [];
    this.assignees = [];
    this.startTime = startTime;
  }

  add(part) {
    this.partsIds.push(part.id);
    this.sectionId = part.sectionId;
    this.text.push(part.text);
    this.assignees.push(part.assignees.sort().join('+++'));
    this.startTime = part.startTime < this.startTime ? part.startTime : this.startTime;
  }

  // Condense text and assignees into one if they the assignees are the same
  cleanup() {
    if (this.partsIds.length > 1) {
      if (this.assignees.every((v) => v === this.assignees[0])) {
        this.text = [this.text.join(' ')];
        this.assignees = [this.assignees[0]];
      }
    }
    this.assignees = this.assignees.join('+++');
  }
}

export default LineEntry;
