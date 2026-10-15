/* posts.js — sumber data tunggal untuk Blog & Home latest articles.
   Urutan: TERLAMA -> TERBARU (01 -> 07). Jangan diubah urutannya. */
const posts = [
  {
    id: "company-network-architecture",
    num: "01",
    title: "Company Network Architecture Design",
    category: "Networking / Infrastructure",
    date: "29 Agustus 2026",
    image: "images/projects/company-network.png",
    description: "Mempelajari kondisi jaringan dan membuat rancangan topologi untuk memahami distribusi koneksi, segmentasi, dan struktur jaringan antar area.",
    link: "blog/company-network-architecture.html",
    tags: ["Networking", "Infrastructure", "Routing", "VLAN"]
  },
  {
    id: "vlan-dhcp",
    num: "02",
    title: "VLAN & Centralized DHCP Simulation",
    category: "Networking",
    date: "31 Agustus 2026",
    image: "images/projects/vlan-dhcp.png",
    description: "Simulasi segmentasi jaringan menggunakan VLAN dan DHCP terpusat untuk memahami pembagian jaringan dan distribusi alamat IP.",
    link: "blog/vlan-dhcp.html",
    tags: ["Cisco", "VLAN", "DHCP", "Routing"]
  },
  {
    id: "mikrotik-network-configuration",
    num: "03",
    title: "MikroTik Network Configuration Lab",
    category: "Networking",
    date: "4 September 2026",
    image: "images/projects/mikrotik.png",
    description: "Praktik konfigurasi dasar MikroTik meliputi DHCP, NAT, bridge, VLAN, dan distribusi koneksi jaringan.",
    link: "blog/mikrotik-network-configuration.html",
    tags: ["MikroTik", "NAT", "DHCP", "Bridge", "VLAN"]
  },
  {
    id: "server-hardware-upgrade",
    num: "04",
    title: "Server Hardware Upgrade & Deployment",
    category: "Server / Infrastructure",
    date: "11 September 2026",
    image: "images/projects/server-hardware.png",
    description: "Persiapan dan peningkatan perangkat server melalui pemasangan SSD, pengecekan hardware, dan persiapan sistem sebelum virtualisasi.",
    link: "blog/server-hardware-upgrade.html",
    tags: ["Server Hardware", "SSD", "Infrastructure", "Linux"]
  },
  {
    id: "proxmox-virtualization",
    num: "05",
    title: "Proxmox Virtualization Server",
    category: "Server / Virtualization",
    date: "17 September 2026",
    image: "images/projects/proxmox.png",
    description: "Instalasi Proxmox VE dan praktik pembuatan virtual machine Debian untuk memahami dasar virtualisasi server.",
    link: "blog/proxmox-virtualization.html",
    tags: ["Proxmox VE", "Debian", "Linux", "Virtualization"]
  },
  {
    id: "ioc-threat-intelligence",
    num: "06",
    title: "IOC & Threat Intelligence Analysis",
    category: "Cyber Security",
    date: "26 September 2026",
    image: "images/projects/threat-intelligence.png",
    description: "Pembelajaran analisis Indicator of Compromise dan pemanfaatan threat intelligence untuk memahami indikator aktivitas mencurigakan.",
    link: "blog/ioc-threat-intelligence.html",
    tags: ["IOC", "Threat Intelligence", "CISA", "ThreatFox"]
  },
  {
    id: "webmin-server-administration",
    num: "07",
    title: "Webmin Server Administration Lab",
    category: "Server Administration",
    date: "5 Oktober 2026",
    image: "images/projects/webmin.png",
    description: "Praktik administrasi server Debian menggunakan Webmin untuk monitoring resource dan pengelolaan konfigurasi dasar sistem.",
    link: "blog/webmin-server-administration.html",
    tags: ["Webmin", "Debian", "Linux", "Server Administration"]
  },
  {
    id: "wireguard-tailscale-zero-trust",
    num: "08",
    title: "WireGuard, Tailscale & Zero Trust Networking",
    category: "Network Security / VPN",
    date: "12 Oktober 2026",
    image: "images/projects/wireguard-tailscale.png",
    description: "Mempelajari VPN modern menggunakan WireGuard dan Tailscale serta konsep Zero Trust untuk memahami akses jaringan yang lebih terkontrol.",
    link: "blog/wireguard-tailscale-zero-trust.html",
    tags: ["WireGuard", "Tailscale", "Zero Trust", "VPN"]
  }
];

// expose globally for script.js / inline renderers
window.posts = posts;
