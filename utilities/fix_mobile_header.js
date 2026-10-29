const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'wp-content', 'themes', 'muop-dang', 'assets', 'css', 'main.css');
let css = fs.readFileSync(cssPath, 'utf8').replace(/\r\n/g, '\n');

const oldBlock = `@media (max-width: 768px) {
  .brand-logo.brand-avatar {
    width: 40px !important;
    height: 40px !important;
  }
  .brand-title-styled {
    font-size: 16px !important;
  }
  .brand-slogan-styled {
    font-size: 8px !important;
    letter-spacing: 0.8px !important;
  }
}`;

const newBlock = `@media (max-width: 768px) {
  /* Giao diện mobile: chỉ hiện logo avatar tròn Tiệm Trà Hoa Đào, ẩn phần chữ trên header top để tránh chèn ép nút */
  .header-top .brand-wrapper .brand-text {
    display: none !important;
  }
  .header-top .brand-wrapper {
    gap: 0 !important;
  }
  .brand-logo.brand-avatar {
    width: 42px !important;
    height: 42px !important;
  }
}`;

if (css.includes(oldBlock)) {
    css = css.replace(oldBlock, newBlock);
    fs.writeFileSync(cssPath, css.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated main.css for mobile header!');
} else {
    // If oldBlock not matched exactly, append
    css += '\n' + newBlock;
    fs.writeFileSync(cssPath, css.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Appended mobile header rule to main.css!');
}

// Also bump theme version in functions.php and header.php so browser cache updates immediately
const funcPath = path.join(__dirname, '..', 'wp-content', 'themes', 'muop-dang', 'functions.php');
let func = fs.readFileSync(funcPath, 'utf8').replace(/\r\n/g, '\n');
func = func.replace(/define\('MUOP_THEME_VERSION',\s*'[^']+'\);/, `define('MUOP_THEME_VERSION', '4.0.2');`);
fs.writeFileSync(funcPath, func.replace(/\n/g, '\r\n'), 'utf8');
console.log('Bumped theme version to 4.0.2 in functions.php');
