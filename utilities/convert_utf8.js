const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const files = ['database.sql', 'backup_latest.sql', 'database_sync_full.sql', 'update_database_hosting.sql'];

files.forEach(fileName => {
    const filePath = path.join(rootDir, fileName);
    if (!fs.existsSync(filePath)) return;

    let text = fs.readFileSync(filePath, 'utf8');

    // Find first standard SQL comment or statement
    const markers = ['-- MariaDB dump', '-- MySQL dump', '-- ===========================', '/*!', 'SET '];
    let minIdx = -1;
    for (const m of markers) {
        const idx = text.indexOf(m);
        if (idx !== -1) {
            if (minIdx === -1 || idx < minIdx) {
                minIdx = idx;
            }
        }
    }

    if (minIdx > 0) {
        console.log(`Stripping ${minIdx} garbage characters from start of ${fileName}`);
        text = text.slice(minIdx);
    }

    // Strip BOM
    while (text.charCodeAt(0) === 0xFEFF || text.charCodeAt(0) === 0xFFFE) {
        text = text.slice(1);
    }
    text = text.trimStart();

    // Ensure site title in database.sql is Tiệm Trà Hoa Đào
    text = text.replace(/\(4,'blogname','[^']+','on'\)/g, "(4,'blogname','Tiệm Trà Hoa Đào','on')");
    text = text.replace(/\(5,'blogdescription','[^']*','on'\)/g, "(5,'blogdescription','Góc Truyện & Audio Ngọt Ngào','on')");

    fs.writeFileSync(filePath, text, { encoding: 'utf8' });
    
    // Verify first 50 chars
    console.log(`${fileName} starts with:`, JSON.stringify(text.slice(0, 50)));
});

console.log('All SQL files cleaned and converted to pure UTF-8!');
