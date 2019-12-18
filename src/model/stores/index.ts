import { createContext } from 'react';
import TrackStore from './TrackStore';


const trackStore = new TrackStore();
const stores = {
  fav: trackStore,
};

// Use the React context API so that the stores are available anywhere in the app
export default createContext(stores);
export { stores };
