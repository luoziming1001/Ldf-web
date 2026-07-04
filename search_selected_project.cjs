const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

// We want to find references to the selected project fields, which are likely accessed on some variable in the modal.
// In Y3 (the main Works component), the selected project state is "a". Let's search for "a.title", "a.client", "a.date" etc.
const keywords = ['a.title', 'a.englishTitle', 'a.client', 'a.date', 'a.role', 'a.description', 'a.tags', 'a.stats', 'a.concept', 'a.tools'];
keywords.forEach(keyword => {
  let index = 0;
  while ((index = content.indexOf(keyword, index)) !== -1) {
    console.log(`Keyword "${keyword}" found at index ${index}`);
    const start = Math.max(0, index - 200);
    const end = Math.min(content.length, index + 600);
    console.log(`--- CHUNK ---`);
    console.log(content.substring(start, end));
    console.log('-------------\n');
    index += keyword.length;
  }
});
