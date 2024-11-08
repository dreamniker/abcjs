import SynthSequence from './synth-sequence';
import CreateSynth from './create-synth';
import activeAudioContext from './active-audio-context';

function playEvent(midiPitches, midiGracePitches, millisecondsPerMeasure, soundFontUrl, debugCallback) {
	var sequence = new SynthSequence();

	for (var i = 0; i < midiPitches.length; i++) {
		var note = midiPitches[i];
		var trackNum = sequence.addTrack();
		sequence.setInstrument(trackNum, note.instrument);
		if (i === 0 && midiGracePitches) {
			for (var j = 0; j < midiGracePitches.length; j++) {
				var grace = midiGracePitches[j];
				sequence.appendNote(trackNum, grace.pitch, 1 / 64, grace.volume, grace.cents);
			}
		}
		sequence.appendNote(trackNum, note.pitch, note.duration, note.volume, note.cents);
	}

	var ac = activeAudioContext();
	if (ac.state === "suspended") {
		return ac.resume().then(function () {
			return doPlay(sequence, millisecondsPerMeasure, soundFontUrl, debugCallback);
		});
	} else {
		return doPlay(sequence, millisecondsPerMeasure, soundFontUrl, debugCallback);
	}
}

function doPlay(sequence, millisecondsPerMeasure, soundFontUrl, debugCallback) {
	var buffer = new CreateSynth();
	return buffer.init({
		sequence: sequence,
		millisecondsPerMeasure: millisecondsPerMeasure,
		options: { soundFontUrl: soundFontUrl },
		debugCallback: debugCallback,
	}).then(function () {
		return buffer.prime();
	}).then(function () {
		buffer.start();
		return Promise.resolve();
	});
}

export default playEvent;
