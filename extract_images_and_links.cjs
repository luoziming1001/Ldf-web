const fs = require('fs');
const content = fs.readFileSync('temp_index.js', 'utf8');

// Find all URLs starting with http/https
const urls = content.match(/https?:\/\/[^\s"'`]+/g) || [];
console.log(`Found ${urls.length} URLs`);
const uniqueUrls = Array.from(new Set(urls));
console.log(`Unique URLs (${uniqueUrls.length}):`);
fs.writeFileSync('urls.txt', uniqueUrls.join('\n'));
console.log('Saved to urls.txt');
