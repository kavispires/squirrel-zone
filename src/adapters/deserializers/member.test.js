import { deserializeMember } from './member';

describe('Deserializers > member', function () {
  it('deserializers correctly', function () {
    const result = deserializeMember(
      {
        age: 18,
        codename: 'bola',
        color: '#FF0000',
        colorName: 'red',
        id: 'm456',
        isContestant: true,
        key: 'member::m456',
        name: 'member name',
        positions: ['VOCALIST'],
        tagline: 'tag line here',
        type: 'member',
      },
      'm123'
    );

    expect(result).toEqual({
      age: 18,
      color: '#FF0000',
      id: 'm123',
      isContestant: true,
      name: 'member name',
      positions: ['VOCALIST'],
      tagline: 'tag line here',
      type: 'member',
    });
  });
});
