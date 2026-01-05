# 🧠 DigiBrain Chrome Extension

## 📚 What You Just Built

Congratulations! You've created a Chrome extension that:
- ✅ Captures any webpage with one click
- ✅ Auto-extracts page title and content
- ✅ Integrates with your existing DigiBrain backend
- ✅ Handles authentication securely
- ✅ Allows optional tags

## 🏗️ Architecture Overview

```
User clicks extension icon
        ↓
    popup.html opens (UI)
        ↓
    popup.js runs
        ↓
    Checks auth (chrome.storage)
        ↓
    Gets current tab (chrome.tabs API)
        ↓
    Sends message to content.js
        ↓
    content.js extracts page text
        ↓
    User clicks save
        ↓
    POST to your backend API
        ↓
    Saved in MongoDB!
```

## 🔑 Key Concepts You Learned

### 1. **Manifest.json**
The config file that defines your extension's capabilities, permissions, and entry points.

### 2. **Chrome APIs Used**
- `chrome.tabs` - Access tab information
- `chrome.storage` - Save data locally
- `chrome.runtime` - Message passing between scripts
- `chrome.scripting` - Inject code into pages

### 3. **Extension Components**
- **Popup**: UI shown when icon is clicked
- **Content Script**: Runs on webpages, accesses DOM
- **Background Script**: Persistent service worker
- **Manifest**: Configuration blueprint

### 4. **Message Passing**
Different parts of extension communicate via message passing:
```javascript
// Send from popup
chrome.tabs.sendMessage(tabId, { action: 'extractContent' })

// Receive in content script
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Handle message
  sendResponse({ data: 'response' })
})
```

## 🚀 Installation Steps

### 1. **Add Icons** (Required)
You need 3 icon sizes. Create simple icons or use these steps:

**Quick option**: Use any PNG image and resize to:
- 16x16px (toolbar)
- 48x48px (extension page)
- 128x128px (Chrome Web Store)

Save as:
- `extension/icons/icon16.png`
- `extension/icons/icon48.png`
- `extension/icons/icon128.png`

**Or use an online tool**: 
- Go to favicon.io or flaticon.com
- Search "brain icon"
- Download and resize

### 2. **Load Extension in Chrome**

1. Open Chrome and go to: `chrome://extensions/`

2. Enable **Developer Mode** (toggle in top right)

3. Click **"Load unpacked"**

4. Select the `extension` folder (`d:\mindvault-1\extension`)

5. Your extension appears! 🎉

### 3. **Test It**

1. Make sure your backend is running: `cd server && npm run dev`
2. Make sure your frontend is running: `cd client && npm run dev`
3. Log in to your DigiBrain web app
4. Visit any webpage
5. Click the extension icon
6. Add optional tags
7. Click "Save to DigiBrain"
8. Check your dashboard - it should appear!

## 🔐 Authentication Flow

**First-time setup**: Since the extension uses Chrome storage (separate from website cookies), you need to set the auth token.

### Option 1: Auto-login from Web App (Recommended)
We'll add a feature where logging into the web app automatically saves token to extension.

Add this to your web app after login:
```javascript
// After successful login
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.sendMessage(
    'YOUR_EXTENSION_ID', 
    { action: 'saveToken', token: authToken }
  )
}
```

### Option 2: Manual Setup (For Testing)
1. Open extension popup
2. Open Chrome DevTools (right-click popup → Inspect)
3. In console, run:
```javascript
chrome.storage.local.set({ authToken: 'your-jwt-token-here' })
```

## 🐛 Debugging Tips

### View Console Logs

**Popup Console**:
1. Right-click extension icon → "Inspect popup"
2. Console tab shows popup.js logs

**Background Console**:
1. Go to `chrome://extensions/`
2. Find your extension
3. Click "service worker" link
4. Console shows background.js logs

**Content Script Console**:
1. Open any webpage
2. Open DevTools (F12)
3. Console shows content.js logs

### Common Issues

**❌ "Extension not found"**
- Make sure you loaded the extension folder correctly
- Check manifest.json has no syntax errors

**❌ "Not authenticated"**
- Set auth token in storage (see Authentication Flow above)
- Check token format matches your backend

**❌ "Cannot extract content"**
- Content script might not load on some protected pages (chrome://, etc.)
- Check content.js console for errors

**❌ "CORS error"**
- Add extension origin to backend CORS config
- Or use `host_permissions` in manifest

## 📝 Next Steps & Enhancements

### Phase 2: Advanced Features

1. **Right-click Context Menu**
   - Select text → right-click → "Save to DigiBrain"
   
2. **Keyboard Shortcut**
   - Press Ctrl+Shift+S to quick-save

3. **Badge Notifications**
   - Show count of saved items today

4. **Offline Queue**
   - Save URLs even when offline, sync later

5. **Smart Suggestions**
   - Auto-suggest tags based on content

6. **Quick Search**
   - Search your DigiBrain from extension

### Want to Implement Any of These?
Let me know which feature interests you and I'll guide you through it!

## 📚 Learning Resources

- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)
- [Chrome APIs Reference](https://developer.chrome.com/docs/extensions/reference/)

## 🎓 What You Should Understand

Try to answer these (check the code if stuck):

1. What's the difference between content scripts and popup scripts?
2. Why do we need message passing?
3. How does chrome.storage differ from localStorage?
4. When does the background service worker wake up?
5. What are content_scripts "matches" in manifest?

**Answers are in the code comments!** Re-read the files to cement your understanding.

---

## 🤝 Ready for the Next Phase?

You now have a working extension! Here's what we can do next:

1. **Test the current version** - Try it out and report any issues
2. **Add auto-login sync** - Make web app save token to extension automatically
3. **Enhance content extraction** - Better parsing for specific sites
4. **Add advanced features** - Any of the Phase 2 items above
5. **Publish to Chrome Web Store** - Make it public!

What would you like to work on next?
