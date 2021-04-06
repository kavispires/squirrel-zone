export class ChartEntry {
  constructor({ key, position }) {
    this.key = key;
    this.value = 0;
    this.on = false;
    this.percentage = 0;
    this.position = position;
  }
}

export default ChartEntry;
