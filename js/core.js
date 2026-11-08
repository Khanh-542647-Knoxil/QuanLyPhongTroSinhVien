/* Chuyển trang, sidebar, các hàm giao diện dùng chung */
// XỬ LÝ GIAO DIỆN DEMO. Cần backend để xác thực/lưu CSDL thật.
let role = 'owner', current = 'dashboard';
const money = n => n.toLocaleString('vi-VN') + 'đ';
const badge = (x) => `<span class="badge ${/Đã thuê|Đã thanh toán|Đang hiệu lực/.test(x) ? 'green' : /Trống/.test(x) ? 'blue' : /Chưa thanh toán|Sắp hết/.test(x) ? 'red' : /một phần|Bảo trì/.test(x) ? 'orange' : 'gray'}">${x}</span>`;
const heading = (title, sub, button) => `<div class="page-title"><div><h1>${title}</h1><p>${sub}</p></div>${button || ''}</div>`;
const panel = (title, content) => `<div class="panel"><h3>${title}</h3>${content}</div>`;
const table = (heads, rows) => `<div class="table-wrap"><table><thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
function navRender() { let nav = role === 'owner' ? ownerNav : studentNav; document.getElementById('nav').innerHTML = nav.map(([id, icon, label]) => `<button class="${id === current ? 'active' : ''}" onclick="navigate('${id}')"><span class="ico">${icon}</span>${label}</button>`).join(''); document.getElementById('role-select').value = role; document.getElementById('avatar').textContent = role === 'owner' ? 'CT' : 'SV'; document.getElementById('top-title').textContent = nav.find(n => n[0] === current)?.[2] || 'Tổng quan'; }
function start(r) { document.getElementById('login-page').classList.add('hide'); document.getElementById('app-shell').classList.remove('hide'); changeRole(r); }
function logout() { document.getElementById('app-shell').classList.add('hide'); document.getElementById('login-page').classList.remove('hide'); }
function changeRole(r) { role = r; current = r === 'owner' ? 'dashboard' : 'student-home'; navigate(current); }
function navigate(id) {
  current = id;
  navRender();
  const views = {
    dashboard: ownerDashboard, rooms: roomPage, students: studentPage,
    contracts: contractPage, invoices: invoicePage, payments: paymentPage,
    reports: reportPage, account: accountPage,
    'student-home': studentHome, 'my-contract': myContract,
    'my-invoices': myInvoices, 'my-payments': myPayments,
    'my-profile': myProfile
  };
  document.getElementById('content').innerHTML = views[id]();
  if (id === 'rooms') filterRooms();
  window.scrollTo(0, 0);
}
const stat = (label, value, note, icon) => `<div class="stat"><span class="symbol">${icon}</span><small>${label}</small><div class="value">${value}</div><div class="note">${note}</div></div>`;

function filterGeneric(input, id) { let q = input.value.toLowerCase(); document.querySelectorAll('#' + id + ' tr').forEach(tr => tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none'); }

function closeModal() { document.getElementById('modal-overlay').classList.remove('show'); }
document.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    closeModal();
});

