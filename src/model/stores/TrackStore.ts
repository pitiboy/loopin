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

interface TrackSoundProps extends PitchedSound {
  name: string;
  type: TrackType;
  sound: any;
  // TODO
  divider: number;
  playType?: PlayTypes;
  playBeat?: PlayBeatType;
}


interface TrackProps extends TrackSoundProps, TackControlProps {

}

const defaultArray: number[] = [];
const flattenArray = (array: number[]) => array.reduce((stack, sound) => [...stack, sound], defaultArray.slice());


// https://stackoverflow.com/questions/52641907/how-to-get-mobx-decorators-to-work-with-create-react-app-v2
export default class TrackStore {
  // constructor() {
  // }


  @observable tracks: TrackProps[] = [{
    name: 'kickdrum',
    type: TrackType.drum,
    sound: [1],
    divider: 2,
    playType: PlayTypes.oddQuarter,
  },
  {
    name: 'kickdrum variety',
    type: TrackType.drum,
    sound: [1],
    divider: 2,
    playBeat: [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  },
  {
    name: 'snaredrum',
    type: TrackType.drum,
    sound: [16],
    divider: 1,
    playType: PlayTypes.even,
  },
  {
    name: 'cin',
    type: TrackType.drum,
    sound: [39],
    divider: 4,
    playType: PlayTypes.even,
  },
  // {
  //   name: 'korgbass',
  //   type: TrackType.bass,
  //   sound: 376,
  //   pitches: [30],
  //   duration: 1,
  //   divider: 4,
  //   playType: PlayTypes.odd,
  // },
  {
    name: 'korgbass 2',
    type: TrackType.bass,
    sound: 371,
    duration: 1,
    divider: 4,
    playBeat: [
      0, 30, 0, 32, 32, 0, 30, 0,
      0, 30, 0, 0, 32, 0, 30, 0,
      0, 30, 0, 32, 36, 0, 30, 0,
      0, 30, 0, 0, 30, 30, 0, 0,
    ],
  },
  ];

  @computed public get drums() {
    return this.tracks.filter(track => track.type === TrackType.drum);
  }

  @computed public get drumInstrumentIds() {
    return flattenArray(this.drums.map(track => track.sound));
  }

  @computed public get bassers() {
    return this.tracks.filter(track => track.type === TrackType.bass);
  }

  @computed public get bassersInstrumentIds() {
    return flattenArray(this.bassers.map(track => track.sound));
  }

  @action _remove(track: TrackProps) {
  }

  @action _add(track: TrackProps) {
  }

  // bind this
  @action add = this._add.bind(this);

  @action remove = this._remove.bind(this);
}
