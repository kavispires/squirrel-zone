import * as utils from './index';

describe('Utils > extractYoutubeIdFromUrl()', function () {
  it('extracts video id correctly', function () {
    expect(utils.extractYoutubeIdFromUrl('fE2h3lGlOsk')).toEqual('fE2h3lGlOsk');
    expect(utils.extractYoutubeIdFromUrl('https://www.youtube.com/watch?v=fE2h3lGlOsk')).toEqual(
      'fE2h3lGlOsk'
    );
    expect(
      utils.extractYoutubeIdFromUrl(
        'https://www.youtube.com/watch?v=fE2h3lGlOsk&list=PLWNBSHKcMtySuQXvrX4R4MHTo6dgk2Ah9&index=1'
      )
    ).toEqual('fE2h3lGlOsk');
  });
});
