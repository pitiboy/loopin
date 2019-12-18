import {
  computed, observable, action,
} from 'mobx';

export default class MetronomeStore {

  @computed public get step() {
    return 0.0;
  }
}
