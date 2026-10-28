const fs = require('fs');
const path = require('path');

const THEME_DIR = path.join(__dirname, '..', 'wp-content', 'themes', 'muop-dang');

// 1. UPDATE footer.php brand
const footerPath = path.join(THEME_DIR, 'footer.php');
let footerContent = fs.readFileSync(footerPath, 'utf8');

// Normalize line endings to \n
footerContent = footerContent.replace(/\r\n/g, '\n');

const footerRegex = /<div class="footer-brand">[\s\S]*?<\/div>\s*<\/div>\s*<div class="footer-bottom">/;
const newFooterBrand = `<div class="footer-brand">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="brand-wrapper footer-brand-wrapper" title="<?php bloginfo('name'); ?>">
                    <div class="brand-logo brand-avatar" style="width: 52px; height: 52px;">
                        <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/images/logo-icon.png?v=4.0'); ?>" alt="Logo Tiệm Trà Hoa Đào" class="brand-icon-img" />
                    </div>
                    <div class="brand-text">
                        <span class="brand-title-styled" style="font-size: 21px;">TIỆM TRÀ HOA ĐÀO</span>
                        <span class="brand-slogan-styled" style="font-size: 9.5px;">Góc Truyện & Audio Ngọt Ngào</span>
                    </div>
                </a>
                <p class="footer-slogan">
                    Tiệm Trà Hoa Đào – nơi thưởng trà và thả mình theo những câu chuyện ngôn tình ngọt ngào, sâu lắng cùng tính năng nghe audio đọc truyện thư thái.
                </p>
            </div>
        </div>

        <div class="footer-bottom">`;

if (footerRegex.test(footerContent)) {
    footerContent = footerContent.replace(footerRegex, newFooterBrand);
    fs.writeFileSync(footerPath, footerContent.replace(/\n/g, '\r\n'), 'utf8');
    console.log('Successfully updated footer.php brand!');
} else {
    console.warn('footerRegex did not match');
}

// 2. UPDATE functions.php:
// Add pre_option_blogname, pre_option_blogdescription and update MUOP_THEME_VERSION to '4.0.0'
const functionsPath = path.join(THEME_DIR, 'functions.php');
let funcContent = fs.readFileSync(functionsPath, 'utf8').replace(/\r\n/g, '\n');

