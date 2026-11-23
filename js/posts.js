/* posts.js — sumber data tunggal untuk Blog & Home latest articles.
   Urutan: TERLAMA -> TERBARU (01 -> 15). Jangan diubah urutannya. */
const posts = [
  {
    id: "company-network-architecture",
    num: "01",
    title: "Company Network Architecture Design",
    category: "Networking / Infrastructure",
    date: "29 Agustus 2026",
    image: "images/projects/company-network.webp",
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
    image: "images/projects/vlan-dhcp.webp",
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
    image: "images/projects/mikrotik.webp",
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
    image: "images/projects/server-hardware.webp",
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
    image: "images/projects/proxmox.webp",
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
    image: "images/projects/threat-intelligence.webp",
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
    image: "images/projects/webmin.webp",
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
    image: "images/projects/wireguard-tailscale.webp",
    description: "Mempelajari VPN modern menggunakan WireGuard dan Tailscale serta konsep Zero Trust untuk memahami akses jaringan yang lebih terkontrol.",
    link: "blog/wireguard-tailscale-zero-trust.html",
    tags: ["WireGuard", "Tailscale", "Zero Trust", "VPN"]
  },
  {
    id: "web-server-load-balancing",
    num: "09",
    title: "Web Server Load Balancing Lab",
    category: "Server / Networking",
    date: "23 Oktober 2026",
    image: "images/projects/web_server_load_balancing_lab.webp",
    description: "Membangun dan menguji web server load balancing dengan dua backend server serta membandingkan distribusi request melalui Round Robin, Least Connections, dan IP Hash menggunakan curl.",
    link: "blog/web-server-load-balancing.html",
    tags: ["Load Balancing", "Networking", "Server", "curl"]
  },
  {
    id: "dual-isp-failover-mikrotik",
    num: "10",
    title: "Dual ISP Failover with MikroTik CHR",
    category: "Networking / Infrastructure",
    date: "29 Oktober 2026",
    image: "images/projects/dual_isp_failover_homelab_workspace.webp",
    description: "Membangun simulasi Dual ISP menggunakan MikroTik CHR di VirtualBox serta menguji automatic failover dan recovery ketika salah satu jalur internet mengalami gangguan.",
    link: "blog/dual-isp-failover-mikrotik.html",
    tags: ["MikroTik", "ISP", "Failover", "VirtualBox", "DHCP", "NAT"]
  },
  {
    id: "virtual-dual-isp-ubuntu",
    num: "11",
    title: "Virtual Dual ISP Lab with Ubuntu Router",
    category: "Networking / Linux",
    date: "30 Oktober 2026",
    image: "images/projects/virtual_dual_isp_homelab_workspace.webp",
    description: "Membangun dua Ubuntu Server sebagai router ISP virtual menggunakan Netplan, IP forwarding, dan iptables NAT masquerade untuk menyediakan dua jalur WAN menuju MikroTik CHR.",
    link: "blog/virtual-dual-isp-ubuntu.html",
    tags: ["Ubuntu", "Netplan", "IP forwarding", "iptables", "NAT", "MikroTik"]
  },
  {
    id: "weighted-pcc-load-balancing",
    num: "12",
    title: "Weighted PCC Load Balancing 70:30",
    category: "Networking / MikroTik",
    date: "31 Oktober 2026",
    image: "images/projects/cinematic_mikrotik_pcc_load_balancing_workstation.webp",
    description: "Mengembangkan load balancing berbasis PCC dengan distribusi trafik 70:30 menggunakan 10 bucket, Firewall Mangle, connection marking, dan routing table.",
    link: "blog/weighted-pcc-load-balancing.html",
    tags: ["MikroTik", "PCC", "Load Balancing", "Firewall Mangle", "70:30"]
  },
  {
    id: "isp-quality-monitoring",
    num: "13",
    title: "ISP Quality Monitoring & Network Impairment Simulation",
    category: "Network Monitoring / Networking",
    date: "2 November 2026",
    image: "images/projects/isp_quality_monitoring_lab.webp",
    description: "Melakukan monitoring kualitas dua jalur ISP serta mensimulasikan latency dan packet loss menggunakan Linux tc netem untuk mengevaluasi perubahan kualitas koneksi.",
    link: "blog/isp-quality-monitoring.html",
    tags: ["MikroTik", "Netwatch", "tc netem", "latency", "jitter", "packet loss"]
  },
  {
    id: "adaptive-dual-wan-failover",
    num: "14",
    title: "Adaptive Dual-WAN Load Balancing & Failover on MikroTik CHR",
    category: "Networking / Network Infrastructure",
    date: "11 November 2026",
    image: "images/projects/adaptive_dual_wan_lab_workspace.webp",
    description: "Mengembangkan sistem Dual-WAN adaptif menggunakan PCC, Netwatch, RouterOS Scheduler, dan hysteresis untuk mengubah distribusi trafik 70:30 menjadi 100:0 atau 0:100 berdasarkan kondisi masing-masing ISP serta melakukan recovery otomatis ketika koneksi kembali stabil. Hands‑on lab pada lingkungan VirtualBox.",
    link: "blog/adaptive-dual-wan-failover.html",
    tags: ["MikroTik", "PCC", "Netwatch", "RouterOS Scheduler", "hysteresis", "failover"]
  },
  {
    id: "devops-learning-server-infrastructure",
    num: "15",
    title: "DevOps Learning Server Infrastructure",
    category: "Server / Infrastructure / DevOps",
    date: "20 November 2026",
    image: "images/projects/warm_homelab_proxmox_workstation.webp",
    description: "Mengembangkan lingkungan server virtual untuk pembelajaran DevOps menggunakan Proxmox VE, MikroTik CHR, Ubuntu dan Debian VM untuk Ansible, Docker/Kubernetes, storage, SSH, routing, Tailscale, firewall, dan remote access. Lingkungan hands‑on lab, bukan production Kubernetes.",
    link: "blog/devops-learning-server-infrastructure.html",
    tags: ["Proxmox VE", "MikroTik", "Ubuntu", "Debian", "Ansible", "Docker", "Kubernetes", "SSH", "Tailscale", "firewall"]
  }
];

// expose globally for script.js / inline renderers
window.posts = posts;
