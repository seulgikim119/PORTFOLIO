const { useState, useEffect, useRef } = React;

/* =======================================================
   PAGE LOADER
   ethicallifeworld.com 필름스트립 로딩 시퀀스 참조
   ======================================================= */
function PageLoader({ onDone }) {
  const [exit, setExit] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setExit(true), 1900);
    const t2 = setTimeout(onDone, 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);
  return (
    <div className={`page_loader${exit ? ' page_loader__exit' : ''}`}>
      <div className="page_loader_inner">
        <div className="page_loader_letters">
          {'SEULGI'.split('').map((ch, i) => (
            <span
              key={i}
              className="page_loader_ch serif"
              style={{ animationDelay: `${i * 85}ms` }}>
              {ch}
            </span>
          ))}
        </div>
        <div className="page_loader_track">
          <div className="page_loader_fill" />
        </div>
        <p className="mono page_loader_label">UX · UI DESIGNER · PORTFOLIO · 2026</p>
      </div>
    </div>
  );
}

/* =======================================================
   COMPONENTS
   ======================================================= */
function CloverPhoto({ size = 560, activeIdx = -1, rotation = 0, smooth = false }) {
  const pivotX = '50%';
  const pivotY = '50%';
  return (
    <div style={{ width: size, height: size, position: 'relative', overflow: 'visible' }}>
      <div style={{
        position: 'absolute', inset: 0,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: `${pivotX} ${pivotY}`,
        transition: smooth ? 'transform 700ms cubic-bezier(.22,.8,.2,1)' : 'none'
      }}>
        <img
          src="assets/clover.png"
          alt="clover"
          draggable={false}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
            userSelect: 'none',
            filter: activeIdx >= 0 ?
            'drop-shadow(0 18px 28px rgba(78,154,68,0.28))' :
            'drop-shadow(0 8px 18px rgba(78,154,68,0.18))',
            transition: 'filter 450ms'
          }} />
      </div>
    </div>);

}

function CloverSvg({ size = 560, activeIdx = -1, rotation = 0 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
    style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 900ms cubic-bezier(.22,.8,.2,1)' }}>
      <defs>
        {LEAVES.map((l, i) =>
        <radialGradient key={i} id={`lg${i}`} cx="30%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#C8E6BE" />
            <stop offset="45%" stopColor={l.hue} />
            <stop offset="100%" stopColor="#3E7A35" />
          </radialGradient>
        )}
      </defs>
      {LEAVES.map((l, i) => {
        const active = activeIdx === i;
        const dim = activeIdx >= 0 && !active;
        // heart-leaf shape pointing up, rotated to angle+45
        const tx = cx;
        const ty = cy;
        return (
          <g key={l.key}
          transform={`translate(${tx},${ty}) rotate(${l.angle + 45})`}
          style={{
            transition: 'all 450ms cubic-bezier(.22,.8,.2,1)',
            opacity: dim ? 0.45 : 1,
            filter: active ? 'drop-shadow(0 14px 22px rgba(78,154,68,0.4))' : 'drop-shadow(0 4px 10px rgba(78,154,68,0.15))'
          }}>
            
            <g transform={active ? 'translate(0,-10) scale(1.05)' : ''}
            style={{ transition: 'transform 450ms cubic-bezier(.22,.8,.2,1)', transformOrigin: '0 0' }}>
              {/* heart leaf */}
              <path
                d={`M 0 0
                    C -${r * 0.1} -${r * 0.4}, -${r * 0.9} -${r * 0.5}, -${r * 0.75} -${r * 1.1}
                    C -${r * 0.65} -${r * 1.55}, -${r * 0.2} -${r * 1.6}, 0 -${r * 1.25}
                    C ${r * 0.2} -${r * 1.6}, ${r * 0.65} -${r * 1.55}, ${r * 0.75} -${r * 1.1}
                    C ${r * 0.9} -${r * 0.5}, ${r * 0.1} -${r * 0.4}, 0 0 Z`}
                fill={`url(#lg${i})`}
                stroke="#3E7A35"
                strokeWidth="0.8"
                strokeOpacity="0.3" />
              
              {/* vein */}
              <path d={`M 0 -4 L 0 -${r * 1.15}`} stroke="#3E7A35" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
              {/* highlight */}
              <ellipse cx={-r * 0.28} cy={-r * 0.85} rx={r * 0.18} ry={r * 0.35}
              fill="white" opacity="0.35" transform={`rotate(-18 ${-r * 0.28} ${-r * 0.85})`} />
            </g>
          </g>);

      })}
      {/* center */}
      <circle cx={cx} cy={cy} r={8} fill="#2E5E2A" />
      <circle cx={cx - 2} cy={cy - 2} r={3} fill="#8ECB7F" opacity="0.8" />
    </svg>);

}

function CloverLine({ size = 560, activeIdx = -1, rotation = 0 }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
    style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 900ms cubic-bezier(.22,.8,.2,1)' }}>
      {LEAVES.map((l, i) => {
        const active = activeIdx === i;
        const dim = activeIdx >= 0 && !active;
        return (
          <g key={l.key}
          transform={`translate(${cx},${cy}) rotate(${l.angle + 45})`}
          style={{
            transition: 'all 450ms cubic-bezier(.22,.8,.2,1)',
            opacity: dim ? 0.3 : 1
          }}>
            
            <g transform={active ? 'translate(0,-8)' : ''}
            style={{ transition: 'transform 450ms cubic-bezier(.22,.8,.2,1)' }}>
              <path
                d={`M 0 0
                    C -${r * 0.1} -${r * 0.4}, -${r * 0.9} -${r * 0.5}, -${r * 0.75} -${r * 1.1}
                    C -${r * 0.65} -${r * 1.55}, -${r * 0.2} -${r * 1.6}, 0 -${r * 1.25}
                    C ${r * 0.2} -${r * 1.6}, ${r * 0.65} -${r * 1.55}, ${r * 0.75} -${r * 1.1}
                    C ${r * 0.9} -${r * 0.5}, ${r * 0.1} -${r * 0.4}, 0 0 Z`}
                fill={active ? '#E8EDDF' : 'transparent'}
                stroke="#2B3A2E"
                strokeWidth="1.4" />
              
              <path d={`M 0 -4 L 0 -${r * 1.15}`} stroke="#2B3A2E" strokeOpacity="0.4" strokeWidth="1" fill="none" />
            </g>
          </g>);

      })}
      <circle cx={cx} cy={cy} r={4} fill="#2B3A2E" />
    </svg>);

}

function Clover(props) {
  if (props.mode === 'svg') return <CloverSvg {...props} />;
  if (props.mode === 'line') return <CloverLine {...props} />;
  return <CloverPhoto {...props} />;
}


const SERVICE_TAGS = [
  '#UXUI',
  '#ResponsiveWeb',
  '#BrandStory',
  '#DesignSystem',
  '#Interaction',
  '#Frontend'
];

function LoopTicker({ items, className = '' }) {
  const list = [...items, ...items];
  return (
    <div className={`loop_ticker ${className}`}>
      <div className="loop_track">
        {list.map((item, i) =>
        <span key={`${item}-${i}`} className="loop_item mono">{item}</span>
        )}
      </div>
    </div>);

}
/* =======================================================
   SECTIONS
   ======================================================= */
