import {
  computed, observable, action,
} from 'mobx';
import { PlayTypes, RythmConfigTypes, TrackType } from '../types';


export interface MidiSoundConfigProps {
  instruments: number[];
}

export interface PitchedMidiSoundConfigProps {
  instrument: number;
  pitches?: number[];
  duration: number;
}


export interface AudioSoundConfigProps {
  blobUrl: string;
  playSound: () => void;
}


export interface TrackControlProps {
  name: string;
  // TODO other control & config
  muted?: boolean;
}

export interface TrackTypeProps {
  type: TrackType;
  typeConfig: MidiSoundConfigProps | PitchedMidiSoundConfigProps | AudioSoundConfigProps;
}

export interface InitialRythmConfigProps {
  playType?: PlayTypes;
  divider: number;
}

interface FinalRythmConfigProps {
  rythmConfig?: RythmConfigTypes;
}


export interface TrackProps extends TrackControlProps, TrackTypeProps, InitialRythmConfigProps, FinalRythmConfigProps {

}

const defaultArray: number[] = [];
const flattenArray = (array: (number | number[])[]) => defaultArray.slice().concat.apply([], array);

console.log('REACT_APP_MUTE_ALL_TRACK', process.env.REACT_APP_MUTE_ALL_TRACK);

// https://stackoverflow.com/questions/52641907/how-to-get-mobx-decorators-to-work-with-create-react-app-v2
export default class TrackStore {
  // constructor() {
  // }


  @observable tracks: TrackProps[] = [{
    name: 'kickdrum',
    type: TrackType.drum,
    typeConfig: {
      instruments: [1],
    },
    divider: 2,
    playType: PlayTypes.oddQuarter,
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
  },
  {
    name: 'kickdrum variety',
    type: TrackType.drum,
    typeConfig: {
      instruments: [1],
    },
    divider: 2,
    rythmConfig: [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
  },
  {
    name: 'cin',
    type: TrackType.drum,
    typeConfig: {
      instruments: [39],
    },
    divider: 4,
    playType: PlayTypes.even,
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
  },
  {
    name: 'snaredrum',
    type: TrackType.drum,
    typeConfig: {
      instruments: [16],
    },
    divider: 1,
    playType: PlayTypes.even,
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
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
    typeConfig: {
      instrument: 371,
      pitches: [30],
      duration: 1,
    },
    divider: 4,
    playType: PlayTypes.odd,
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
  },
  {
    name: 'quitar1',
    type: TrackType.bass,
    typeConfig: {
      instrument: 307,
      duration: 1,
    },
    divider: 2,
    rythmConfig: [
      50, 0, 53, 54, 55, 0, 50, 0,
      50, 0, 53, 54, 55, 0, 50, 0,
      50, 0, 53, 54, 55, 0, 50, 0,
      51, 0, 54, 55, 56, 0, 52, 0,
    ],
    muted: process.env.REACT_APP_MUTE_ALL_TRACK === 'true', // TODO: disable
  },
  ];

  @computed public get drums() {
    return this.tracks
      .filter(track => track.type === TrackType.drum)
      .map(track => ({ ...track, typeConfig: track.typeConfig as MidiSoundConfigProps }));
  }

  @computed public get drumInstrumentIds() {
    return flattenArray(this.drums.map(track => track.typeConfig.instruments));
  }

  @computed public get bassers() {
    return this.tracks
      .filter(track => track.type === TrackType.bass)
      .map(track => ({ ...track, typeConfig: track.typeConfig as PitchedMidiSoundConfigProps }));
  }

  @computed public get bassersInstrumentIds() {
    return flattenArray(this.bassers.map(track => track.typeConfig.instrument));
  }

  @computed public get recordings() {
    return this.tracks
      .filter(track => track.type === TrackType.recording)
      .map(track => ({ ...track, typeConfig: track.typeConfig as AudioSoundConfigProps }));
  }

  @action _update(track: TrackControlProps) {
    console.log('_update', track);
    this.tracks = this.tracks.slice().map(t => (t.name === track.name ? { ...t, ...track }: t));
    // console.log('this.tracks', this.tracks);
  }

  @action _remove(track: TrackControlProps) {
    console.log('remove ', track);
  }

  @action _add(track: TrackProps) {
    console.log('add new ', track);
    this.tracks = this.tracks.slice().concat(track);
  }

  // bind this
  @action add = this._add.bind(this);

  @action remove = this._remove.bind(this);

  @action update = this._update.bind(this);

  @action mute = this._update.bind(this);
}
