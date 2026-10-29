const fs = require('fs');

const d = fs.readFileSync('database_sync_full.sql', 'utf8').split('\n');
const dIns = d.find(l => l.startsWith('INSERT INTO `wp_posts`'));
if (dIns) {
    console.log('database_sync_full length:', dIns.length);
    const matches = dIns.match(/'[^']{4,60}'/g);
    console.log('Sample strings in database_sync_full:', matches ? matches.slice(0, 15) : 'none');
} else {
    console.log('No INSERT INTO wp_posts in database_sync_full');
}
