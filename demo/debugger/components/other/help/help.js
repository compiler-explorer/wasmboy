import { h, Component } from 'preact';

import './help.css';

export default class HelpComponent extends Component {
  render() {
    return (
      <div class="help">
        <h1>Help</h1>
        <h2>Compiler Explorer Fork</h2>
        <div>
          This is a fork of WasmBoy maintained by Compiler Explorer for displaying Game Boy compiler output. ROMs are loaded automatically
          from URL parameters. The Open menu has been disabled to prevent confusion.
        </div>
        <h2>How do I use this Debugger</h2>
        <div>
          Widgets can be opened from the Widgets menu above. You can move tabs by dragging them, and resize widgets by hovering over their
          edges and stretching to the desired size. All open widgets and layout configurations are saved in localStorage and are preserved
          between sessions.
        </div>
        <h2>Hotkeys</h2>
        <div>
          <h3>Emulator Controls:</h3>
          <ul>
            <li>
              <b>Left Trigger, Right Trigger, Q</b> - Double Speed
            </li>
            <li>
              <b>Special, Space</b> - Play / Pause
            </li>
          </ul>
          <h3>Game Boy Controls:</h3>
          <ul>
            <li>
              <b>Arrow Keys or WASD</b> - D-Pad (Up/Down/Left/Right)
            </li>
            <li>
              <b>Z</b> - A Button
            </li>
            <li>
              <b>X</b> - B Button
            </li>
            <li>
              <b>Enter</b> - Start
            </li>
            <li>
              <b>Shift</b> - Select
            </li>
          </ul>
        </div>
        <h2>How to report bugs / suggestions</h2>
        <div>
          For issues specific to this Compiler Explorer fork, please file them at the{' '}
          <a href="https://github.com/compiler-explorer/wasmboy/issues" target="_blank">
            Compiler Explorer WasmBoy fork
          </a>
          . For general WasmBoy issues, please use the{' '}
          <a href="https://github.com/torch2424/wasmBoy/issues" target="_blank">
            original WasmBoy repository
          </a>
          .
        </div>
      </div>
    );
  }
}
