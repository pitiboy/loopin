import {
  computed, observable, action,
} from 'mobx';
import { PlayTypes, PlayBeatType, TrackType } from '../types';

interface TackControlProps {
  // TODO
  muted?: boolean;
}

export interface PitchedSound {
  pitches?: number[];
  duration?: number;
}

export interface SoundConfigProps {
  name: string;
  type: TrackType;
  divider: number;
  playType?: PlayTypes;
  instrument: number;
  playSound?: () => void;
}

interface TrackSoundProps extends SoundConfigProps, PitchedSound {
  // TODO
  playBeat?: PlayBeatType;
}


interface TrackProps extends TrackSoundProps, TackControlProps {

}

const defaultArray: number[] = [];
const flattenArray = (array: (number | number[])[]) => defaultArray.slice().concat.apply([], array);


// https://stackoverflow.com/questions/52641907/how-to-get-mobx-decorators-to-work-with-create-react-app-v2
export default class TrackStore {
  // constructor() {
  // }


  @observable tracks: TrackProps[] = [{
    name: 'kickdrum',
    type: TrackType.drum,
    instrument: 1,
    divider: 2,
    playType: PlayTypes.oddQuarter,
  },
  {
    name: 'kickdrum variety',
    type: TrackType.drum,
    instrument: 1,
    divider: 2,
    playBeat: [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  },
  {
    name: 'snaredrum',
    type: TrackType.drum,
    instrument: 16,
    divider: 1,
    playType: PlayTypes.even,
  },
  {
    name: 'cin',
    type: TrackType.drum,
    instrument: 39,
    divider: 4,
    playType: PlayTypes.even,
  },
  // {
  //   name: 'korgbass',
  //   type: TrackType.bass,
  //   instrument: 376,
  //   pitches: [30],
  //   duration: 1,
  //   divider: 4,
  //   playType: PlayTypes.odd,
  // },
  {
    name: 'korgbass 2',
    type: TrackType.bass,
    instrument: 371,
    pitches: [30],
    duration: 1,
    divider: 4,
    playType: PlayTypes.odd,
  },
  {
    name: 'quitar1',
    type: TrackType.bass,
    instrument: 307,
    duration: 1,
    divider: 2,
    playBeat: [
      50, 0, 53, 54, 55, 0, 50, 0,
      50, 0, 53, 54, 55, 0, 50, 0,
      50, 0, 53, 54, 55, 0, 50, 0,
      51, 0, 54, 55, 56, 0, 52, 0,
      // 0, 30, 0, 0, 32, 0, 30, 0,
      // 0, 30, 0, 32, 36, 0, 30, 0,
      // 0, 30, 0, 0, 30, 30, 0, 0,
    ],
  },
  ];

  @computed public get drums() {
    return this.tracks.filter(track => track.type === TrackType.drum);
  }

  @computed public get drumInstrumentIds() {
    return flattenArray(this.drums.map(track => track.instrument));
  }

  @computed public get bassers() {
    return this.tracks.filter(track => track.type === TrackType.bass);
  }

  @computed public get bassersInstrumentIds() {
    return flattenArray(this.bassers.map(track => track.instrument));
  }

  @action _remove(track: TrackProps) {
  }

  @action _add(track: TrackProps) {
  }

  // bind this
  @action add = this._add.bind(this);

  @action remove = this._remove.bind(this);
}