// Update version
funcContent = funcContent.replace(/define\('MUOP_THEME_VERSION',\s*'[^']+'\);/, `define('MUOP_THEME_VERSION', '4.0.0');`);

// Update team checking
if (!funcContent.includes('tiem-tra-hoa-dao')) {
    funcContent = funcContent.replace(
        `$norm = mb_strtolower(trim($team), 'UTF-8');`,
        `$norm = mb_strtolower(trim($team), 'UTF-8');
    if (strpos($norm, 'ti\u1ec7m tr\u00e0') !== false || strpos($norm, 'tiem tra') !== false || strpos($norm, 'hoa \u0111\u00e0o') !== false) {
        return true;
    }`
    );
}

// Add dynamic site title & description filter if not already present
if (!funcContent.includes('tiem_tra_hoa_dao_brand_filters')) {
    const brandFilterCode = `
// ==========================================================================
// TIỆM TRÀ HOA ĐÀO - DYNAMIC SITE BRANDING FILTERS
// ==========================================================================
function tiem_tra_hoa_dao_brand_filters() {
    add_filter('pre_option_blogname', function() {
        return 'Tiệm Trà Hoa Đào';
    }, 999);
    add_filter('pre_option_blogdescription', function() {
        return 'Góc Truyện & Audio Ngọt Ngào';
    }, 999);
}
add_action('after_setup_theme', 'tiem_tra_hoa_dao_brand_filters');
`;
    funcContent = funcContent + brandFilterCode;
    console.log('Added site branding filters to functions.php');
}

// Update anti-crawl decoys
funcContent = funcContent.replace(
    /\[Anti-Crawl Protection by Muop Dang\]/g,
    '[Anti-Crawl Protection by Tiệm Trà Hoa Đào]'
);
funcContent = funcContent.replace(
    /website Mướp Đắng - muopdang\.com/g,
    'website Tiệm Trà Hoa Đào - tiemtrahoadao.io.vn'
);
funcContent = funcContent.replace(
    /website Mướp Đắng!/g,
    'website Tiệm Trà Hoa Đào!'
);
funcContent = funcContent.replace(
    /Quy tắc chặn Crawler & Bot của Mướp Đắng/g,
    'Quy tắc chặn Crawler & Bot của Tiệm Trà Hoa Đào'
);
funcContent = funcContent.replace(
    /\$team_name\s*=\s*'Mướp Đắng Cũng Có Vị Ngọt';/g,
    `$team_name = 'Tiệm Trà Hoa Đào';`
);

fs.writeFileSync(functionsPath, funcContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated functions.php!');

// 3. UPDATE main.css:
// Add sakura background pattern, body radial gradients, brand styling classes, and tweak colors
const cssPath = path.join(THEME_DIR, 'assets', 'css', 'main.css');
let cssContent = fs.readFileSync(cssPath, 'utf8').replace(/\r\n/g, '\n');

// Replace body background
const oldBodyRule = /body\s*\{[\s\S]*?font-family:\s*'Be Vietnam Pro'[\s\S]*?background-color:\s*var\(--bg-body\);[\s\S]*?text-rendering:\s*optimizeLegibility;\s*\}/;

const newBodyRule = `body {
  font-family: 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-body);
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(248, 165, 184, 0.12) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(232, 122, 144, 0.10) 0%, transparent 45%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8A5B8' fill-opacity='0.16'%3E%3C!-- 5-Petal Japanese Sakura Flower 1 --%3E%3Cg transform='translate(40, 40) scale(0.48)'%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(72)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(144)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(216)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='3.5' fill='%23E87A90'/%3E%3C/g%3E%3C!-- Smaller 5-Petal Japanese Sakura Flower 2 --%3E%3Cg transform='translate(110, 105) scale(0.28) rotate(36)'%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(72)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(144)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(216)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='3.5' fill='%23E87A90'/%3E%3C/g%3E%3C!-- Single Floating Sakura Petal --%3E%3Cpath d='M85,32 C82,27 77,22 81,18 C83,16 85,18 86,20 C88,17 91,18 90,21 C91,26 87,31 85,32 Z' transform='scale(0.85)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-repeat: repeat;
  color: var(--text-main);
  line-height: 1.6;
  font-size: 15px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

[data-theme="dark"] body {
  background-image: 
    radial-gradient(circle at 15% 15%, rgba(248, 165, 184, 0.05) 0%, transparent 45%),
    radial-gradient(circle at 85% 85%, rgba(232, 122, 144, 0.04) 0%, transparent 45%),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F8A5B8' fill-opacity='0.06'%3E%3Cg transform='translate(40, 40) scale(0.48)'%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(72)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(144)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(216)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='3.5' fill='%23FFCCD5'/%3E%3C/g%3E%3Cg transform='translate(110, 105) scale(0.28) rotate(36)'%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(72)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(144)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(216)'/%3E%3Cpath d='M0,0 C-10,-15 -14,-28 -5,-35 C-2,-37 0,-34 0,-32 C0,-34 2,-37 5,-35 C14,-28 10,-15 0,0 Z' transform='rotate(288)'/%3E%3Ccircle cx='0' cy='0' r='3.5' fill='%23FFCCD5'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}`;

if (oldBodyRule.test(cssContent)) {
    cssContent = cssContent.replace(oldBodyRule, newBodyRule);
    console.log('Updated body background rule in main.css');
} else {
    console.warn('oldBodyRule did not match in main.css');
}

// Add Brand typography styles to main.css if not present
if (!cssContent.includes('.brand-title-styled')) {
    const brandTypographyCSS = `
/* ==========================================================================
   TIỆM TRÀ HOA ĐÀO - BRAND TYPOGRAPHY & HEADER STYLES
   ========================================================================== */
.brand-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-logo.brand-avatar {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  overflow: hidden;
  border: 2.5px solid #F8CCD8;
  box-shadow: 0 3px 12px rgba(232, 122, 144, 0.22);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFF0F3;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.25s ease;
}

.brand-wrapper:hover .brand-logo.brand-avatar {
  transform: scale(1.06) rotate(-3deg);
  box-shadow: 0 5px 18px rgba(232, 122, 144, 0.38);
  border-color: #E87A90;
}

.brand-icon-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.brand-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-title-styled {
  font-family: 'Playfair Display', Georgia, 'Be Vietnam Pro', serif;
  font-size: 21px;
  font-weight: 800;
  color: #C42B50;
  background: linear-gradient(135deg, #C42B50 0%, #D43864 45%, #E87A90 85%, #FF8CA4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.5px;
  display: block;
  line-height: 1.15;
  white-space: nowrap;
  filter: drop-shadow(0 1px 2px rgba(212, 56, 100, 0.12));
  transition: all 0.25s ease;
}

.brand-wrapper:hover .brand-title-styled {
  filter: drop-shadow(0 2px 6px rgba(212, 56, 100, 0.25));
}

[data-theme="dark"] .brand-title-styled {
  color: #FFB8C7;
  background: linear-gradient(135deg, #FFFFFF 0%, #FFB8C7 50%, #F8A5B8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(248, 165, 184, 0.4));
}

.brand-slogan-styled {
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  color: var(--text-muted, #8E6A78);
  text-transform: uppercase;
  letter-spacing: 1.3px;
  display: block;
  margin-top: 2px;
  line-height: 1.1;
  white-space: nowrap;
}

[data-theme="dark"] .brand-slogan-styled {
  color: #D8B4C2;
}

[data-theme="dark"] .brand-logo.brand-avatar {
  border-color: #E87A90;
  box-shadow: 0 3px 14px rgba(232, 122, 144, 0.35);
  background: #25141D;
}

@media (max-width: 768px) {
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
}
`;
    cssContent += brandTypographyCSS;
    console.log('Appended brand typography styles to main.css');
}

// Replace hardcoded shadows in buttons and logos
cssContent = cssContent.replace(/rgba\(63,\s*117,\s*35,\s*0\.22\)/g, 'rgba(232, 122, 144, 0.22)');
cssContent = cssContent.replace(/rgba\(63,\s*117,\s*35,\s*0\.35\)/g, 'rgba(232, 122, 144, 0.35)');
cssContent = cssContent.replace(/rgba\(63,\s*117,\s*35,\s*0\.3\)/g, 'rgba(232, 122, 144, 0.3)');
cssContent = cssContent.replace(/rgba\(45,\s*85,\s*30,\s*0\.06\)/g, 'rgba(232, 122, 144, 0.08)');
cssContent = cssContent.replace(/rgba\(45,\s*85,\s*30,\s*0\.08\)/g, 'rgba(232, 122, 144, 0.12)');
cssContent = cssContent.replace(/rgba\(45,\s*85,\s*30,\s*0\.12\)/g, 'rgba(232, 122, 144, 0.18)');

fs.writeFileSync(cssPath, cssContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated main.css!');
