const fs = require('fs');
const path = require('path');

const files = [
    path.join(__dirname, '..', 'database.sql'),
    path.join(__dirname, '..', 'backup_latest.sql'),
    path.join(__dirname, '..', 'database_sync_full.sql'),
    path.join(__dirname, '..', '..', 'web_truyen_wp', 'database.sql'),
    path.join(__dirname, '..', '..', 'web_truyen_wp', 'backup_latest.sql')
];

files.forEach(f => {
    if (fs.existsSync(f)) {
        const raw = fs.readFileSync(f);
        const text = raw.toString('utf8');
        const hasCorrupted = text.includes('뻈') || text.includes('붿') || text.includes('뿯');
        const hasVietnamese = text.includes('Truyện') || text.includes('ngôn tình') || text.includes('thể loại') || text.includes('Cổ trang');
        console.log(f, 'size:', raw.length, 'hasCorrupted:', hasCorrupted, 'hasVietnamese:', hasVietnamese);
        
        // Find sample post titles
        const match = text.match(/INSERT INTO `wp_posts` VALUES \([^;]+\);/);
        if (match) {
            console.log('Sample from wp_posts in', path.basename(f), ':', match[0].slice(0, 200));
        }
        
        // Find sample terms
        const termMatch = text.match(/INSERT INTO `wp_terms` VALUES \([^;]+\);/);
        if (termMatch) {
            console.log('Sample from wp_terms in', path.basename(f), ':', termMatch[0].slice(0, 200));
        }
    } else {
        console.log('Not found:', f);
    }
});

