import {
  computed, observable, action,
} from 'mobx';

interface TrackProps {
  id: number;
}

// https://stackoverflow.com/questions/52641907/how-to-get-mobx-decorators-to-work-with-create-react-app-v2
export default class TrackStore {
  // constructor() {
    // }

  // bind this
  add = this._add.bind(this);
  remove = this._remove.bind(this);

  @observable tracks:TrackProps[] = [];

  @action _remove(track: TrackProps) {
  }
  @action _add(track: TrackProps) {
  }

}