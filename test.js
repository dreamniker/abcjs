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
import abcjs from './index';

import version from './version';
import Parse from './src/parse/abc_parse';
import EngraverController from './src/write/engraver-controller';

abcjs.signature = "abcjs-test v" + version;

import parserLint from './src/test/abc_parser_lint';
import verticalLint from './src/test/abc_vertical_lint';
import midiLint from './src/test/abc_midi_lint';
import midiSequencerLint from './src/test/abc_midi_sequencer_lint';
import renderingLint from './src/test/rendering-lint';
abcjs['test'] = { Parse: Parse, EngraverController: EngraverController, ParserLint: parserLint, verticalLint: verticalLint, midiLint: midiLint, midiSequencerLint: midiSequencerLint, renderingLint: renderingLint };

export default abcjs;
