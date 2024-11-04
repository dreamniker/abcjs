/**!
Copyright (c) 2009-2023 Paul Rosen and Gregory Dyke

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 **This text is from: http://opensource.org/licenses/MIT**
!**/
import version from './version'
import Editor from './src/edit/abc_editor'
import EditArea from './src/edit/abc_editarea'

import animation from './src/api/abc_animation'
import tuneBook from './src/api/abc_tunebook'
import sequence from './src/synth/abc_midi_sequencer'
import strTranspose from './src/str/output'

import renderAbc from './src/api/abc_tunebook_svg'
import tuneMetrics from './src/api/tune-metrics'
import TimingCallbacks from './src/api/abc_timing_callbacks'

import glyphs from './src/write/creation/glyphs'

import CreateSynth from './src/synth/create-synth'
import instrumentIndexToName from './src/synth/instrument-index-to-name'
import pitchToNoteName from './src/synth/pitch-to-note-name'
import SynthSequence from './src/synth/synth-sequence'
import CreateSynthControl from './src/synth/create-synth-control'
import registerAudioContext from './src/synth/register-audio-context'
import activeAudioContext from './src/synth/active-audio-context'
import supportsAudio from './src/synth/supports-audio'
import playEvent from './src/synth/play-event'
import SynthController from './src/synth/synth-controller'
import getMidiFile from './src/synth/get-midi-file'
import midiRenderer from './src/synth/abc_midi_renderer'
import soundsCache from './src/synth/sounds-cache'

var abcjs = {}

abcjs.renderAbc = renderAbc
abcjs.tuneMetrics = tuneMetrics
abcjs.TimingCallbacks = TimingCallbacks

abcjs.signature = 'abcjs-basic v' + version

Object.keys(animation).forEach(function (key) {
  abcjs[key] = animation[key]
})

Object.keys(tuneBook).forEach(function (key) {
  abcjs[key] = tuneBook[key]
})

const setGlyph = glyphs.setSymbol

abcjs.setGlyph = glyphs.setSymbol
abcjs.strTranspose = strTranspose

abcjs['Editor'] = Editor
abcjs['EditArea'] = EditArea

const synth = {
  CreateSynth: CreateSynth,
  instrumentIndexToName: instrumentIndexToName,
  pitchToNoteName: pitchToNoteName,
  SynthController: SynthController,
  SynthSequence: SynthSequence,
  CreateSynthControl: CreateSynthControl,
  registerAudioContext: registerAudioContext,
  activeAudioContext: activeAudioContext,
  supportsAudio: supportsAudio,
  playEvent: playEvent,
  getMidiFile: getMidiFile,
  sequence: sequence,
  midiRenderer: midiRenderer,
  soundsCache: soundsCache,
}

abcjs.synth = synth

export default abcjs

export { renderAbc, tuneMetrics, TimingCallbacks, synth, setGlyph, strTranspose, CreateSynth }
