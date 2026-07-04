const fs = require('fs');
const content = fs.readFileSync('custom_app_code.txt', 'utf8');

// Search for modal sidebar layout (e.g., matching text like "Client", "client", "client:" or "role:")
let idx = 0;
while ((idx = content.indexOf('client', idx)) !== -1) {
  console.log(`Found "client" at ${idx}`);
  if (idx > 22000) { // skip the definition in q3 array
    const start = Math.max(0, idx - 400);
    const end = Math.min(content.length, idx + 1200);
    console.log(`--- CHUNK AT ${idx} ---`);
    console.log(content.substring(start, end));
    console.log('---------------------\n');
  }
  idx += 6;
}

// Search for other key elements of the details modal, e.g. "client" in lower or upper case, or project info
let idx2 = 0;
while ((idx2 = content.indexOf('client:', idx2)) !== -1) {
  console.log(`Found "client:" at ${idx2}`);
  idx2 += 7;
}
