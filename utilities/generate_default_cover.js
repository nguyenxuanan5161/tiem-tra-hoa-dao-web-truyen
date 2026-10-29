const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../wp-content/themes/muop-dang/assets/images/logo-icon-128.png');
const targetSvg = path.join(__dirname, '../wp-content/themes/muop-dang/assets/images/default-cover.svg');

const logoB64 = fs.readFileSync(logoPath).toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="420" viewBox="0 0 300 420">
  <defs>
    <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF0F5"/>
      <stop offset="25%" stop-color="#FFE3E8"/>
      <stop offset="70%" stop-color="#F8A5B8"/>
      <stop offset="100%" stop-color="#E87A90"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#3D222E" flood-opacity="0.2"/>
    </filter>
    <clipPath id="circleClip">
      <circle cx="150" cy="135" r="52"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="300" height="420" fill="url(#sakuraGrad)" rx="16"/>

  <!-- Inner decorative frames -->
  <rect x="12" y="12" width="276" height="396" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-opacity="0.85" rx="12"/>
  <rect x="16" y="16" width="268" height="388" fill="none" stroke="#D65D75" stroke-width="1" stroke-opacity="0.35" rx="9"/>

  <!-- Spine guideline -->
  <line x1="28" y1="12" x2="28" y2="408" stroke="#D65D75" stroke-width="1.5" stroke-opacity="0.25"/>

  <!-- Decorative Sakura Blossom Petals -->
  <g fill="#FFFFFF" opacity="0.65">
    <path d="M 60 45 C 55 40, 52 48, 55 53 C 58 58, 66 54, 60 45 Z" transform="rotate(-15 60 45)"/>
    <path d="M 240 60 C 235 55, 232 63, 235 68 C 238 73, 246 69, 240 60 Z" transform="rotate(25 240 60)"/>
    <path d="M 45 340 C 40 335, 37 343, 40 348 C 43 353, 51 349, 45 340 Z" transform="rotate(40 45 340)"/>
    <path d="M 255 350 C 250 345, 247 353, 250 358 C 253 363, 261 359, 255 350 Z" transform="rotate(-30 255 350)"/>
  </g>

  <!-- Logo Outer Glow & Circle -->
  <circle cx="150" cy="135" r="57" fill="#FFFFFF" filter="url(#shadow)"/>
  <circle cx="150" cy="135" r="54" fill="#FFE3E8" stroke="#E87A90" stroke-width="2.5"/>
  <image href="data:image/png;base64,${logoB64}" x="98" y="83" width="104" height="104" clip-path="url(#circleClip)"/>

  <!-- Brand Title -->
  <text x="150" y="240" fill="#3D222E" font-family="'Playfair Display', Georgia, serif" font-size="21" font-weight="900" text-anchor="middle" letter-spacing="1.2">TIỆM TRÀ HOA ĐÀO</text>
  
  <!-- Subtitle -->
  <text x="150" y="266" fill="#7A3B4D" font-family="'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="700" text-anchor="middle" letter-spacing="0.8">GÓC TRUYỆN &amp; AUDIO NGỌT NGÀO</text>

  <!-- Flourish Divider -->
  <g transform="translate(150, 286)">
    <line x1="-60" y1="0" x2="-15" y2="0" stroke="#E87A90" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
    <circle cx="0" cy="0" r="4" fill="#E87A90"/>
    <path d="M-4,-1 C-2,-4 2,-4 4,-1 C2,2 -2,2 -4,-1 Z" fill="#FFCCD5"/>
    <line x1="15" y1="0" x2="60" y2="0" stroke="#E87A90" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>
  </g>

  <!-- Tag / Badge at Bottom -->
  <g transform="translate(75, 316)">
    <rect width="150" height="26" rx="13" fill="#FFFFFF" fill-opacity="0.9" stroke="#F8CCD8" stroke-width="1"/>
    <text x="75" y="17" fill="#E87A90" font-family="'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="800" text-anchor="middle" letter-spacing="0.8">TIỆM TRÀ • CHỌN LỌC</text>
  </g>

  <!-- Bottom Slogan -->
  <text x="150" y="375" fill="#FFFFFF" font-family="'Segoe UI', Roboto, sans-serif" font-size="10.5" font-weight="600" text-anchor="middle" opacity="0.95" letter-spacing="0.5">Một tách trà thơm • Vạn trang truyện ngọt</text>
</svg>`;

fs.writeFileSync(targetSvg, svg, 'utf8');
console.log('Successfully wrote default-cover.svg! File size:', fs.statSync(targetSvg).size);
