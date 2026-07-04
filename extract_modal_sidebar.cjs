const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

// Find occurrences of key tags like Client, Role, etc. in the JSX code
const index = content.indexOf('client');
if (index !== -1) {
  console.log(`Found "client" in custom_app_code.txt at ${index}`);
  const start = Math.max(0, index - 500);
  const end = Math.min(content.length, index + 3500);
  console.log('--- MODAL SIDEBAR SECTION ---');
  console.log(content.substring(start, end));
} else {
  console.log('Could not find "client" in custom_app_code.txt');
}
