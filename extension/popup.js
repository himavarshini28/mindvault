
const BACKEND_URL = 'http://localhost:5000'; 
const APP_URL = 'http://localhost:5173'; 
const notLoggedInDiv = document.getElementById('notLoggedIn');
const loggedInDiv = document.getElementById('loggedIn');
const pageTitleEl = document.getElementById('pageTitle');
const pageUrlEl = document.getElementById('pageUrl');
const tagsInput = document.getElementById('tagsInput');
const typeSelect = document.getElementById('typeSelect');
const saveBtn = document.getElementById('saveBtn');
const saveBtnText = document.getElementById('saveBtnText');
const saveBtnLoader = document.getElementById('saveBtnLoader');
const statusMessage = document.getElementById('statusMessage');
const loginBtn = document.getElementById('loginBtn');


let currentTab = null;
let pageContent = '';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🚀 Popup loaded');
  
  const isLoggedIn = await checkAuth();
  
  if (isLoggedIn) {
    await loadCurrentPageInfo();
  }
});


async function checkAuth() {
  try {
    const result = await chrome.storage.local.get(['authToken']);
    const token = result.authToken;
    
    if (token) {
      console.log('✅ User is logged in');
      notLoggedInDiv.classList.add('hidden');
      loggedInDiv.classList.remove('hidden');
      return true;
    } else {
      console.log('❌ User not logged in');
      notLoggedInDiv.classList.remove('hidden');
      loggedInDiv.classList.add('hidden');
      return false;
    }
  } catch (error) {
    console.error('Error checking auth:', error);
    return false;
  }
}

async function loadCurrentPageInfo() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tabs[0]; // First result is required tab
    
    pageTitleEl.textContent = currentTab.title || 'Untitled';
    pageUrlEl.textContent = currentTab.url || '';
    
    detectType(currentTab.url);
    
    // Extract page content
    await extractPageContent();
    
    console.log('📄 Current page:', currentTab.title);
    console.log('🔗 URL:', currentTab.url);
    
  } catch (error) {
    console.error('Error loading page info:', error);
    pageTitleEl.textContent = 'Error loading page';
    pageUrlEl.textContent = error.message;
  }
}

function detectType(url) {
  if (!url) return;
  
  if (url.includes('youtube.com') || url.includes('youtube')) {
    typeSelect.value = 'youtube';
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    typeSelect.value = 'tweet';
  } else if (url.includes('linkedin.com')) {
    typeSelect.value = 'linkedin';
  } else {
    typeSelect.value = 'others';
  }
}


async function extractPageContent() {
  try {
    // Send message to content script asking for page content
    const response = await chrome.tabs.sendMessage(currentTab.id, {
      action: 'extractContent'
    });
    
    if (response && response.content) {
      pageContent = response.content;
      console.log('📝 Extracted content length:', pageContent.length);
    } else {
      console.log('⚠️ No content extracted');
      pageContent = '';
    }
  } catch (error) {
    
    console.log('Could not extract content:', error.message);
    pageContent = '';
  }
}


saveBtn.addEventListener('click', async () => {
  saveBtn.disabled = true;
  saveBtnText.classList.add('hidden');
  saveBtnLoader.classList.remove('hidden');
  statusMessage.classList.add('hidden');
  
  try {
    // Get auth token from storage
    const result = await chrome.storage.local.get(['authToken']);
    const token = result.authToken;
    
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    console.log('🔑 Token being sent:', token.substring(0, 20) + '...');
    
    // Parse tags (split by comma and trim whitespace)
    const tagsValue = tagsInput.value.trim();
    const tagsArray = tagsValue 
      ? tagsValue.split(',').map(tag => tag.trim()).filter(tag => tag)
      : [];
    
    // Prepare data for API
    const data = {
      link: currentTab.url,
      title: currentTab.title,
      type: typeSelect.value,
      tags: tagsArray,
      content: pageContent 
    };
    
    console.log('📤 Sending to backend:', data);
    
    // Make API call to your backend
    const response = await fetch(`${BACKEND_URL}/api/v1/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(data)
    });
    
    const responseData = await response.json();
    
    if (response.ok) {
      console.log('✅ Saved successfully:', responseData);
      showStatus('✅ Saved to DigiBrain!', 'success');
      
      tagsInput.value = '';
      
      setTimeout(() => {
        window.close();
      }, 1500);
      
    } else {
      throw new Error(responseData.message || 'Failed to save');
    }
    
  } catch (error) {
    console.error('❌ Save error:', error);
    showStatus('❌ Error: ' + error.message, 'error');
  } finally {
    saveBtn.disabled = false;
    saveBtnText.classList.remove('hidden');
    saveBtnLoader.classList.add('hidden');
  }
});

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = type;
  statusMessage.classList.remove('hidden');
}

loginBtn.addEventListener('click', () => {
  chrome.tabs.create({ url: APP_URL });
});
