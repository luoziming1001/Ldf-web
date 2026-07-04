const fs = require('fs');
const content = fs.readFileSync('temp_index.js', 'utf8');

// Match sequences of Chinese characters and adjacent punctuation/letters
const matches = content.match(/[\u4e00-\u9fa5]+[^\u4e00-\u9fa5]{0,20}[\u4e00-\u9fa5]*/g);
if (matches) {
  console.log(`Found ${matches.length} matches`);
  const unique = Array.from(new Set(matches)).filter(s => s.length > 2);
  console.log(`Unique matches: ${unique.length}`);
  fs.writeFileSync('chinese_strings.txt', unique.join('\n'));
  console.log('Saved to chinese_strings.txt');
} else {
  console.log('No Chinese found');
}
