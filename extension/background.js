/**
 * BACKGROUND SERVICE WORKER
 * 
 * This script runs in the background even when popup is closed
 * It's the "heart" of the extension
 * 
 * PURPOSES:
 * 1. Listen for messages from popup/content scripts
 * 2. Handle authentication token storage
 * 3. Manage extension lifecycle events
 * 4. Can perform background tasks
 * 
 * In Manifest V3, this is a "Service Worker" which:
 * - Starts when needed
 * - Stops when idle to save resources
 * - Can be woken up by events
 */

console.log('🎯 DigiBrain background service worker started');

// ========================================
// INSTALLATION EVENT
// ========================================
/**
 * Fires when extension is first installed or updated
 * Good place for one-time setup
 */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('🎉 Extension installed/updated:', details.reason);
  
  if (details.reason === 'install') {
    // First time install
    console.log('👋 Welcome to DigiBrain extension!');
    
    // Could open onboarding page here
    // chrome.tabs.create({ url: 'http://localhost:5173/signup' });
  } else if (details.reason === 'update') {
    // Extension was updated
    console.log('✨ Extension updated to version:', chrome.runtime.getManifest().version);
  }
});

// ========================================
// MESSAGE HANDLER
// ========================================
/**
 * Listens for messages from popup or content scripts
 * This is how different parts of the extension communicate
 * 
 * chrome.runtime.onMessage - Central message hub
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📬 Background received message:', message);
  
  // Handle different message types
  switch (message.action) {
    
    case 'saveToken':
      // Save authentication token to storage
      handleSaveToken(message.token, sendResponse);
      break;
      
    case 'getToken':
      // Retrieve authentication token
      handleGetToken(sendResponse);
      break;
      
    case 'clearToken':
      // Log out - clear token
      handleClearToken(sendResponse);
      break;
      
    default:
      console.log('Unknown action:', message.action);
      sendResponse({ success: false, error: 'Unknown action' });
  }
  
  // Return true to keep message channel open for async response
  return true;
});

// ========================================
// TOKEN MANAGEMENT FUNCTIONS
// ========================================

/**
 * Save authentication token to Chrome storage
 * This persists even when browser closes
 * 
 * chrome.storage.local.set() - Saves data locally
 * Data is private to this extension
 */
async function handleSaveToken(token, sendResponse) {
  try {
    await chrome.storage.local.set({ authToken: token });
    console.log('✅ Token saved successfully');
    sendResponse({ success: true });
  } catch (error) {
    console.error('❌ Error saving token:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Retrieve authentication token from storage
 */
async function handleGetToken(sendResponse) {
  try {
    const result = await chrome.storage.local.get(['authToken']);
    console.log('🔑 Token retrieved');
    sendResponse({ success: true, token: result.authToken });
  } catch (error) {
    console.error('❌ Error getting token:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * Clear authentication token (logout)
 */
async function handleClearToken(sendResponse) {
  try {
    await chrome.storage.local.remove(['authToken']);
    console.log('🗑️ Token cleared');
    sendResponse({ success: true });
  } catch (error) {
    console.error('❌ Error clearing token:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// ========================================
// TAB UPDATE LISTENER (OPTIONAL)
// ========================================
/**
 * You can listen to tab events and react
 * For example: Auto-save bookmarked pages
 * 
 * Uncomment if you want to add features like:
 * - Auto-detect certain websites
 * - Show badge on extension icon
 * - Background sync
 */

/*
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Fires when tab URL changes
  if (changeInfo.status === 'complete' && tab.url) {
    console.log('🔄 Tab updated:', tab.url);
    
    // Example: Show badge if on YouTube
    if (tab.url.includes('youtube.com')) {
      chrome.action.setBadgeText({ text: 'YT', tabId: tabId });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    } else {
      chrome.action.setBadgeText({ text: '', tabId: tabId });
    }
  }
});
*/

// ========================================
// STORAGE CHANGE LISTENER (OPTIONAL)
// ========================================
/**
 * Detect when storage data changes
 * Useful for syncing state across popup/background
 */
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (let key in changes) {
    const storageChange = changes[key];
    console.log(`🔄 Storage key "${key}" changed:`, 
      'Old value:', storageChange.oldValue,
      'New value:', storageChange.newValue
    );
  }
});

// ========================================
// KEEP ALIVE (Optional - Manifest V3)
// ========================================
/**
 * Service workers can be terminated to save resources
 * This keeps it alive if you need persistent connection
 * Usually not needed for simple extensions
 */

// Uncomment if needed:
/*
setInterval(() => {
  console.log('💓 Service worker heartbeat');
}, 20000); // Every 20 seconds
*/
