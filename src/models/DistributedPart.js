export class DistributedPart {
  constructor({
    id,
    text,
    startTime,
    endTime,
    duration,
    assignee,
    membersIds,
    lineId,
    sectionId,
    isDismissible = false,
  }) {
    this.id = id;
    this.type = 'distributed-part';
    this.text = text;
    this.startTime = startTime;
    this.endTime = endTime;
    this.duration = duration;
    this.lineId = lineId;
    this.sectionId = sectionId;
    this.isDismissible = isDismissible;
    this.assignees =
      Array.isArray(membersIds) && membersIds.length
        ? membersIds
        : Array.isArray(assignee) && assignee.length
        ? assignee
        : ['NONE'];
  }
}

export default DistributedPart;
