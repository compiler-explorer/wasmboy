# ROM Data URL Parameter - Debugger

The WasmBoy debugger now supports loading ROMs via URL parameters, including base64-encoded ROM data.

## URL Formats

### Loading ROM from base64 data (recommended):

```
https://wasmboy.compiler-explorer.com/#rom-data=<base64-encoded-rom>&rom-name=<optional-name>
```

### Loading ROM from URL:

```
https://wasmboy.compiler-explorer.com/#rom-url=<url-to-rom>&rom-name=<optional-name>
```

## Features

- **Hash fragments**: Uses `#` instead of `?` to keep ROM data private (not sent to server)
- **Base64 support**: Embed entire ROM files in the URL
- **URL support**: Load ROMs from external URLs (subject to CORS)
- **Auto-load**: ROMs are automatically loaded when the debugger starts

## Example Usage

```javascript
// Convert ROM to base64
const romBytes = new Uint8Array(romBuffer);
let binary = '';
for (let i = 0; i < romBytes.length; i += 0x8000) {
  const chunk = romBytes.subarray(i, i + 0x8000);
  binary += String.fromCharCode.apply(null, chunk);
}
const base64 = btoa(binary);

// Create shareable debugger URL
const url = `https://wasmboy.compiler-explorer.com/#rom-data=${encodeURIComponent(base64)}&rom-name=MyGame.gb`;
```

## Benefits for Compiler Explorer

This feature enables Compiler Explorer to:

1. Link directly to the debugger with compiled Game Boy programs
2. Avoid hosting ROM files separately
3. Provide full debugging capabilities for compiler output
4. Share examples without permanent storage

## Debugging Features Available

When a ROM is loaded via URL parameters, users have access to:

- CPU state inspection
- Memory viewer
- Graphics debugging (tiles, sprites, palettes)
- Audio debugging
- Breakpoints
- Disassembler
- Save states
- And all other debugger features
