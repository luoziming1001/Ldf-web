const fs = require('fs');
const content = fs.readFileSync('temp_index.js', 'utf8');

// Search for keywords and find their indices
const keywords = ['aether', 'orcus', 'moss', 'vert'];
keywords.forEach(keyword => {
  let index = 0;
  while ((index = content.indexOf(keyword, index)) !== -1) {
    console.log(`Keyword "${keyword}" found at index ${index}`);
    // Extract a chunk of 1000 characters before and after
    const start = Math.max(0, index - 500);
    const end = Math.min(content.length, index + 2500);
    const chunk = content.substring(start, end);
    console.log(`--- CHUNK FOR "${keyword}" ---`);
    console.log(chunk);
    console.log('-----------------------------\n');
    index += keyword.length;
  }
});
