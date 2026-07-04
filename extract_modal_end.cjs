const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

let idx = 30000;
while ((idx = content.indexOf('col-span', idx)) !== -1) {
  console.log(`Found col-span at ${idx}`);
  const start = Math.max(0, idx - 150);
  const end = Math.min(content.length, idx + 450);
  console.log(`--- CHUNK ---`);
  console.log(content.substring(start, end));
  console.log('-------------\n');
  idx += 8;
}
