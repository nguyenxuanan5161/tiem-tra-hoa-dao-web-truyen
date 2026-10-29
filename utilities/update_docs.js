const fs = require('fs');
const path = require('path');

// 1. Update README.md
const readmePath = path.join(__dirname, '../README.md');
let readme = fs.readFileSync(readmePath, 'utf8');

const newAccountsTable = `> **Lưu ý:** Tất cả các tài khoản demo đã được cài đặt mật khẩu đồng bộ: \`MatKhau@123\`

| Vai trò | Tên đăng nhập | Email | Mật khẩu | Chức năng nổi bật |
| :--- | :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | \`admin\` | \`admin@tiemtrahoadao.vn\` | \`MatKhau@123\` | Toàn quyền quản trị, kiểm duyệt truyện, gắn link Shopee/TikTok, xem click, quản lý người dùng, xem lương dịch giả, đổi chế độ xem. |
| **Quản trị viên dự phòng** | \`ngockha24052001\` | \`ngockha24052001@gmail.com\` | \`MatKhau@123\` | Toàn quyền quản trị hệ thống. |
| **Dịch giả 1 (Translator)** | \`dichgia_muop\` | \`dichgia@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đăng truyện, thêm chương, quản lý truyện đã đăng, xem view ngày/tuần/tháng/năm, xem nhuận bút 8đ/view, trả lời bình luận. |
| **Dịch giả 2 (Translator)** | \`dichgia_bocute\` | \`bo@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đăng truyện, thêm chương, tính lương, quản lý tác phẩm. |
| **Độc giả 1 (Reader)** | \`docgia_linh\` | \`docgia@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đọc truyện, lưu tủ truyện, lịch sử đọc, bình luận, bật/tắt giao diện Sáng/Tối. |
| **Độc giả 2 (Reader)** | \`docgia_minh\` | \`minh@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đọc truyện, tủ truyện cá nhân. |`;

readme = readme.replace(/\| Vai trò[\s\S]*?\| \*\*Độc giả 2 \(Reader\)\*\* \| `docgia_minh`[^\n]*/, newAccountsTable);
readme = readme.replace(/https:\/\/muopdangcungcovingot\.io\.vn/g, 'http://162.4.176.220');
readme = readme.replace(/Tên miền chính thức/g, 'Địa chỉ máy chủ (VPS)');
readme = readme.replace(/Mướp Đắng Cũng Có Vị Ngọt/g, 'Tiệm Trà Hoa Đào');

fs.writeFileSync(readmePath, readme, 'utf8');
console.log('README.md updated successfully!');

// 2. Update HUONG_DAN_CAI_DAT_VA_CHAY_WEB.md
const hdPath = path.join(__dirname, '../HUONG_DAN_CAI_DAT_VA_CHAY_WEB.md');
let hd = fs.readFileSync(hdPath, 'utf8');

const newHdTable = `Hệ thống đã có sẵn các tài khoản demo tương ứng với 3 vai trò khác nhau trong hệ thống (Tất cả dùng chung mật khẩu: \`MatKhau@123\`):

| Vai trò | Tên đăng nhập | Email | Mật khẩu | Chức năng nổi bật |
| :--- | :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | \`admin\` | \`admin@tiemtrahoadao.vn\` | \`MatKhau@123\` | Toàn quyền quản trị website, duyệt truyện của dịch giả, quản lý link Shopee/TikTok affiliate, xem bảng lương, quản lý người dùng, chuyển đổi chế độ xem. |
| **Quản trị viên dự phòng** | \`ngockha24052001\` | \`ngockha24052001@gmail.com\` | \`MatKhau@123\` | Toàn quyền quản trị hệ thống. |
| **Dịch giả (Translator)** | \`dichgia_muop\` | \`dichgia@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đăng truyện mới, thêm chương, quét kiểm duyệt từ nhạy cảm tự động, xem thống kê lượt đọc, theo dõi tiền nhuận bút (8đ / view). |
| **Độc giả (Reader)** | \`docgia_linh\` | \`docgia@tiemtrahoadao.vn\` | \`MatKhau@123\` | Đọc truyện, đánh dấu chương đã đọc, lưu vào tủ truyện yêu thích, đổi chế độ giao diện Sáng/Tối (Light/Dark mode), bình luận truyện. |`;

hd = hd.replace(/Hệ thống đã có sẵn các tài khoản demo[\s\S]*?\| \*\*Độc giả \(Reader\)\*\* \| `docgia_linh`[^\n]*/, newHdTable);
hd = hd.replace(/Mướp Đắng Cũng Có Vị Ngọt/g, 'Tiệm Trà Hoa Đào');

fs.writeFileSync(hdPath, hd, 'utf8');
console.log('HUONG_DAN_CAI_DAT_VA_CHAY_WEB.md updated successfully!');

