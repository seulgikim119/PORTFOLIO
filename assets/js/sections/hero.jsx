function Hero({ onOpen, cloverMode }) {
  const [hover, setHover] = useState(-1);
  const [vw, setVw] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);
  const leafHitAreas = [
    { side: 'top', clipPath: 'polygon(50% 0, 100% 50%, 50% 50%, 0 50%)' },
    { side: 'right', clipPath: 'polygon(100% 50%, 50% 100%, 50% 50%, 50% 0)' },
    { side: 'bottom', clipPath: 'polygon(50% 100%, 0 50%, 50% 50%, 100% 50%)' },
    { side: 'left', clipPath: 'polygon(0 50%, 50% 0, 50% 50%, 50% 100%)' }
  ];

  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const cloverSize = Math.min(720, vw > 1100 ? vw * 1 : vw * 1);
  const cloverRotation = hover >= 0 ? hover * -90 : 0;

  return (
    <div className="hero_wrap">
      <div className="hero_grid">
        <div>
          <div className="hero_available reveal">
            <span className="hero_available_dot" />
            <span className="mono">AVAILABLE FOR WORK</span>
          </div>
          <div className="mono reveal hero_kicker">
            PORTFOLIO - UX/UI DESIGNER - 2026
          </div>
          <h1 className="serif reveal d1 hero_title">
          경험을 수집하고, 구조화하여, 의사결정으로 연결하는 디자이너 김슬기입니다.
          </h1>
          {/* <p className="reveal d2 hero_desc">
            Hoping for clarity, building trust with structure, and delivering joyful flow.
            Four-leaf storytelling meets practical interaction design.
          </p> */}

          <div className="hero_chip_row reveal d2">
            {SERVICE_TAGS.map((tag) =>
            <span key={tag} className="hero_chip">{tag}</span>
            )}
          </div>

          <div className="reveal d3" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LEAVES.map((l, i) =>
            <button
              key={l.key}
              className="leaf_row"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              onBlur={() => setHover(-1)}
              onClick={() => onOpen(l.key)}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>
                  0{i + 1}
                </span>
                <span className="leaf_row_label">
                  <span className="serif" style={{ fontSize: 20 }}>{l.label}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{l.sub}</span>
                </span>
                <span className="leaf_row_arrow">-&gt;</span>
              </button>
            )}
            <div style={{ borderTop: '1px solid var(--line)' }} />
          </div>
        </div>

        <div
          className="reveal d2 hero_clover_zone">
          <div
            className="hero_clover_float">
            <div className="hero_clover_glow" />
            <svg width={cloverSize * 1.15} height={cloverSize * 1.15} viewBox="0 0 640 640" style={{ position: 'absolute' }}>
              <circle cx="320" cy="320" r="280" fill="none" stroke="var(--line)" strokeDasharray="2 6" opacity="0.5" />
              <circle cx="320" cy="320" r="220" fill="none" stroke="var(--line)" strokeDasharray="2 6" opacity="0.35" />
            </svg>

            <Clover
              mode={cloverMode}
              size={cloverSize}
              activeIdx={hover}
              rotation={cloverRotation}
              smooth={true}
              />

            <div className="hero_clover_hit_map" aria-label="Clover section links">
              {leafHitAreas.map((area, i) =>
              <button
                key={area.side}
                type="button"
                className="hero_clover_hit"
                aria-label={`${LEAVES[i].label} section`}
                onMouseEnter={() => setHover(i)}
                onFocus={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                onBlur={() => setHover(-1)}
                onClick={() => onOpen(LEAVES[i].key)}
                style={{ clipPath: area.clipPath }}
              />
              )}
            </div>

            <div className="hero_active_pill">
              {hover >= 0 ?
              <span>
                  <b className="serif" style={{ fontSize: 14 }}>{LEAVES[hover].label}</b>
                  <span style={{ color: 'var(--ink-mute)', margin: '0 8px' }}>|</span>
                  <span>{LEAVES[hover].ko}</span>
                </span> :
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-mute)' }}>
                  잎을 올리거나 스크롤해보세요
                </span>
              }
            </div>
          </div>
        </div>
      </div>
    </div>);

}

/* =======================================================
   TWEAK PANEL
   ======================================================= */
