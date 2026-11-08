/* Các màn hình dành cho chủ trọ */
function ownerDashboard() {
  const total = rooms.length;
  const rented = rooms.filter(r => r.stat === 'Đã thuê').length;
  const vacant = rooms.filter(r => r.stat === 'Trống').length;
  const maintenance = rooms.filter(r => r.stat === 'Bảo trì').length;
  const pct = value => total ? (100 * value / total).toFixed(1) + '%' : '0%';
  const pending = invoices.filter(invoice => invoice[5] !== 'Đã thanh toán');

  const summary = `
    <div class="stats">
      ${stat('Tổng số phòng', total, 'Toàn bộ khu trọ', '⌂')}
      ${stat('Đang thuê', rented, pct(rented) + ' tổng số phòng', '▣')}
      ${stat('Phòng trống', vacant, maintenance + ' phòng bảo trì', '✓')}
      ${stat('Đã thu (mẫu)', '5,75tr', 'Giao dịch mẫu, chưa kết nối MySQL', '₫')}
    </div>
  `;

  const roomStatus = panel('Tình trạng phòng', `
    <p class="sub">Phân bố ${total} phòng tại khu trọ</p>
    <div class="progress">
      <span style="width:${pct(rented)}"></span>
      <span style="width:${pct(vacant)}"></span>
      <span style="width:${pct(maintenance)}"></span>
    </div>
    <div class="legend">
      <span><i class="dot" style="background:#2563eb"></i>Đã thuê: ${rented}</span>
      <span><i class="dot" style="background:#18a978"></i>Trống: ${vacant}</span>
      <span><i class="dot" style="background:#eeb255"></i>Bảo trì: ${maintenance}</span>
    </div>
  `);

  const bills = panel('Hóa đơn chưa thu đủ', pending.map(invoice => `
    <div class="list-row">
      <div><b>${invoice[1]}</b>
        <span class="sub">${invoice[2]} · Tháng ${invoice[3]}</span></div>
      <div style="text-align:right">
        <div class="money">${money(invoice[4])}</div>
        ${badge(invoice[5])}
      </div>
    </div>
  `).join(''));

  const ending = panel('Hợp đồng sắp hết hạn', `
    <div class="list-row">
      <div><b>HD004 · Phạm Thị D</b>
        <span class="sub">Phòng P107 · 30/11/2026</span></div>
      ${badge('Sắp hết hạn')}
    </div>
    <p class="section-note">Mốc ngày minh họa từ dữ liệu hợp đồng mẫu.</p>
  `);
  const shortcuts = panel('Truy cập nhanh', `
    <div style="display:flex;flex-wrap:wrap;gap:9px">
      <button class="btn" onclick="navigate('rooms')">Quản lý phòng</button>
      <button class="btn secondary" onclick="navigate('invoices')">Lập hóa đơn</button>
      <button class="btn secondary" onclick="navigate('contracts')">Hợp đồng</button>
    </div>
    <p class="section-note">Chức năng lập hóa đơn hiện chỉ là bản xem trước.</p>
  `);

  return heading('Xin chào, Chủ trọ!', 'Đây là tổng quan hoạt động khu trọ của bạn.')
    + summary
    + `<div class="cols">${roomStatus}${bills}</div>`
    + `<div class="cols">${ending}${shortcuts}</div>`;
}
function roomPage() {
  const addButton = `<button class="btn" onclick="showForm('room')">＋ Thêm phòng</button>`;
  return heading(
    'Quản lý phòng trọ',
    'Theo dõi tình trạng phòng và cập nhật thông tin phòng.',
    addButton
  ) + `
    <div class="panel">
      <div class="toolbar">
        <input class="input" id="room-search"
          placeholder="Tìm theo mã phòng hoặc người thuê..."
          oninput="filterRooms()">
        <select class="select" id="room-filter" onchange="filterRooms()">
          <option value="">Tất cả trạng thái</option>
          <option value="Đã thuê">Đã thuê</option>
          <option value="Trống">Trống</option>
          <option value="Bảo trì">Bảo trì</option>
        </select>
      </div>
      <div id="room-table"></div>
    </div>
    <p class="section-note">
      Trạng thái “Đã thuê” phụ thuộc vào hợp đồng đang hiệu lực.
      Đây là dữ liệu demo; chưa đồng bộ với MySQL.
    </p>
  `;
}

