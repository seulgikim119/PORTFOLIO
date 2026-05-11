const NAV_ITEMS = [
  { id: 'home', num: '00', label: 'Home', file: 'assets/js/sections/hero.jsx' },
  { id: 'hope', num: '01', label: 'Hope', file: 'assets/js/sections/hope.jsx' },
  { id: 'trust', num: '02', label: 'Trust', file: 'assets/js/sections/projects.jsx' },
  { id: 'happiness', num: '03', label: 'Happiness', file: 'assets/js/sections/happiness.jsx' },
  { id: 'luck', num: '04', label: 'Luck', file: 'assets/js/sections/luck.jsx' }
];

function TopBar({ active, onJump }) {
  const current = String(active || 'home').toUpperCase();
  return (
    <header className="topbar">
      <a
        href="#home"
        onClick={(e) => { e.preventDefault(); onJump('home'); }}
        className="topbar_brand"
        aria-label="Go to home">
        <MiniLeaf size={22} />
        <span className="topbar_name serif">SEULGI</span>
        <span className="topbar_meta mono">4 LEAVES | PORTFOLIO</span>
      </a>

      <nav className="topbar_nav" aria-label="Portfolio sections">
        {NAV_ITEMS.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`topbar_nav_link ${active === it.id ? 'active' : ''}`}
            title={it.file}
            onClick={(e) => { e.preventDefault(); onJump(it.id); }}>
            <span className="mono">{it.num}</span>
            <span>{it.label}</span>
          </a>
        ))}
      </nav>

      <div className="topbar_status">
        <span className="topbar_status_dot" />
        <span className="mono">SEOUL | 2026 | {current}</span>
      </div>
    </header>
  );
}
