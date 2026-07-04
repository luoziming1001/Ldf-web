const fs = require('fs');
const content = fs.readFileSync('temp_index.js', 'utf8');

// Search for kc and Mo definitions
const keywords = ['kc', 'Mo', 'cardCustomImages', 'projectCustomGallery'];
keywords.forEach(keyword => {
  let index = 0;
  while ((index = content.indexOf(keyword, index)) !== -1) {
    console.log(`Keyword "${keyword}" found at index ${index}`);
    const start = Math.max(0, index - 300);
    const end = Math.min(content.length, index + 300);
    const chunk = content.substring(start, end);
    console.log(`--- CHUNK ---`);
    console.log(chunk);
    console.log('-------------\n');
    index += keyword.length;
  }
});
