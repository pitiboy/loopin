import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import _ from 'lodash.get';
// import MicRecorder from 'mic-recorder';
// import { Machine, interpret } from 'xstate';

import { ControlButton } from '../ControlButton';
import LooperStyles from '../LooperStyles';

// https://jonbellah.com/articles/xstate-react-hooks/
// const recordState = Machine({
//   id: 'record',
//   initial: 'inactive',
//   states: {
//     inactive: { on: { start: 'recording' } },
//     recording: { on: { stop: 'inactive' } },
//   },
// });

interface ReactMicStoppedProps {
  blobUrl: string;
}

export default () => {
  const [recording, setRecording] = useState(false);
  const [ready, setReady] = useState('');
  // New instance
  // const recorder = new MicRecorder({
  //   bitRate: 128,
  //   encoder: 'mp3', // default is mp3, can be wav as well
  //   sampleRate: 44100, // default is 44100, it can also be set to 16000 and 8000.
  // });

  // const start = () => {
  //   setRecording(true);
  //   // Start recording. Browser will request permission to use your microphone.
  //   console.log('recorder', recorder);
  //   recorder.start().then(() => {
  //     // something else
  //   }).catch((e) => {
  //     console.error(e);
  //   });
  // };

  // const stop = () => {
  //   setRecording(false);
  //   console.log('recorder', recorder);
  //   // Once you are done singing your best song, stop and get the mp3.
  //   recorder
  //     .stop()
  //     .getAudio()
  //     .then(([buffer, blob]) => {
  //       // do what ever you want with buffer and blob
  //       // Example: Create a mp3 file and play
  //       console.log('buffer', buffer, blob);
  //       // const file = new File(buffer, 'me-at-thevoice.mp3', {
  //       //   type: blob.type,
  //       //   lastModified: Date.now(),
  //       // });

  //       // const player = new Audio(URL.createObjectURL(file));
  //       // player.play();
  //     }).catch((e) => {
  //       console.error('We could not retrieve your message');
  //       console.log(e);
  //     });
  // };

  const onStop = (recordedBlob: Blob) => {
    const blobUrl = _(recordedBlob, 'blobURL', '');
    setReady(blobUrl);
  };


  return (
    <LooperStyles>
      {!recording && <ControlButton onClick={() => setRecording(true)}>Record</ControlButton>}
      {recording && <ControlButton onClick={() => setRecording(false)}>stop</ControlButton>}
      <ReactMic
        record={recording}
        visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
        // className={string}       // provide css class name
        onStop={onStop} // called when audio stops recording
        // onData={function}        // called when chunk of audio data is available
        // strokeColor={string}     // sinewave or frequency bar color
        // backgroundColor={string} // background color
      />
      {ready && (
        <audio controls>
          <track kind="captions" />
          <source src={ready} type="audio/webm" />
        </audio>
      )}
    </LooperStyles>
  );
};
