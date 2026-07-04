const fs = require('fs');
const content = fs.readFileSync('temp_index.js', 'utf8');

// Extract from index 335000 to the end of the file
const start = 335000;
const end = content.length;
const extracted = content.substring(start, end);

fs.writeFileSync('custom_app_code.txt', extracted);
console.log(`Extracted ${extracted.length} characters to custom_app_code.txt`);
