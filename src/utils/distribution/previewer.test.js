import MemberEntry from './memberEntry';
import Previewer from './previewer';

const SECOND = 1000;

const parts = {
  p1: {
    id: 'p1',
    text: 'Hello',
    startTime: 1 * SECOND,
    endTime: 2 * SECOND,
    duration: 1 * SECOND,
    assignee: ['A'],
    lineId: 'l1',
    sectionId: 's1',
    isDismissible: false,
  },
  p2: {
    id: 'p2',
    text: 'World',
    startTime: 4 * SECOND,
    endTime: 6 * SECOND,
    duration: 2 * SECOND,
    assignee: ['A'],
    lineId: 'l1',
    sectionId: 's1',
    isDismissible: false,
  },
  p3: {
    id: 'p3',
    text: 'Hi',
    startTime: 8 * SECOND,
    endTime: 12 * SECOND,
    duration: 4 * SECOND,
    assignee: ['A'],
    lineId: 'l2',
    sectionId: 's1',
    isDismissible: false,
  },
  p4: {
    id: 'p4',
    text: 'Planet',
    startTime: 9 * SECOND,
    endTime: 15 * SECOND,
    duration: 6 * SECOND,
    assignee: ['A'],
    lineId: 'l2',
    sectionId: 's1',
    isDismissible: false,
  },
};

const sequentialTiming = (base = 0) => {
  const startTime = (1 + base) * SECOND;
  const endTime = (2 + base) * SECOND;
  return {
    startTime,
    endTime,
    duration: endTime - startTime,
  };
};

const lyricsPartSample = [
  {
    id: 'p1',
    text: 'None example',
    startTime: sequentialTiming(1).startTime,
    endTime: sequentialTiming(1).startTime,
    duration: sequentialTiming(1).startTime,
    assignee: ['A'],
    lineId: 'l1',
    sectionId: 's1',
    isDismissible: false,
  },
  {
    id: 'p2',
    text: 'Dismissible example',
    startTime: sequentialTiming(2).startTime,
    endTime: sequentialTiming(2).startTime,
    duration: sequentialTiming(2).startTime,
    assignee: ['A'],
    lineId: 'l1',
    sectionId: 's1',
    isDismissible: true,
  },
  {
    id: 'p3',
    text: 'Hello',
    startTime: sequentialTiming(3).startTime,
    endTime: sequentialTiming(3).startTime,
    duration: sequentialTiming(3).startTime,
    assignee: ['A'],
    lineId: 'l1',
    sectionId: 's1',
    isDismissible: false,
  },
  {
    id: 'p4',
    text: 'Hello',
    startTime: sequentialTiming(4).startTime,
    endTime: sequentialTiming(4).startTime,
    duration: sequentialTiming(4).startTime,
    assignee: ['A'],
    lineId: 'l2',
    sectionId: 's1',
    isDismissible: false,
  },
  {
    id: 'p5',
    text: 'World',
    startTime: sequentialTiming(5).startTime,
    endTime: sequentialTiming(5).startTime,
    duration: sequentialTiming(5).startTime,
    assignee: ['A'],
    lineId: 'l2',
    sectionId: 's1',
    isDismissible: false,
  },
  {
    id: 'p6',
    text: 'World',
    startTime: sequentialTiming(6).startTime,
    endTime: sequentialTiming(6).startTime,
    duration: sequentialTiming(6).startTime,
    assignee: ['A'],
    lineId: 'l3',
    sectionId: 's1',
    isDismissible: false,
  },
  {
    id: 'p7',
    text: 'World',
    startTime: sequentialTiming(7).startTime,
    endTime: sequentialTiming(7).startTime,
    duration: sequentialTiming(7).startTime,
    assignee: ['A'],
    lineId: 'l4',
    sectionId: 's1',
    isDismissible: false,
  },
];

const sampleData = {
  songTitle: 'Test Title',
  allParts: Object.values(parts),
  members: {
    'member::m1': {
      key: 'member::m1',
      name: 'Vocalist',
      color: 'FF0000',
      age: 19,
    },
    'member::m2': {
      key: 'member::m2',
      name: 'Rapper',
      color: '00FF00',
      age: 18,
    },
    'member::m3': {
      key: 'member::m3',
      name: 'Dancer',
      color: '0000FF',
      age: 20,
    },
  },
  distribution: {
    p1: { 'member::m1': true },
    p2: { 'member::m2': true },
    p3: { 'member::m1': true },
    p4: { 'member::m3': true },
  },
  framerate: 1,
};

