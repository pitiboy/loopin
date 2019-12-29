import React, { useState, useRef } from 'react';
import { Recorder } from 'vmsg';
// import { ReactMic } from 'react-mic';
// import _ from 'lodash.get';
// import MicRecorder from 'mic-recorder';
// import { Machine, interpret } from 'xstate';

import { ControlButton } from '../ControlButton';
import LooperStyles from '../LooperStyles';

const recorder = new Recorder({
  wasmURL: 'https://unpkg.com/vmsg@0.3.0/vmsg.wasm',
});


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
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  // eslint-disable-next-line no-undef
  const audio = new Audio();

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

  const startRecording = async () => {
    setRecording(true);
    await recorder.initAudio();
    await recorder.initWorker();
    recorder.startRecording();
  };

  const stopRecording = async () => {
    setRecording(false);
    const blob = await recorder.stopRecording();
    const blobUrl = window.URL.createObjectURL(blob);
    console.log('bloburl', blob.size, blobUrl);
    await setReady('');
    setTimeout(() => {
      setReady(blobUrl);
    }, 1000);
    // setTimeout(() => {
    //   console.log('audioRef', audioRef.current);
    //   if (audioRef && audioRef.current) {
    //     console.log('blob', blob);
    //     console.log('audio element', (audioRef.current as unknown as HTMLAudioElement));
    //     console.log('audio element', (audioRef.current as unknown as HTMLAudioElement).currentSrc);
    //     // (audioRef.current as unknown as HTMLAudioElement).src=blobUrl;
    //   }
    // }, 6000);
    // setTimeout(() => {
    //   console.log('play audio', audio);
    //   if (audio && containerRef.current) {
    //     audio.src=blobUrl;
    //     audio.controls = true;
    //     (containerRef.current as unknown as HTMLElement).appendChild(audio);
    //     audio.play().then(() => console.log('played')).catch(e => console.log('play error', e));
    //   }
    // }, 10000);
  };

  // const onStop = (recordedBlob: Blob) => {
  //   const blobUrl = _(recordedBlob, 'blobURL', '');
  //   setReady(blobUrl);
  // };


  return (
    <LooperStyles ref={containerRef}>
      {!recording && <ControlButton onClick={() => startRecording()}>Record</ControlButton>}
      {recording && <ControlButton onClick={() => stopRecording()}>stop</ControlButton>}
      {/* <ReactMic
        record={recording}
        visualSetting="sinewave" // defaults -> "sinewave".  Other option is "frequencyBars"
        // className={string}       // provide css class name
        onStop={onStop} // called when audio stops recording
        // onData={function}        // called when chunk of audio data is available
        // strokeColor={string}     // sinewave or frequency bar color
        // backgroundColor={string} // background color
      /> */}
      {ready && !recording && (
        <audio ref={audioRef} controls>
          <source src={ready} type="audio/mpeg" />
        </audio>
      )}
      <small style={{ flex: '0 0 0' }}>{ready}</small>
      {/* <audio controls>
        <source src="https://raw.githubusercontent.com/pitiboy/loopin/master/sound/storm-thunder.mp3" type="audio/mp3" />
      </audio> */}
    </LooperStyles>
  );
};
