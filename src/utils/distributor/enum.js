export const NULL = 'NULL';

export const ASSIGNEE = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H',
};

export const SKILL = {
  AD_LIB: 'AD_LIB',
  CHOIR: 'CHOIR',
  DANCE: 'DANCE',
  RAP: 'RAP',
  VOCAL: 'VOCAL',
};

export const SKILL_LEVEL = {
  1: 1,
  2: 2,
  3: 3,
};

export const SKILL_TYPE = {
  [SKILL.AD_LIB]: {
    BELT: 'BELT',
    SFX: 'SFX',
    SHOUT: 'SHOUT',
    RAP: 'RAP',
    REGULAR: 'REGULAR',
    RUN: 'RUN',
    WHISPER: 'WHISPER',
  },
  [SKILL.CHOIR]: {
    CHANTING: 'CHANTING',
    REGULAR: 'REGULAR',
    SHOUTING: 'SHOUTING',
  },
  [SKILL.DANCE]: {
    GROUP: 'GROUP',
    LIPSYNC: 'LIPSYNC',
    POSING: 'POSING',
    SOLO: 'SOLO',
  },
  [SKILL.RAP]: {
    SLOW: 'SLOW',
    REGULAR: 'REGULAR',
    FAST: 'FAST',
    SPOKEN: 'SPOKEN',
  },
  [SKILL.VOCAL]: {
    HIGH: 'HIGH',
    LOW: 'LOW',
    REGULAR: 'REGULAR',
  },
};

export const SECTION = {
  BREAK: 'BREAK',
  BRIDGE: 'BRIDGE',
  CHORUS: 'CHORUS',
  DANCE_BREAK: 'DANCE_BREAK',
  DROP: 'DROP',
  HOOK: 'HOOK',
  INSTRUMENTAL_SOLO: 'INSTRUMENTAL_SOLO',
  INTRO: 'INTRO',
  OUTRO: 'OUTRO',
  POST_CHORUS: 'POST_CHORUS',
  PRE_CHORUS: 'PRE_CHORUS',
  RAP: 'RAP',
  SPECIAL: 'SPECIAL',
  UNKNOWN: 'UNKNOWN',
  VERSE: 'VERSE',
};
