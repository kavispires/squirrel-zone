type Species = 'SQUIRREL' | 'OTHER';
type Track = 'VOCAL' | 'RAP' | 'DANCE' | 'ALL_ROUNDER' | 'VISUAL';
type UUID = string;
type RankingPositions = 'VOCAL' | 'RAPPER' | 'DANCER';
type PositionLevels = 'MAIN' | 'LEAD' | 'REGULAR' | 'SUB';
type NonRankingPositions = 'CENTER' | 'VISUAL' | 'LEADER';
type Genres = 'POP' | 'DANCE';
type Position = {
type: RankingPositions | NonRankingPositions;
level?: PositionLevels;
}
type ColorHex = string;
type DurationInSeconds = number;

interface Member {
id: UUID;
type: 'member';

name: string;
species: Species;

dob: string; // YYYY/MM/DD format
age: number; // at debut

codename?: string;
tagline: string;
backstory: string;

isContestant: boolean;
isOfficialMember: boolean;

height: number; // in cm
weight: number; // in kg
zodiacSign: string;
chineseZodiacSign: string;
bloodType: string;

color: {
name: string;
h: number;
s: number;
l: number;
hex: ColorHex;
};

positions: Position[];

stats: {
vocal: number;
rap: number;
dance: number;
visual: number;
stagePresence: number; // ability to leave a mark when performing
stamina: number; // ability to keep up with the performance
influence: number; // ability to be a good leader
};

personalityType: string;

performanceArchetype: string;
}

interface MemberSummary {
memberId: UUID;
name: string;
position: string; // member.positions.0.[type + level]
colorHex: ColorHex; // member.color.hex
}

interface DistributionSummary {
distributionId: UUID;
songID: UUID;
songTitle: string;
stats: {
memberId: UUID;
colorHex: ColorHex; // member.color.hex
percentage: number;
}[];
}

interface AlbumSummary {
albumId: UUID;
albumTitle: string;
releaseYear: number;
trackList: {
songId: UUID;
title: string;
duration: DurationInSeconds;
}
}

interface Group {
id: UUID;
type: 'group';

name: string;

debutYear: number;
disbandmentYear: number;

members: MemberSummary[];

distributions: DistributionSummary[];

albums: AlbumSummary[];
}

interface Song {
id: UUID;
type: 'song';

albumIds: UUID[];

title: string;
version: string;
duration: DurationInSeconds;
genre: Genres;
isSingle: boolean;
scale: string;
style: string;
tempo: number;
videoId: string;

sectionsIds: string;
data: string;
}

interface Distribution {

}

interface Album {}
