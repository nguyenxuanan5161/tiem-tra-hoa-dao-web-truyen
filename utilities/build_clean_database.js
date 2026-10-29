const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const srcPath = path.join(__dirname, '../backup_latest.sql');
const dstPath = path.join(__dirname, '../database.sql');

console.log('Reading:', srcPath);
let sql = fs.readFileSync(srcPath, 'utf8');

// Ensure no UTF-8 BOM
if (sql.charCodeAt(0) === 0xFEFF) {
  sql = sql.slice(1);
}

// 1. Password hash for 'MatKhau@123'
const md5Pass = crypto.createHash('md5').update('MatKhau@123').digest('hex'); // ab5e7425654f30d55682bab2eec18a48
console.log('MD5 for MatKhau@123:', md5Pass);

// 2. Replace wp_users dump with clean accounts and passwords
const oldUsersMatch = sql.match(/LOCK TABLES `wp_users` WRITE;[\s\S]*?UNLOCK TABLES;/);
if (!oldUsersMatch) {
  throw new Error('wp_users block not found in backup_latest.sql');
}

const newUsersBlock = `LOCK TABLES \`wp_users\` WRITE;
/*!40000 ALTER TABLE \`wp_users\` DISABLE KEYS */;
INSERT INTO \`wp_users\` VALUES 
(1,'admin','${md5Pass}','admin','admin@tiemtrahoadao.vn','http://162.4.176.220','2026-10-07 11:52:36','',0,'Tiệm Trà Hoa Đào'),
(2,'dichgia_muop','${md5Pass}','dichgia_muop','dichgia@tiemtrahoadao.vn','','2026-10-07 12:08:40','',0,'Tiểu Hoa Đào'),
(3,'dichgia_bocute','${md5Pass}','dichgia_bocute','bo@tiemtrahoadao.vn','','2026-10-07 12:08:40','',0,'Team Hoa Đào Xinh'),
(4,'docgia_linh','${md5Pass}','docgia_linh','docgia@tiemtrahoadao.vn','','2026-10-07 12:08:40','',0,'Thùy Linh Mọt Sách'),
(5,'docgia_minh','${md5Pass}','docgia_minh','minh@tiemtrahoadao.vn','','2026-10-07 12:08:40','',0,'Minh Hoàng Zhihu'),
(6,'ngockha24052001','${md5Pass}','ngockha24052001','ngockha24052001@gmail.com','','2026-10-08 11:58:48','',0,'Ngọc Kha');
/*!40000 ALTER TABLE \`wp_users\` ENABLE KEYS */;
UNLOCK TABLES;`;

sql = sql.replace(oldUsersMatch[0], newUsersBlock);

// 3. Make user 6 (ngockha24052001) also administrator in wp_usermeta
sql = sql.replace(
  `'locale',''),(98,6,'wp_capabilities','a:1:{s:7:\\"doc_gia\\";b:1;}'),(99,6,'wp_user_level','0')`,
  `'locale',''),(98,6,'wp_capabilities','a:1:{s:13:\\"administrator\\";b:1;}'),(99,6,'wp_user_level','10')`
);

// 4. Update siteurl & home in wp_options to VPS IP
sql = sql.replace(/\(2,'siteurl','[^']*','yes'\)/g, "(2,'siteurl','http://162.4.176.220/core','yes')");
sql = sql.replace(/\(3,'home','[^']*','yes'\)/g, "(3,'home','http://162.4.176.220','yes')");
sql = sql.replace(/\(4,'blogname','[^']*','yes'\)/g, "(4,'blogname','Tiệm Trà Hoa Đào','yes')");
sql = sql.replace(/\(5,'blogdescription','[^']*','yes'\)/g, "(5,'blogdescription','Góc Truyện & Audio Ngọt Ngào','yes')");

// Also check template / stylesheet options
sql = sql.replace(/\(41,'template','[^']*','yes'\)/g, "(41,'template','muop-dang','yes')");
sql = sql.replace(/\(42,'stylesheet','[^']*','yes'\)/g, "(42,'stylesheet','muop-dang','yes')");

// 5. Replace any remaining domain references if desired
sql = sql.replace(/https:\/\/muopdangcungcovingot\.io\.vn\/core/g, 'http://162.4.176.220/core');
sql = sql.replace(/https:\/\/muopdangcungcovingot\.io\.vn/g, 'http://162.4.176.220');

// Write out database.sql with pure UTF-8 without BOM
fs.writeFileSync(dstPath, sql, { encoding: 'utf8' });
console.log('Successfully generated database.sql! File size:', fs.statSync(dstPath).size);

// Verify sanity
const termsLine = sql.split(/\r?\n/).find(l => l.includes("INSERT INTO `wp_terms`"));
console.log('wp_terms sample:', termsLine ? termsLine.substring(0, 160) : 'NOT FOUND');
