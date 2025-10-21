# Quick Screenshot Tool

A browser extension that automatically takes screenshots and searches them on Google Images with a single keyboard shortcut (Ctrl+I). Perfect for finding products from social media posts!

## Features

- **One-Click Workflow**: Press `Ctrl+I` → Drag to select → Automatic Google search
- **Smart Navigation**: Automatically opens Google Images and clicks "Search by image"
- **Real Clipboard Integration**: Uses Clipboard API to paste actual image data
- **Cross-Platform**: Works on all major social media platforms and websites
- **Zero Manual Steps**: No manual pasting or navigation required

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

1. **Take Screenshot**
   - Press `Ctrl+I` (Windows/Linux) or `Cmd+I` (Mac)
   - The screen will darken with a crosshair cursor
   - Click and drag to select the area you want to search

2. **Automatic Magic Happens**
   - Screenshot is captured and copied to clipboard
   - Extension automatically navigates to Google Images
   - "Search by image" button is clicked automatically
   - Your image is pasted into the upload dialog
   - Google starts searching for similar images immediately!

3. **View Results**
   - Google shows similar images and products
   - Find the exact item you were looking for
   - Click on results to visit product pages

## Keyboard Shortcuts

- `Ctrl+I` / `Cmd+I`: Take screenshot and auto-search
- `Escape`: Cancel screenshot mode

## Perfect For

- **Social Media Shopping**: Find products from Instagram, TikTok, Facebook posts
- **Fashion Discovery**: Identify clothing, shoes, accessories from images
- **Product Research**: Find similar items or better prices
- **Reverse Image Search**: Discover the source of any image
- **Shopping Inspiration**: Turn any image into a shopping search

## Troubleshooting

### Extension Not Working?
- Make sure you've granted all permissions (especially clipboard access)
- Try refreshing the page after installing
- Check that the extension is enabled in `chrome://extensions/`

### Screenshot Not Working?
- Ensure you have clipboard permissions
- Try selecting a larger area (minimum 10x10 pixels)
- Check if your browser supports the Clipboard API

### Google Images Not Opening?
- The extension automatically navigates to Google Images
- If it doesn't work, manually go to images.google.com and try again
- Make sure you're not blocking pop-ups or redirects

## Technical Details

- **Manifest Version**: 3 (latest Chrome extension standard)
- **Permissions**: activeTab, clipboardWrite, storage
- **Clipboard API**: Uses modern browser APIs for real image pasting
- **Compatibility**: Chrome, Edge, Brave, and other Chromium-based browsers
- **File Size**: < 15KB total

## Privacy & Security

- **No data collection**: No information is transmitted or stored
- **Local processing**: All screenshot and search operations happen locally
- **Clipboard only**: Images are only stored temporarily in your clipboard
- **No tracking**: Extension doesn't track your browsing or searches

## Supported Platforms

Works perfectly on all major social media and shopping platforms:
- **Instagram** - Find products from posts and stories
- **TikTok** - Discover items from videos
- **Facebook** - Search marketplace and posts
- **Twitter/X** - Find products from tweets
- **YouTube** - Identify items from videos
- **Pinterest** - Discover similar pins
- **Any website** - Works on any image you can see

## Support

For issues or questions:
1. Check browser console (F12 → Console) for error messages
2. Ensure all permissions are granted
3. Try refreshing the page and retrying
4. Make sure you're using a supported browser (Chrome, Edge, Brave)

The extension is designed to work seamlessly - if something isn't working, it's usually a permission or browser compatibility issue.
