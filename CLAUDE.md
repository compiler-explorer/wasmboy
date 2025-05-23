# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WasmBoy is a Game Boy/Game Boy Color emulator written in WebAssembly using AssemblyScript. The project has three main components:

- **Core**: WebAssembly emulator core written in AssemblyScript
- **Library**: JavaScript wrapper that provides the API for consuming applications
- **Demo Apps**: Example applications (debugger, benchmark, iframe embed)

## Essential Commands

### Development

```bash
# Start development with file watchers (WASM version)
npm start

# Start development with TypeScript/JavaScript version
npm start:ts

# Build everything (core + library)
npm run build

# Build only the WASM core
npm run core:build

# Build only the JavaScript library
npm run lib:build
```

### Testing

```bash
# Run accuracy tests (test ROMs)
npm test

# Run performance benchmarks
npm run test:perf

# Run integration tests
npm run test:integration

# Run core-specific tests (save states)
npm run test:core
```

### Code Quality

```bash
# Format code with Prettier
npm run prettier

# Check formatting without fixing
npm run prettier:lint

# Type check core TypeScript
npm run core:build:ts:measure
```

### Demo Applications

```bash
# Run the debugger application
npm run debugger:watch

# Run the benchmark application
npm run benchmark:watch

# Run the iframe embed demo
npm run iframe:watch
```

## Architecture Overview

### Core Emulator (`/core`)

The core emulator is written in AssemblyScript and compiles to WebAssembly. Key modules:

- **CPU** (`cpu/`): 8-bit Z80-like processor emulation with instruction decoding and execution
- **Graphics** (`graphics/`): PPU (Picture Processing Unit) for rendering backgrounds, sprites, and managing the LCD
- **Sound** (`sound/`): APU (Audio Processing Unit) with 4 audio channels
- **Memory** (`memory/`): Memory management including ROM/RAM banking, DMA transfers, and memory-mapped I/O
- **Interrupts** (`interrupts/`): Interrupt handling (VBlank, LCD, Timer, Serial, Joypad)
- **Timers** (`timers/`): Timer and divider register implementation
- **Joypad** (`joypad/`): Input handling for Game Boy controls

The core exports functions that are called from JavaScript to step the emulator, handle input, and retrieve frame/audio data.

### JavaScript Library (`/lib`)

The library provides a high-level API and handles:

- **Web Workers**: Parallelized rendering and audio processing
- **Graphics Rendering**: Canvas management and frame buffer transfers
- **Audio Processing**: Web Audio API integration with proper timing
- **State Management**: Save states and in-game saves using IndexedDB
- **Controller Input**: Keyboard and gamepad support via responsive-gamepad

### Build System

- **Rollup**: Multiple configurations for different build targets
- **AssemblyScript Compiler (asc)**: Compiles TypeScript-like code to WebAssembly
- **Build Targets**:
  - WASM builds: High-performance WebAssembly version
  - TypeScript builds: Pure JavaScript version for compatibility/debugging
  - Both versions share the same API surface

### Key Design Patterns

1. **Worker-based Architecture**: Graphics, audio, and controller processing run in separate Web Workers for performance
2. **Memory Layout**: Direct memory access patterns optimized for WebAssembly performance
3. **Configurable Performance Options**: Users can disable features (e.g., audio channels, graphics layers) for better performance on low-end devices
4. **Portable Core**: The core can run in both browser and Node.js environments

## Development Workflow

1. The core emulator logic is in `/core` (AssemblyScript)
2. The JavaScript API wrapper is in `/lib`
3. During development, use `npm start` to watch both core and lib directories
4. Changes to core files trigger a WebAssembly rebuild
5. The debugger (`npm run debugger:watch`) is useful for testing changes visually
6. Run accuracy tests (`npm test`) to ensure emulation correctness

## Important Notes

- The project is still pre-1.0, so expect some inaccuracies in emulation
- Test ROMs are located in `/test/accuracy/testroms/` for validation
- The debugger application provides detailed views of CPU state, memory, graphics tiles, and more
- Performance can be tested using the benchmark application with various Game Boy ROMs
