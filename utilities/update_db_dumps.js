const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
['database.sql', 'backup_latest.sql', 'database_sync_full.sql'].forEach(file => {
    const p = path.join(rootDir, file);
    if (fs.existsSync(p)) {
        let c = fs.readFileSync(p, 'utf8');
        c = c.replace(/\(4,'blogname','[^']+','on'\)/g, "(4,'blogname','Ti\u1ec7m Tr\u00e0 Hoa \u0110\u00e0o','on')");
        c = c.replace(/\(5,'blogdescription','[^']*','on'\)/g, "(5,'blogdescription','G\u00f3c Truy\u1ec7n & Audio Ng\u1ecdt Ng\u00e0o','on')");
        fs.writeFileSync(p, c, 'utf8');
        console.log('Updated', file);
    }
});

