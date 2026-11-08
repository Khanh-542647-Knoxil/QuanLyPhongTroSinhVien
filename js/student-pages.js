/* Các màn hình dành cho sinh viên */
function studentHome() {
  return (
    heading(
      "Xin chào, Nguyễn Văn A!",
      "Thông tin thuê trọ và các khoản thanh toán của bạn.",
    ) +
    `<div class="hero"><h2>⌂ Phòng P101</h2><p>Đang thuê · Hợp đồng HD001 · 01/09/2026 – 31/08/2027</p></div><div class="stats">${stat("Tiền phòng/tháng", "2,00tr", "Theo hợp đồng", "⌂")}${stat("Hóa đơn gần nhất", "2,35tr", "Tháng 10/2026", "▣")}${stat("Đã thanh toán", "0đ", "Của hóa đơn gần nhất", "✓")}${stat("Còn phải trả", "2,35tr", "Chưa thanh toán", "₫")}</div><div class="cols">${panel("Thông tin hợp đồng", `<div class="list-row"><span>Phòng</span><b>P101</b></div><div class="list-row"><span>Ngày bắt đầu</span><b>01/09/2026</b></div><div class="list-row"><span>Ngày kết thúc</span><b>31/08/2027</b></div><div class="list-row"><span>Tiền cọc</span><b>${money(1000000)}</b></div>`)}${panel("Hóa đơn gần nhất", `<div class="list-row"><b>INV001 · 10/2026</b>${badge("Chưa thanh toán")}</div><div class="list-row"><span>Tiền phòng</span><b>${money(2000000)}</b></div><div class="list-row"><span>Điện + nước</span><b>${money(350000)}</b></div><div class="list-row"><b>Tổng cộng</b><b>${money(2350000)}</b></div><button class="btn" onclick="navigate('my-invoices')">Xem hóa đơn</button>`)}</div>`
  );
}
function myContract() {
  return (
    heading(
      "Phòng và hợp đồng của tôi",
      "Sinh viên chỉ xem thông tin cá nhân, không thể sửa hợp đồng.",
    ) +
    `<div class="cols">${panel("Thông tin phòng", `<h2 style="font-size:30px">P101 ${badge("Đã thuê")}</h2><div class="list-row"><span>Diện tích</span><b>24 m²</b></div><div class="list-row"><span>Giá niêm yết</span><b>${money(2000000)}</b></div><div class="list-row"><span>Mô tả</span><b>Phòng khép kín</b></div>`)}${panel("Thông tin hợp đồng", `<div class="list-row"><span>Mã hợp đồng</span><b>HD001</b></div><div class="list-row"><span>Thời hạn</span><b>01/09/2026 – 31/08/2027</b></div><div class="list-row"><span>Giá thuê đã thỏa thuận</span><b>${money(2000000)}</b></div><div class="list-row"><span>Tiền cọc</span><b>${money(1000000)}</b></div><div class="list-row"><span>Trạng thái</span>${badge("Đang hiệu lực")}</div>`)}</div>`
  );
}
function myInvoices() {
  return (
    heading(
      "Hóa đơn của tôi",
      "Tra cứu các kỳ hóa đơn thuộc hợp đồng của bạn.",
    ) +
    panel(
      "Danh sách hóa đơn",
      table(
        [
          "Mã hóa đơn",
          "Kỳ thanh toán",
          "Tiền phòng",
          "Điện + nước",
          "Tổng",
          "Trạng thái",
          "Chi tiết",
        ],
        [
          [
            "INV001",
            "10/2026",
            "2.000.000đ",
            "350.000đ",
            "2.350.000đ",
            "Chưa thanh toán",
          ],
        ].map(
          (i) =>
            `<tr>${i
              .slice(0, 5)
              .map((v) => `<td>${v}</td>`)
              .join(
                "",
              )}<td>${badge(i[5])}</td><td><button class="btn ghost" onclick="showForm('invoice','INV001')">Xem</button></td></tr>`,
        ),
      ),
    ) +
    `<p class="section-note">Giao diện chỉ xem; sinh viên không tự xác nhận đã thanh toán.</p>`
  );
}
function myPayments() {
  return (
    heading(
      "Lịch sử thanh toán",
      "Chỉ hiển thị giao dịch của hóa đơn thuộc sinh viên đăng nhập.",
    ) +
    panel(
      "Lịch sử thanh toán",
      `<div class="empty">Bạn chưa có giao dịch thanh toán nào cho hóa đơn đang xem.<br><small>Thanh toán được chủ trọ xác nhận và cập nhật tại mục Thanh toán.</small></div>`,
    )
  );
}
function myProfile() {
  return (
    heading(
      "Thông tin cá nhân",
      "Hồ sơ sinh viên liên kết tài khoản đăng nhập.",
    ) +
    panel(
      "Hồ sơ sinh viên",
      `<div class="form-grid"><label class="field">Họ và tên<input value="Nguyễn Văn A" readonly></label><label class="field">Mã sinh viên<input value="SV001" readonly></label><label class="field">Số điện thoại<input value="0987 001 001" readonly></label><label class="field">Trường đại học<input value="HUST" readonly></label><label class="field">Tên đăng nhập<input value="sv001" readonly></label><label class="field">Vai trò<input value="student" readonly></label></div><div style="margin-top:20px"><button class="btn secondary" onclick="showForm('password')">Đổi mật khẩu (xem mẫu)</button></div>`,
    )
  );
}
