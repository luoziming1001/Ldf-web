const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

console.log('--- END OF APP CODE ---');
console.log(content.substring(42000, content.length));
