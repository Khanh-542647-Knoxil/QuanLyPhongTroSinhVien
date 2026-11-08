/* Form và tính năng lưu thử trong localStorage — KHÔNG phải MySQL */
// Đọc dữ liệu đã sửa từ localStorage (chỉ phục vụ trình diễn).
try {
  const saved = JSON.parse(localStorage.getItem('phongtro_demo_v1') || '{}');
  if (Array.isArray(saved.rooms)) rooms.splice(0, rooms.length, ...saved.rooms);
  if (Array.isArray(saved.students)) students.splice(0, students.length, ...saved.students);
} catch (error) {
  console.warn('Không đọc được dữ liệu demo; sử dụng dữ liệu ban đầu.', error);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function demoFields(type, id) {
  if (type === 'room') {
    const r = rooms.find(room => room.n === id);
    return [
      ['Số phòng', r?.n || '', true],
      ['Diện tích (m²)', r?.area ?? '', true],
      ['Giá niêm yết (đ/tháng)', r?.price ?? '', true],
      ['Đang bảo trì? (Có/Không)', r?.stat === 'Bảo trì' ? 'Có' : 'Không', true],
      ['Mô tả phòng', r?.description || '', false]
    ];
  }
  if (type === 'student') {
    const st = students.find(row => row[0] === id);
    return [
      ['Mã sinh viên', st?.[0] || '', true],
      ['Họ tên', st?.[1] || '', true],
      ['Số điện thoại', st?.[2] || '', true],
      ['Trường đại học', st?.[3] || '', true]
    ];
  }
  if (type === 'contract') {
    const c = contracts.find(row => row[0] === id);
    return [
      ['Mã hợp đồng', c?.[0] || 'HD006'],
      ['Sinh viên', c?.[1] || 'Chọn sinh viên'],
      ['Phòng', c?.[2] || 'Chọn phòng'],
      ['Ngày bắt đầu', c?.[3] || '01/12/2026'],
      ['Ngày kết thúc', c?.[4] || '30/11/2027'],
      ['Trạng thái', c?.[5] || 'Đang hiệu lực']
    ];
  }
  if (type === 'invoice') {
    const i = invoices.find(row => row[0] === id);
    // Bản mẫu invoices chỉ chứa tổng tiền, chưa có đủ các chỉ số điện/nước chi tiết.
    return [
      ['Mã hóa đơn', i?.[0] || 'INV006'],
      ['Phòng', i?.[1] || 'P101'],
      ['Sinh viên', i?.[2] || 'Chọn sinh viên'],
      ['Kỳ hóa đơn', i?.[3] || '11/2026'],
      ['Tổng tiền', i ? money(i[4]) : '(Chưa tính)'],
      ['Trạng thái', i?.[5] || 'Chưa thanh toán']
    ];
  }
  if (type === 'payment') {
    return [
      ['Mã hóa đơn', 'INV001'], ['Số tiền thanh toán', '1000000'],
      ['Ngày thanh toán', '05/11/2026'], ['Phương thức', 'Chuyển khoản']
    ];
  }
  return [['Mật khẩu hiện tại', ''], ['Mật khẩu mới', ''], ['Nhập lại mật khẩu', '']];
}

function showForm(type, id) {
  const names = {
    room: 'Thông tin phòng trọ', student: 'Hồ sơ sinh viên',
    contract: 'Hợp đồng thuê', invoice: 'Hóa đơn',
    payment: 'Thanh toán', password: 'Đổi mật khẩu'
  };
  const editable = role === 'owner' && (type === 'room' || type === 'student');
  const fields = demoFields(type, id);
  document.getElementById('modal-title').textContent = names[type] + (id ? ` · ${id}` : ' · Tạo mới');
  document.getElementById('modal-content').innerHTML = `
    <div class="form-grid">
      ${fields.map(([label, value, required], index) => `
        <label class="field ${label === 'Mô tả phòng' ? 'wide' : ''}">
          ${escapeHtml(label)}
          <input data-index="${index}" value="${escapeHtml(value)}"
            ${required ? 'required' : ''}
            ${editable ? '' : 'readonly'}
            ${type === 'password' ? 'type="password"' : 'type="text"'}>
        </label>
      `).join('')}
    </div>
    <p class="section-note">
      ${editable
        ? 'Lưu thử chỉ trên trình duyệt (localStorage). Chưa lưu MySQL hoặc tạo tài khoản đăng nhập.'
        : 'Đây là biểu mẫu xem trước. Các tính năng lưu thật sẽ làm khi kết nối backend.'}
    </p>
  `;
  const saveArea = document.getElementById('modal-save-area');
  saveArea.innerHTML = editable
    ? `<button class="btn" onclick="saveDemoForm('${type}', '${escapeHtml(id || '')}')">Lưu thử</button>`
    : '';
  document.getElementById('modal-overlay').classList.add('show');
}

function saveDemoForm(type, originalId) {
  if (role !== 'owner') return;
  const values = [...document.querySelectorAll('#modal-content [data-index]')]
    .map(input => input.value.trim());
  if (type === 'room') {
    const [nRaw, areaRaw, priceRaw, maintenance, description] = values;
    const n = nRaw.toUpperCase();
    const area = Number(areaRaw);
    const price = Number(priceRaw);
    if (!n || !Number.isFinite(area) || area <= 0 || !Number.isFinite(price) || price < 0) {
      alert('Vui lòng nhập mã phòng, diện tích và giá thuê hợp lệ.'); return;
    }
    if (rooms.some(r => r.n === n && r.n !== originalId)) {
      alert('Mã phòng đã tồn tại.'); return;
    }
    if (!['Có', 'Không'].includes(maintenance)) {
      alert('Đang bảo trì? Hãy nhập Có hoặc Không.'); return;
    }
    const old = rooms.find(r => r.n === originalId);
    if (old?.stat === 'Đã thuê' && maintenance === 'Có') {
      alert('Không thể đánh dấu bảo trì khi phòng đang có người thuê.'); return;
    }
    const room = {
      n, area, price, description,
      tenant: old?.tenant || '—',
      stat: maintenance === 'Có' ? 'Bảo trì' : (old?.stat === 'Đã thuê' ? 'Đã thuê' : 'Trống')
    };
    const pos = rooms.findIndex(r => r.n === originalId);
    if (pos >= 0) rooms[pos] = room; else rooms.push(room);
  } else if (type === 'student') {
    const [codeRaw, name, phone, university] = values;
    const code = codeRaw.toUpperCase();
    if (!code || !name || !phone || !university) {
      alert('Vui lòng nhập đầy đủ thông tin sinh viên.'); return;
    }
    if (students.some(s => s[0] === code && s[0] !== originalId)) {
      alert('Mã sinh viên đã tồn tại.'); return;
    }
    const pos = students.findIndex(s => s[0] === originalId);
    const old = pos >= 0 ? students[pos] : null;
    const student = [code, name, phone, university, old?.[4] || '—'];
    if (old && old[1] !== name) {
      rooms.forEach(r => { if (r.tenant === old[1]) r.tenant = name; });
      contracts.forEach(c => { if (c[1] === old[1]) c[1] = name; });
      invoices.forEach(i => { if (i[2] === old[1]) i[2] = name; });
      payments.forEach(p => { if (p[2] === old[1]) p[2] = name; });
    }
    if (pos >= 0) students[pos] = student; else students.push(student);
  } else return;
  try {
    localStorage.setItem('phongtro_demo_v1', JSON.stringify({rooms, students}));
  } catch (error) {
    console.warn('Không thể lưu dữ liệu demo trên trình duyệt.', error);
  }
  closeModal();
  navigate(type === 'room' ? 'rooms' : 'students');
  alert('Đã lưu dữ liệu DEMO trên trình duyệt. Chưa lưu vào MySQL.');
}
