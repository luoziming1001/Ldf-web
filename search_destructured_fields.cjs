const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

// Search for destructured properties or usage of englishTitle, concept, tools, stats
const keywords = ['englishTitle', 'concept', 'tools', 'stats'];
keywords.forEach(keyword => {
  let index = 23000; // start after q3 definition
  while ((index = content.indexOf(keyword, index)) !== -1) {
    console.log(`Keyword "${keyword}" found at index ${index}`);
    const start = Math.max(0, index - 300);
    const end = Math.min(content.length, index + 1200);
    console.log(`--- CHUNK ---`);
    console.log(content.substring(start, end));
    console.log('-------------\n');
    index += keyword.length;
  }
});