function filterRooms() {
  const search = document.getElementById('room-search').value.trim().toLowerCase();
  const status = document.getElementById('room-filter').value;

  const filtered = rooms.filter(room => {
    const matchesText = room.n.toLowerCase().includes(search)
      || room.tenant.toLowerCase().includes(search);
    const matchesStatus = !status || room.stat === status;
    return matchesText && matchesStatus;
  });

  const rows = filtered.map(room => `
    <tr>
      <td><b>${escapeHtml(room.n)}</b></td>
      <td>${room.area} m²</td>
      <td>${money(room.price)}</td>
      <td>${escapeHtml(room.tenant)}</td>
      <td>${badge(room.stat)}</td>
      <td>
        <button class="btn ghost" onclick="showForm('room', '${room.n}')">
          Xem / Sửa
        </button>
      </td>
    </tr>
  `);

  document.getElementById('room-table').innerHTML = table(
    ['Mã phòng', 'Diện tích', 'Giá niêm yết', 'Người thuê', 'Trạng thái', 'Thao tác'],
    rows
  );
}

function studentPage() { return heading('Quản lý sinh viên', 'Hồ sơ cá nhân và liên kết tài khoản đăng nhập.', `<button class="btn" onclick="showForm('student')">＋ Thêm sinh viên</button>`) + panel('Danh sách sinh viên', `<div class="toolbar"><input class="input" placeholder="Tìm kiếm theo tên hoặc mã sinh viên..." oninput="filterGeneric(this,'std-body')"></div>` + `<div class="table-wrap"><table><thead><tr><th>Mã SV</th><th>Họ tên</th><th>Số điện thoại</th><th>Trường</th><th>Phòng đang thuê</th><th>Thao tác</th></tr></thead><tbody id="std-body">${students.map(s => `<tr><td><b>${s[0]}</b></td><td>${escapeHtml(s[1])}</td><td>${escapeHtml(s[2])}</td><td>${escapeHtml(s[3])}</td><td>${s[4]}</td><td><button class="btn ghost" onclick="showForm('student','${s[0]}')">Xem / Sửa</button></td></tr>`).join('')}</tbody></table></div>`) + `<p class="section-note">Bản demo chỉ lưu hồ sơ. Khi có backend, thao tác này cần tạo đồng thời USERS và STUDENTS trong một giao dịch.</p>`; }
function contractPage() { return heading('Quản lý hợp đồng', 'Lập hợp đồng mới, theo dõi thời hạn và kết thúc thuê.', `<button class="btn" onclick="showForm('contract')">＋ Lập hợp đồng</button>`) + panel('Danh sách hợp đồng', table(['Mã HĐ', 'Sinh viên', 'Phòng', 'Bắt đầu', 'Kết thúc dự kiến', 'Trạng thái', 'Thao tác'], contracts.map(c => `<tr>${c.slice(0, 5).map((v, i) => `<td>${i === 0 ? '<b>' : ''}${v}${i === 0 ? '</b>' : ''}</td>`).join('')}<td>${badge(c[5])}</td><td><button class="btn ghost" onclick="showForm('contract','${c[0]}')">Chi tiết</button></td></tr>`))) + `<p class="section-note">Kiểm tra không có hợp đồng chồng thời gian trên cùng một phòng hoặc cùng một sinh viên.</p>`; }
function invoicePage() { return heading('Quản lý hóa đơn', 'Tính tiền phòng, điện và nước theo từng tháng.', `<button class="btn" onclick="showForm('invoice')">＋ Lập hóa đơn</button>`) + panel('Danh sách hóa đơn', table(['Mã hóa đơn', 'Phòng', 'Sinh viên', 'Kỳ hóa đơn', 'Tổng tiền', 'Trạng thái', 'Thao tác'], invoices.map(i => `<tr>${i.slice(0, 4).map((v, j) => `<td>${j === 0 ? '<b>' : ''}${v}${j === 0 ? '</b>' : ''}</td>`).join('')}<td class="money">${money(i[4])}</td><td>${badge(i[5])}</td><td><button class="btn ghost" onclick="showForm('invoice','${i[0]}')">Xem hóa đơn</button></td></tr>`))) + `<p class="section-note">Mỗi hợp đồng chỉ được có một hóa đơn cho một tháng. Giá thuê ghi nhận trong hóa đơn có thể khác giá hợp đồng nếu có thỏa thuận điều chỉnh.</p>`; }
function paymentPage() { return heading('Quản lý thanh toán', 'Ghi nhận tiền đã thu, hỗ trợ trả một phần hoặc trả đủ.', `<button class="btn" onclick="showForm('payment')">＋ Ghi nhận thanh toán</button>`) + panel('Lịch sử giao dịch', table(['Mã TT', 'Hóa đơn', 'Sinh viên', 'Số tiền', 'Thời điểm', 'Phương thức'], payments.map(p => `<tr><td><b>${p[0]}</b></td><td>${p[1]}</td><td>${p[2]}</td><td class="money">${money(p[3])}</td><td>${p[4]}</td><td>${p[5]}</td></tr>`))) + `<p class="section-note">Số còn nợ = tổng hóa đơn − tổng các lần thanh toán. Backend cần từ chối thanh toán âm hoặc vượt số dư.</p>`; }
function reportPage() { return heading('Thống kê và báo cáo', 'Tổng hợp doanh thu thực thu và công suất sử dụng phòng.') + `<div class="toolbar"><label style="font-weight:700">Kỳ thống kê</label><select class="select" onchange="document.getElementById('period-note').textContent='Dữ liệu mô phỏng; sẽ lọc theo tháng khi kết nối backend.'"><option>Tháng 11/2026</option><option>Tháng 10/2026</option><option>Năm 2026</option></select><span class="sub" id="period-note">Số liệu minh họa</span></div><div class="stats">${stat('Tổng số phòng', String(rooms.length), 'Khu trọ mẫu', '⌂')}${stat('Đang thuê', String(rooms.filter(r => r.stat === 'Đã thuê').length), 'Công suất 62,5%', '⌂')}${stat('Tổng đã thu', '5,75tr', 'Theo dữ liệu giao dịch mẫu', '₫')}${stat('Hóa đơn chưa thu đủ', '3', 'Bao gồm thanh toán một phần', '▣')}</div><div class="cols">${panel('Biểu đồ doanh thu (dữ liệu minh họa)', `<div class="mini-chart">${[42, 64, 48, 86, 78, 98].map((h, i) => `<div class="bar" style="height:${h}%"><span>T${i + 6}</span></div>`).join('')}</div><p class="section-note" style="margin-top:32px">Đồ thị minh họa, không phải số liệu thật.</p>`)}${panel('Thống kê tình trạng phòng', `<div class="list-row"><b>Đã thuê</b>${badge('5 phòng')}</div><div class="list-row"><b>Trống</b>${badge('2 phòng')}</div><div class="list-row"><b>Bảo trì</b>${badge('1 phòng')}</div><div class="formula">Doanh thu thực thu được tính bằng tổng PAYMENTS.amount theo khoảng thời gian được chọn.</div>`)}</div>`; }
function accountPage() { return heading('Tài khoản chủ trọ', 'Quản lý thông tin đăng nhập của tài khoản quản trị.') + panel('Thông tin tài khoản', `<div class="form-grid"><label class="field">Tên đăng nhập<input value="admin" readonly></label><label class="field">Vai trò<input value="owner" readonly></label><label class="field">Ngày tạo tài khoản<input value="01/09/2026 08:30" readonly></label></div><div style="margin-top:20px"><button class="btn secondary" onclick="showForm('password')">Đổi mật khẩu (xem mẫu)</button></div>`); }
