# ROM Data URL Parameter

This feature allows passing ROM data directly via URL hash parameters, enabling users to share games without hosting the ROM files.

## URL Format

```
https://static.ce-cdn.net/wasmboy/iframe/index.html#rom-data=<base64-encoded-rom>&rom-name=<optional-name>
```

## Implementation Details

- ROM data is passed via URL hash fragment (`#`) instead of query parameters (`?`)
- Hash fragments are never sent to the server, keeping ROM data private
- Supports base64-encoded Game Boy ROM files (.gb, .gbc)
- Falls back to `rom-url` parameter if no `rom-data` is provided

## Usage Example

```javascript
// Convert ROM to base64
const romBytes = new Uint8Array(romBuffer);
let binary = '';
for (let i = 0; i < romBytes.length; i += 0x8000) {
  const chunk = romBytes.subarray(i, i + 0x8000);
  binary += String.fromCharCode.apply(null, chunk);
}
const base64 = btoa(binary);

// Create shareable URL
const url = `https://static.ce-cdn.net/wasmboy/iframe/index.html#rom-data=${encodeURIComponent(base64)}&rom-name=MyGame.gb`;
```

## Benefits

1. **Privacy**: ROM data stays in the browser
2. **No hosting required**: Games can be shared without file hosting
3. **Compiler Explorer compatible**: Matches the pattern used by viciious

## Limitations

- Browser URL length limits (typically 2MB+)
- Base64 encoding increases size by ~33%
- Large ROMs may not work in all browsers
