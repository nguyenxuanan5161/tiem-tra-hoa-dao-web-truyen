const fs = require('fs');

const b = fs.readFileSync('backup_latest.sql', 'utf8');
const userMatch = b.match(/INSERT INTO `wp_users` VALUES [^;]+;/);
if (userMatch) {
    console.log('Users in backup_latest.sql:\n', userMatch[0]);
}

const mdFiles = ['README.md', 'HUONG_DAN_CAI_DAT_VA_CHAY_WEB.md', 'DATABASE_SCHEMA.md'];
mdFiles.forEach(f => {
    if (fs.existsSync(f)) {
        console.log(`--- ${f} accounts info ---`);
        const content = fs.readFileSync(f, 'utf8');
        const lines = content.split('\n');
        lines.forEach(l => {
            if (l.toLowerCase().includes('tài khoản') || l.toLowerCase().includes('mật khẩu') || l.toLowerCase().includes('admin') || l.toLowerCase().includes('password')) {
                console.log(l);
            }
        });
    }
});
