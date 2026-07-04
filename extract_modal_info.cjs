const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

// Find where q3 is used (q3 is the array of projects)
let idx = 0;
while ((idx = content.indexOf('q3', idx)) !== -1) {
  console.log(`Found "q3" at ${idx}`);
  const start = Math.max(0, idx - 200);
  const end = Math.min(content.length, idx + 1000);
  console.log('--- CHUNK ---');
  console.log(content.substring(start, end));
  console.log('-------------\n');
  idx += 2;
}
