// Handle URL parameters for loading ROMs
import loadROM from './loadROM';

export function handleURLParams() {
  // Parse both search params and hash params
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.substring(1));

  // Get ROM parameters (prefer hash over search for sensitive data)
  const romData = decodeURIComponent(hashParams.get('rom-data'));
  const romUrl = hashParams.get('rom-url') || searchParams.get('rom-url');
  const romName = hashParams.get('rom-name') || searchParams.get('rom-name') || 'ROM from URL';

  // If we have ROM data, decode and load it
  if (romData) {
    try {
      // Decode base64 ROM data
      const base64 = romData;
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Load the ROM
      console.log(`Loading ROM from URL data: ${romName}`);
      loadROM(bytes, romName);
    } catch (error) {
      console.error('Error loading ROM from URL data:', error);
    }
  } else if (romUrl) {
    // Load ROM from URL
    console.log(`Loading ROM from URL: ${romUrl}`);
    loadROM(romUrl, romName);
  }
}
