import { serializeMember } from './member';

describe('Serializers > member', function () {
  const memberRequiredFields = {
    id: 'm123',
    type: 'member',
    name: 'member name',
    age: 18,
  };

  it('serializers correctly', function () {
    const result = serializeMember({
      ...memberRequiredFields,
      color: '#FF0000',
      colorName: 'red',
      codename: 'bola',
      tagline: 'tag line here',
      isContestant: true,
      positions: ['VOCALIST'],
    });

    expect(result).toEqual({
      age: 18,
      codename: 'bola',
      color: '#FF0000',
      colorName: 'red',
      id: 'm123',
      isContestant: true,
      key: 'member::m123',
      name: 'member name',
      positions: ['VOCALIST'],
      tagline: 'tag line here',
      type: 'member',
    });
  });

  it('serializers partial data correctly', function () {
    const result = serializeMember({
      ...memberRequiredFields,
    });

    expect(result).toEqual({
      age: 18,
      codename: '',
      color: '',
      colorName: '',
      id: 'm123',
      isContestant: false,
      key: 'member::m123',
      name: 'member name',
      positions: [],
      tagline: '',
      type: 'member',
    });
  });
});
