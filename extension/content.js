
console.log('🔌 DigiBrain content script loaded');


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content script received message:', message);
  
  if (message.action === 'extractContent') {
    
    const content = extractPageContent();

    sendResponse({
      success: true,
      content: content,
      length: content.length
    });
  }
  
  // Return true to indicate we'll send response asynchronously
  return true;
});


function extractPageContent() {
  try {
    let content = '';
  
    const contentSelectors = [
      'article',          
      'main',             
      '[role="main"]',    
      '.post-content',    
      '.article-content', 
      '.entry-content',   
      '#content',         
      '.content'          
    ];
    
    // Try each selector
    for (const selector of contentSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        content = element.innerText;
        console.log(`✅ Found content using selector: ${selector}`);
        break;
      }
    }
    
    if (!content) {
      const bodyClone = document.body.cloneNode(true);
      
      const elementsToRemove = bodyClone.querySelectorAll(
        'script, style, nav, header, footer, iframe, .menu, .navigation, .sidebar'
      );
      elementsToRemove.forEach(el => el.remove());
      
      content = bodyClone.innerText;
      console.log('📄 Extracted from body (fallback)');
    }
    
    content = content
      .replace(/\s+/g, ' ')      
      .replace(/\n+/g, '\n')     
      .trim();                    
    const maxLength = 5000; 
    if (content.length > maxLength) {
      content = content.substring(0, maxLength) + '...';
      console.log('✂️ Content truncated to', maxLength, 'characters');
    }
    
    console.log('📊 Final content length:', content.length);
    return content;
    
  } catch (error) {
    console.error('❌ Error extracting content:', error);
    return '';
  }
}


function getSpecializedContent() {
  const url = window.location.href;
  
  // YouTube - Get video description
  if (url.includes('youtube.com')) {
    const description = document.querySelector('#description yt-formatted-string');
    if (description) {
      return description.innerText;
    }
  }
  
  // Twitter/X - Get tweet text
  if (url.includes('twitter.com') || url.includes('x.com')) {
    const tweet = document.querySelector('[data-testid="tweetText"]');
    if (tweet) {
      return tweet.innerText;
    }
  }
  
  // LinkedIn - Get post content
  if (url.includes('linkedin.com')) {
    const post = document.querySelector('.feed-shared-update-v2__description');
    if (post) {
      return post.innerText;
    }
  }
  
  return null;
}
