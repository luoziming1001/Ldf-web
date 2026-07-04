const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

const keywords = ['.client', '.role', '.date', '.description', '.concept', '.tools', '.stats'];
keywords.forEach(keyword => {
  let index = 0;
  while ((index = content.indexOf(keyword, index)) !== -1) {
    console.log(`Keyword "${keyword}" found at index ${index}`);
    const start = Math.max(0, index - 300);
    const end = Math.min(content.length, index + 300);
    console.log(`--- CHUNK ---`);
    console.log(content.substring(start, end));
    console.log('-------------\n');
    index += keyword.length;
  }
});
