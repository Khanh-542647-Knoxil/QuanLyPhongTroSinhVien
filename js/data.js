// Dữ liệu minh họa, tách riêng để dễ học. KHÔNG phải dữ liệu MySQL.

const rooms = [
  {
    "n": "P101",
    "price": 2000000,
    "area": 24,
    "stat": "Đã thuê",
    "tenant": "Nguyễn Văn A"
  },
  {
    "n": "P102",
    "price": 1800000,
    "area": 20,
    "stat": "Đã thuê",
    "tenant": "Trần Thị B"
  },
  {
    "n": "P103",
    "price": 2200000,
    "area": 27,
    "stat": "Trống",
    "tenant": "—"
  },
  {
    "n": "P104",
    "price": 2100000,
    "area": 25,
    "stat": "Đã thuê",
    "tenant": "Lê Văn C"
  },
  {
    "n": "P105",
    "price": 1900000,
    "area": 21,
    "stat": "Bảo trì",
    "tenant": "—"
  },
  {
    "n": "P106",
    "price": 2000000,
    "area": 24,
    "stat": "Trống",
    "tenant": "—"
  },
  {
    "n": "P107",
    "price": 2300000,
    "area": 28,
    "stat": "Đã thuê",
    "tenant": "Phạm Thị D"
  },
  {
    "n": "P108",
    "price": 1950000,
    "area": 22,
    "stat": "Đã thuê",
    "tenant": "Đỗ Văn E"
  }
];

const students = [
  [
    "SV001",
    "Nguyễn Văn A",
    "0987 001 001",
    "HUST",
    "P101"
  ],
  [
    "SV002",
    "Trần Thị B",
    "0987 001 002",
    "NEU",
    "P102"
  ],
  [
    "SV003",
    "Lê Văn C",
    "0987 001 003",
    "HUST",
    "P104"
  ],
  [
    "SV004",
    "Phạm Thị D",
    "0987 001 004",
    "FTU",
    "P107"
  ],
  [
    "SV005",
    "Đỗ Văn E",
    "0987 001 005",
    "HUST",
    "P108"
  ]
];

const contracts = [
  [
    "HD001",
    "Nguyễn Văn A",
    "P101",
    "01/09/2026",
    "31/08/2027",
    "Đang hiệu lực"
  ],
  [
    "HD002",
    "Trần Thị B",
    "P102",
    "01/08/2026",
    "31/07/2027",
    "Đang hiệu lực"
  ],
  [
    "HD003",
    "Lê Văn C",
    "P104",
    "01/10/2026",
    "30/09/2027",
    "Đang hiệu lực"
  ],
  [
    "HD004",
    "Phạm Thị D",
    "P107",
    "01/06/2026",
    "30/11/2026",
    "Đang hiệu lực"
  ],
  [
    "HD005",
    "Đỗ Văn E",
    "P108",
    "01/11/2026",
    "31/10/2027",
    "Đang hiệu lực"
  ]
];

const invoices = [
  [
    "INV001",
    "P101",
    "Nguyễn Văn A",
    "10/2026",
    2350000,
    "Chưa thanh toán"
  ],
  [
    "INV002",
    "P102",
    "Trần Thị B",
    "10/2026",
    2150000,
    "Đã thanh toán"
  ],
  [
    "INV003",
    "P104",
    "Lê Văn C",
    "10/2026",
    2460000,
    "Thanh toán một phần"
  ],
  [
    "INV004",
    "P107",
    "Phạm Thị D",
    "10/2026",
    2600000,
    "Đã thanh toán"
  ],
  [
    "INV005",
    "P108",
    "Đỗ Văn E",
    "11/2026",
    2300000,
    "Chưa thanh toán"
  ]
];

const payments = [
  [
    "TT001",
    "INV002",
    "Trần Thị B",
    2150000,
    "02/11/2026",
    "Chuyển khoản"
  ],
  [
    "TT002",
    "INV003",
    "Lê Văn C",
    1000000,
    "03/11/2026",
    "Tiền mặt"
  ],
  [
    "TT003",
    "INV004",
    "Phạm Thị D",
    2600000,
    "04/11/2026",
    "Chuyển khoản"
  ]
];

const ownerNav = [
  [
    "dashboard",
    "▦",
    "Tổng quan"
  ],
  [
    "rooms",
    "⌂",
    "Phòng trọ"
  ],
  [
    "students",
    "♟",
    "Sinh viên"
  ],
  [
    "contracts",
    "▤",
    "Hợp đồng"
  ],
  [
    "invoices",
    "▣",
    "Hóa đơn"
  ],
  [
    "payments",
    "▥",
    "Thanh toán"
  ],
  [
    "reports",
    "▥",
    "Thống kê"
  ],
  [
    "account",
    "⚙",
    "Tài khoản"
  ]
];

const studentNav = [
  [
    "student-home",
    "▦",
    "Tổng quan"
  ],
  [
    "my-contract",
    "⌂",
    "Phòng & hợp đồng"
  ],
  [
    "my-invoices",
    "▣",
    "Hóa đơn của tôi"
  ],
  [
    "my-payments",
    "▥",
    "Lịch sử thanh toán"
  ],
  [
    "my-profile",
    "⚙",
    "Thông tin cá nhân"
  ]
];

