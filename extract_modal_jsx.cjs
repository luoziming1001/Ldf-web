const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

const target = 'works-detail-modal-overlay';
const idx = content.indexOf(target);
if (idx !== -1) {
  console.log(`Found "${target}" at ${idx}`);
  console.log('--- MODAL DETAILS JSX ---');
  console.log(content.substring(idx - 100, idx + 8000));
} else {
  console.log('Could not find modal container target');
}