describe('Previewer', function () {
  describe('members()', function () {
    it('builds members correctly', function () {
      const previewer = new Previewer({ ...sampleData, allParts: [parts.p1] });
      const result = previewer.members();
      expect(result).toEqual([
        { age: 20, color: '0000FF', duration: 0, key: 'member::m3', name: 'Dancer', percentage: 0 },
        { age: 19, color: 'FF0000', duration: 0, key: 'member::m1', name: 'Vocalist', percentage: 0 },
        { age: 18, color: '00FF00', duration: 0, key: 'member::m2', name: 'Rapper', percentage: 0 },
      ]);

      expect(result[0] instanceof MemberEntry);
      expect(result[1] instanceof MemberEntry);
      expect(result[2] instanceof MemberEntry);
    });
  });

  describe('bars()', function () {
    it('builds bars correctly', function () {
      const previewer = new Previewer({ ...sampleData, allParts: [parts.p1] });
      const bars = previewer.bars();

      expect(bars.length).toEqual(4);
      expect(bars).toEqual([
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 0, position: -1, value: 0 },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: 0 },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: 0 },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: true, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 0, position: -1, value: '0.0' },
        },
      ]);
    });

    it('adds/removes array elements depending on framerate', function () {
      const previewer = new Previewer({ ...sampleData, allParts: [parts.p1], framerate: 2 });
      const bars = previewer.bars();

      expect(bars.length).toEqual(6);
      expect(bars[1]).toEqual(undefined);
      expect(bars).toEqual([
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 0, position: -1, value: 0 },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: 0 },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: 0 },
        },
        undefined,
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 50, position: 0, value: '0.5' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 100, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: true, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 0, position: -1, value: '0.0' },
        },
      ]);
    });

    it('calculate position correctly', function () {
      const previewer = new Previewer({
        ...sampleData,
        allParts: [parts.p1, parts.p2, parts.p3, parts.p4],
      });

      const bars = previewer.bars();

      expect(bars).toEqual([
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 0, position: -1, value: 0 },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: 0 },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: 0 },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 17, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 17, position: 0, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 0, position: -1, value: '0.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        undefined,
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 17, position: 1, value: '1.0' },
          'member::m2': { key: 'member::m2', on: true, percentage: 17, position: 0, value: '1.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 17, position: 1, value: '1.0' },
          'member::m2': { key: 'member::m2', on: true, percentage: 34, position: 0, value: '2.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 17, position: 1, value: '1.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 0, value: '2.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        undefined,
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 34, position: 1, value: '2.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 0, value: '2.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 0, position: -1, value: '0.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 50, position: 0, value: '3.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 1, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 17, position: 2, value: '1.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 67, position: 0, value: '4.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 34, position: 1, value: '2.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 84, position: 0, value: '5.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 50, position: 1, value: '3.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 84, position: 0, value: '5.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 67, position: 1, value: '4.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 84, position: 1, value: '5.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 84, position: 0, value: '5.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 84, position: 1, value: '5.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 100, position: 0, value: '6.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: false, percentage: 84, position: 1, value: '5.0' },
          'member::m2': { key: 'member::m2', on: false, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: false, percentage: 100, position: 0, value: '6.0' },
        },
        {
          'member::m1': { key: 'member::m1', on: true, percentage: 84, position: 1, value: '5.0' },
          'member::m2': { key: 'member::m2', on: true, percentage: 34, position: 2, value: '2.0' },
          'member::m3': { key: 'member::m3', on: true, percentage: 100, position: 0, value: '6.0' },
        },
      ]);
    });
  });

  describe('lyrics()', function () {
    const previewer = new Previewer({
      ...sampleData,
      allParts: lyricsPartSample,
      distribution: {
        p1: { 'member::NONE': true }, // with none
        p2: { 'member::m1': true }, // dismissible
        p3: { 'member::m1': true }, // 1 part, 1 line
        p4: { 'member::m1': true }, // 2 parts, 1 line A
        p5: { 'member::m1': true }, // 2 parts, 1 line B
        p6: { 'member::m1': true, 'member::m2': true }, // 1 part, 1 line, 2 members
        p7: { 'member::m1': true, 'member::m3': true, 'member::m2': true }, // 1 part, 1 line, 3 members
      },
    });
    const lyrics = previewer.lyrics();

    it('builds single part/single assignee correctly', function () {
      expect(lyrics[1]).toEqual({
        colors: ['FF0000', '00FF00'],
        startTime: 7000,
        lines: ['World'],
        names: ['Vocalist', 'Rapper'],
      });
    });

    xit('builds multiple parts/single assignee correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds multiple lines/single assignee correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds single part/multiple assignees correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds multiple parts/multiple assignees correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds multiple lines/multiple assignees correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds single part/ALL correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds single part/ALL+assignee correctly', function () {
      expect(lyrics['0']).toEqual({});
    });

    xit('builds multiple parts/ALL+ multiple assignees correctly', function () {
      expect(lyrics['0']).toEqual({});
    });
  });
});
