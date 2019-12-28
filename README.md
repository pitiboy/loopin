### ts
https://www.carlrippon.com/creating-a-react-and-typescript-project-with-cra3/
https://github.com/wmonk/create-react-app-typescript
https://codeburst.io/hello-create-react-app-cra-typescript-8e04f7012939

#### sound
<!-- https://surikov.github.io/midi-sounds-react/ -->
<!-- https://libraries.io/npm/react-looper/0.2.6 -->
<!-- https://github.com/mmckegg/loop-drop-app -->
<!-- https://thisdavej.com/node-js-playing-sounds-to-provide-notifications/ -->
<!-- https://libraries.io/npm/audio-loader -->


### todo
mobx
  implement store
track control
  <!-- control view with render props -->
  control buttons
    select the MIDI sound [mobx]
    mute a track [mobx]
    record a rythm [mobx]?
  choose from preselected rythms
  <!-- indicate name for related MIDI SOUNDS svg -->
  add simple [cta] to the end of the track
record
  mic
    https://www.npmjs.com/package/react-mic
    https://github.com/paraself/mic-recorder
    https://www.npmjs.com/package/react-soundplayer
    https://www.npmjs.com/package/react-sound
    <!-- https://github.com/leon3s/node-mic-record -->
    <!-- https://www.npmjs.com/package/mic -->
  aux
make tracks in grid
  different type of instruments
    drums
    bass
      merge multiple columns
    strings
      merge multiple columns
    keys
    Brass?
    Pads?
  <!-- use piano keyboard -->
    <!-- https://github.com/kevinsqi/react-piano -->
    <!-- https://github.com/lillydinhle/react-piano-component -->
general control panel
  https://reactgo.com/material-ui-react-tutorial/
  mobx
  metronome
    step => [mobx]
    provider step as Context, and useContext in Looper?
    first track (or line) could be the animated timer track for metronome
    bpm speed adjustment[mobx]
      https://www.npmjs.com/package/react-compound-slider
      <!-- https://github.com/NerdWallet/nw-react-slider -->
    display counter
  https://jonbellah.com/articles/xstate-react-hooks/
save & load music