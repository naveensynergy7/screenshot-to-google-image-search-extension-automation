# Quick Screenshot Tool

A browser extension that allows you to take screenshots with a simple keyboard shortcut (Ctrl+I) and copy them directly to your clipboard for easy Google Image search.

## Features

- **Quick Activation**: Press `Ctrl+I` (or `Cmd+I` on Mac) to start screenshot mode
- **Drag to Select**: Click and drag to create a rectangular selection area
- **Clipboard Integration**: Screenshots are automatically copied to your clipboard
- **Visual Feedback**: Clear visual indicators during screenshot mode
- **Cross-Platform**: Works on all major social media platforms and websites

## Installation

### For Chrome/Chromium-based browsers:

1. **Download the Extension Files**
   - Make sure all files are in the same folder:
     - `manifest.json`
     - `background.js`
     - `content.js`
     - `content.css`

2. **Load the Extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in the top right)
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

3. **Grant Permissions**
   - The extension will request permissions for:
     - Access to active tabs
     - Clipboard write access
     - Storage access
   - Click "Allow" when prompted

## How to Use

1. **Activate Screenshot Mode**
   - Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
   - The screen will darken with a crosshair cursor

2. **Select Area**
   - Click and drag to create a rectangular selection
   - The selected area will be highlighted in blue
   - Release the mouse button to capture

3. **Screenshot is Copied**
   - The screenshot is automatically copied to your clipboard
   - You'll see a success notification
   - You can now paste it anywhere (Ctrl+V)

4. **Use with Google Images**
   - Go to [Google Images](https://images.google.com)
   - Click the camera icon in the search bar
   - Paste your screenshot (Ctrl+V)
   - Google will search for similar images

## Keyboard Shortcuts

- `Ctrl+I` / `Cmd+I`: Start screenshot mode
- `Escape`: Cancel screenshot mode

## Troubleshooting

### Extension Not Working?
- Make sure you've granted all permissions
- Try refreshing the page after installing
- Check that the extension is enabled in `chrome://extensions/`

### Screenshot Not Copied?
- Ensure you have clipboard permissions
- Try selecting a larger area (minimum 10x10 pixels)
- Check if your browser supports the Clipboard API

### Performance Issues?
- The extension uses minimal resources
- If you experience lag, try closing other tabs
- The overlay is automatically removed after use

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: activeTab, clipboardWrite, storage
- **Compatibility**: Chrome, Edge, Brave, and other Chromium-based browsers
- **File Size**: < 10KB total

## Privacy

- No data is collected or transmitted
- Screenshots are only stored temporarily in your clipboard
- All processing happens locally in your browser

## Support

This extension works on all websites including:
- Instagram
- Facebook
- Twitter/X
- TikTok
- YouTube
- Pinterest
- And any other website

For issues or feature requests, check the extension files for any errors in the browser console (F12 → Console tab).
