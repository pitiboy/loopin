import {
  computed, observable, action,
} from 'mobx';
import { PlayTypes, PlayBeatType, TrackType } from '../types';

interface TackControlProps {
  // TODO
  muted?: boolean;
}

interface TackSoundProps {
  name: string;
  type: TrackType;
  sound: any;
  // TODO
  divider: number;
  playType?: PlayTypes;
  playBeat?: PlayBeatType;
}


interface TrackProps extends TackSoundProps, TackControlProps {

}

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
  }];

  @computed public get drums() {
    return this.tracks.filter((track) => track.type === TrackType.drum);
  }

  @action _remove(track: TrackProps) {
  }

  @action _add(track: TrackProps) {
  }

  // bind this
  @action add = this._add.bind(this);

  @action remove = this._remove.bind(this);
}
