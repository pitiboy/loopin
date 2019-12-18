import { createContext } from 'react';
import TrackStore from './TrackStore';
import MetronomeStore from './MetronomeStore';


const trackStore = new TrackStore();
const metronomeStore = new MetronomeStore();
const stores = {
  trx: trackStore,
  mtn: metronomeStore,
};

// Use the React context API so that the stores are available anywhere in the app
export default createContext(stores);
export { stores };
