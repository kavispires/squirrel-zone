import * as albumsAPI from './api/albums';
import * as distributionsDataAPI from './api/distributions-data';
import * as distributionsAPI from './api/distributions';
import * as groupsAPI from './api/groups';
import * as membersAPI from './api/members';
import * as songsAPI from './api/songs';
import * as songsDataAPI from './api/songs-data';

const API = {
  ...albumsAPI,
  ...distributionsAPI,
  ...distributionsDataAPI,
  ...groupsAPI,
  ...membersAPI,
  ...songsAPI,
  ...songsDataAPI,
};

export default API;
