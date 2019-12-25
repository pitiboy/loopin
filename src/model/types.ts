export type PlayBeatType = number[];

export enum PlayTypes {
  all = 'all',
  odd = 'odd',
  even = 'even',
  oddQuarter = 'quarter',
  evenQuarter = 'evenQuarter',
  first = 'first',
  last = 'last',
}


export enum TrackType {
  // instruments
  drum = 110,
  bass = 120,
  string = 130,
  key = 190,
  // brass
  // pad

  recording = 101,
  other = 900,
}
