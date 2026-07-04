const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

let idx = 0;
while ((idx = content.indexOf('englishTitle', idx)) !== -1) {
  console.log('Found englishTitle at', idx);
  idx += 12;
}
