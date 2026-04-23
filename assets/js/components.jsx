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
const TOOLS = [
  'Figma', 'FigJam', 'HTML', 'CSS',
  'JS', 'chatGPT', 'CLAUDE', 'Photoshop', 'After Effects'
];

function HopeSection() {
  return (
    <SectionShell eyebrow="01 · Hope" title="경험을 수집하고, 구조화하여, 의사결정으로 연결하는 디자이너">
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(24px, 3vw, 48px)',
        marginTop: 'clamp(16px, 2.4vh, 32px)'
      }}>
        <div>
          <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.65, color: 'var(--ink)', marginBottom: 'clamp(14px, 2vh, 24px)' }}>
            수많은 일상 속에서 '진짜 문제'를 발견하는 일은 마치 풀밭에서 네잎클로버를 찾는 과정과 닮았다고 생각합니다.<br />
             사소한 단서들을 모아 탄탄한 설계도를 그리고, 데이터와 사용자 사이의 막힘없는 흐름을 만들어<br />
            흩어져 있던 경험들이 모아 하나의 시스템으로, 비즈니스에 꼭 필요한 기분 좋은 변화가 시작됩니다.
          </p>
          <div style={{ marginTop: 'clamp(18px, 3vh, 36px)', borderLeft: '2px solid var(--clover)', paddingLeft: 'clamp(14px, 1.6vw, 20px)' }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.12em', color: 'var(--ink-mute)', marginBottom: 8 }}>
              UX APPROACH
            </div>
            <div className="serif" style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', lineHeight: 1.35, color: 'var(--ink)' }}>
              "숫자로 가설을 세우고<br />
              관찰로 결론을 증명합니다."
            </div>
          </div>
        </div>
        <div>
          <ValueRow num="01" k="문제를 바라보는 방식"
          v="겉으로 드러난 현상보다 행동의 맥락을 먼저 봅니다. 사용자가 말하지 않는 불편에서 문제의 본질을 찾습니다." />
          <ValueRow num="02" k="가치관"
          v="정답보다 좋은 질문을, 빠른 구현보다 정확한 정의를 우선합니다. 디자인은 해결책의 조합이 아니라 문제 정의의 총합이라고 믿습니다." />
          <ValueRow num="03" k="협업 자세"
          v="기획·PM·개발과 같은 목표를 공유하고 같은 언어로 대화합니다. 결과물이 아니라 과정까지 신뢰받는 디자이너를 지향합니다." />
        </div>
      </div>

      {/* 크레덴셜 툴 스트립 — ethicallifeworld.com "Pharmacist Formulated" 섹션 참조 */}
      <div className="credential_strip">
        <div className="credential_header">
          <span className="credential_badge">
            <span className="credential_badge_dot" />
            VERIFIED SKILLS
          </span>
          <span className="credential_label">TOOLS &amp; METHODS</span>
        </div>
        <div className="credential_pills">
          {TOOLS.map((t) => (
            <span key={t} className="credential_pill">{t}</span>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function ValueRow({ num, k, v }) {
  return (
    <div style={{ padding: 'clamp(14px, 2.3vh, 24px) 0', borderTop: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--clover-deep)' }}>{num}</span>
        <div style={{ flex: 1 }}>
          <div className="serif" style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', marginBottom: 6, color: 'var(--ink)' }}>{k}</div>
          <div style={{ fontSize: 'clamp(13px, 1.1vw, 14px)', lineHeight: 1.65, color: 'var(--ink-soft)' }}>{v}</div>
        </div>
      </div>
    </div>);

}

function TrustSection() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  const hasSiteLink = Boolean(p.siteUrl && p.siteUrl !== '#');
  return (
    <SectionShell eyebrow="02 · Trust" title="문제를 구조화해 신뢰 가능한 경험을 만듭니다">
      <LoopTicker items={SERVICE_TAGS} className="trust_ticker" />
      <div className="trust_layout">
        <div className="trust_rail">
          {PROJECTS.map((pr, i) =>
          <button
            key={i}
            className={`trust_card ${active === i ? 'active' : ''}`}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}>
              <span className="mono trust_card_index">{String(i + 1).padStart(2, '0')}</span>
              <span className="trust_card_title">{pr.title}</span>
              <span className="trust_card_tag">{pr.tag}</span>
            </button>
          )}
        </div>

        <div className="trust_detail">
          <div key={active} className="trust_detail_content" style={{ animation: 'fadeSlide 320ms cubic-bezier(.22,.8,.2,1)' }}>
            <div className="trust_visual">
              <div className="mono trust_visual_label">{p.tag}</div>
            </div>

            <div className="mono trust_detail_tag">{p.tag}</div>
            <h3 className="serif trust_detail_title">{p.title}</h3>
            <div className="trust_link_row">
              <a
                href={p.siteUrl || '#'}
                target={hasSiteLink ? '_blank' : undefined}
                rel={hasSiteLink ? 'noreferrer noopener' : undefined}
                className={`trust_link_btn ${hasSiteLink ? '' : 'is_disabled'}`}
                onClick={(e) => {if (!hasSiteLink) e.preventDefault();}}>
                사이트 바로가기
              </a>
            </div>

            <ProjectRow k="Problem" v={p.problem} />
            <ProjectRow k="Hypothesis" v={p.hypothesis} />
            <ProjectRow k="Solution" v={p.solution} />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
function ProjectRow({ k, v }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: 'clamp(10px, 1.8vh, 14px) 0', borderTop: '1px solid var(--line)' }}>
      <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.08em', paddingTop: 3 }}>
        {k.toUpperCase()}
      </div>
      <div style={{ fontSize: 'clamp(13px, 1.25vw, 15px)', lineHeight: 1.65, color: 'var(--ink)' }}>{v}</div>
    </div>);

}

function HappinessSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle → entering → active
  const pointerStartX = useRef(null);
  const pointerDeltaX = useRef(0);
  const totalCards = HOBBIES.length;

  const clampIndex = (idx) => Math.max(0, Math.min(totalCards - 1, idx));
  const moveCard = (next) => setActiveCard((prev) => clampIndex(typeof next === 'function' ? next(prev) : next));

  // 섹션이 화면 중앙에 오면 카드 자동 등장, 스크롤은 통과
  useEffect(() => {
    if (phase !== 'idle') return;
    const section = document.getElementById('happiness');
    if (!section) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.85) {
          setPhase('entering');
          setTimeout(() => setPhase('active'), 820);
          io.disconnect();
        }
      });
    }, { threshold: [0.85] });
    io.observe(section);
    return () => io.disconnect();
  }, [phase]);

  const onPointerDown = (e) => {
    if (phase !== 'active') return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerStartX.current = e.clientX;
    pointerDeltaX.current = 0;
    setDragging(true);
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (pointerStartX.current == null) return;
    pointerDeltaX.current = e.clientX - pointerStartX.current;
  };

  const onPointerEnd = () => {
    if (phase === 'active' && pointerStartX.current != null) {
      const threshold = 48;
      if (pointerDeltaX.current <= -threshold) moveCard((prev) => prev + 1);
      if (pointerDeltaX.current >= threshold) moveCard((prev) => prev - 1);
    }
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    setDragging(false);
  };

  const cardRole = (idx) => {
    if (idx === activeCard) return 'active';
    if (idx === activeCard - 1) return 'prev';
    if (idx === activeCard + 1) return 'next';
    return 'hidden';
  };

  const getInitial = (label = '') => String(label).trim().slice(0, 1).toUpperCase() || '?';

  const isEntered = phase !== 'idle';
  const isEntryMotion = phase === 'entering';

  return (
    <SectionShell eyebrow="03 · Happiness" title="일상에서 발견한 감각의 기록">
      <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex' }}>
        <div className="happiness_stage_wrap">
          <div className="happiness_glow" />
          <div className="happiness_bg_copy serif">
            <span>REAL PEOPLE</span>
            <span>REAL RESULTS</span>
          </div>

          <div
            className="happiness_card_layer"
            style={{ cursor: phase === 'active' ? (dragging ? 'grabbing' : 'grab') : 'default' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={onPointerEnd}
            onLostPointerCapture={onPointerEnd}>
            {HOBBIES.map((h, i) => {
              const role = cardRole(i);
              return (
                <article
                  key={i}
                  className={`happiness_card ${role} ${h.tone === 'lime' ? 'tone_lime' : 'tone_light'} ${isEntered ? 'is_entered' : ''} ${isEntryMotion ? 'is_entry_motion' : ''}`}
                  style={{ '--enter-rot': `${-18 + i * 18}deg`, '--enter-delay': `${i * 90}ms` }}>
                  <div className={`happiness_card_media ${h.imageUrl ? 'has_image' : 'is_empty'}`}>
                    {h.imageUrl ?
                    <img src={h.imageUrl} alt={h.imageAlt || h.title} loading="lazy" /> :
                    null}
                  </div>
                  <h3 className="happiness_card_title">{h.title}</h3>
                  <p className="happiness_card_desc">"{h.note}"</p>
                  <div className="happiness_card_footer">
                    <span className="happiness_card_avatar">{getInitial(h.title)}</span>
                    <span>{h.location || 'Seoul, KR'}</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="happiness_stage_ui">
            <div className="happiness_proof_indicator" aria-hidden="true">
              {HOBBIES.map((_, i) => (
                <span key={i} className={`happiness_proof_dot ${i === activeCard ? 'active' : ''}`} />
              ))}
            </div>
            <div className="mono happiness_proof_guide">드래그로 탐색</div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function LuckSection() {
  return (
    <SectionShell eyebrow="04 · Luck" title="연결되면 좋은 일이 시작됩니다">
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(24px, 4vw, 56px)', marginTop: 'clamp(16px, 2.4vh, 32px)' }}>
        <div>
          <div className="serif" style={{ fontSize: 'clamp(30px, 3.6vw, 42px)', lineHeight: 1.22, color: 'var(--ink)', marginBottom: 'clamp(14px, 2.2vh, 28px)' }}>
            함께 문제를 정의하고<br />
            해결이 필요하다면<br />
            <span style={{ color: 'var(--clover-deep)' }}>언제든 편하게 연락 주세요</span>
          </div>
          <p style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 420 }}>
            UX·UI 전반의 리디자인 / 신규 서비스 설계 / 리서치 파트너십 /
            웹사이트·프로덕트 작업 제안 모두 환영합니다.
          </p>
        </div>
        <div>
          <ContactRow k="Email" v="hello@yourname.kr" href="mailto:hello@yourname.kr" />
          <ContactRow k="LinkedIn" v="linkedin.com/in/yourname" href="#" />
          <ContactRow k="Behance" v="behance.net/yourname" href="#" />
          <ContactRow k="Instagram" v="@yourname.design" href="#" />
          <div style={{
            marginTop: 40, padding: '20px 24px',
            border: '1px dashed var(--line)', borderRadius: 4,
            display: 'flex', gap: 16, alignItems: 'center'
          }}>
            <div style={{ fontSize: 28 }}>🍀</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
              작은 신뢰가 모이면 큰 성과가 됩니다.<br />
              당신과의 연결이 그 시작이면 좋겠습니다.
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function ContactRow({ k, v, href }) {
  return (
    <a href={href} style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: 'clamp(12px, 2vh, 20px) 0', borderTop: '1px solid var(--line)',
      textDecoration: 'none', color: 'var(--ink)',
      transition: 'all 200ms'
    }}
    onMouseEnter={(e) => {e.currentTarget.style.paddingLeft = '12px';e.currentTarget.style.background = 'var(--sage)';}}
    onMouseLeave={(e) => {e.currentTarget.style.paddingLeft = '0';e.currentTarget.style.background = 'transparent';}}>
      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.12em' }}>
        {k.toUpperCase()}
      </span>
      <span style={{ fontSize: 16, color: 'var(--ink)' }}>{v}</span>
    </a>
  );
}

function SectionShell({ eyebrow, title, children, onBodyWheelCapture }) {
  return (
    <div className="section_shell" style={{ maxWidth: 960, width: '100%', margin: '0 auto', padding: 'clamp(20px, 3.5vh, 48px) 8px clamp(12px, 2.3vh, 24px)', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--clover-deep)', marginBottom: 14 }}>
        {eyebrow.toUpperCase()}
      </div>
      <h2 className="serif" style={{ fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.2, color: 'var(--ink)', maxWidth: 720, marginBottom: 'clamp(10px, 2vh, 18px)' }}>
        {title}
      </h2>
      <div className="section_shell_body" onWheelCapture={onBodyWheelCapture} style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>);

}

const SECTION_MAP = {
  hope: HopeSection,
  trust: TrustSection,
  happiness: HappinessSection,
  luck: LuckSection
};

/* =======================================================
   REVEAL HOOK - IntersectionObserver based
   ======================================================= */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((n) => n.classList.add('in'));
          io.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* =======================================================
   SECTION WRAPPER - full viewport, snap target, reveal on enter
   ======================================================= */
function SnapSection({ id, leaf, onInView, children, tint }) {
  const ref = useReveal();
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.5) onInView(id);
      });
    }, { threshold: [0.5, 0.75] });
    io.observe(el);
    return () => io.disconnect();
  }, [id, onInView]);

  return (
    <section
      id={id}
      ref={(n) => { rootRef.current = n; ref.current = n; }}
      className="snap_section"
      data-screen-label={leaf ? `${leaf.label} · ${leaf.ko}` : 'Home'}
      style={{
        background: tint || 'var(--cream)',
        padding: 'clamp(76px, 10vh, 120px) clamp(24px, 6vw, 120px) clamp(24px, 8vh, 96px)',
        display: 'flex',
        alignItems: 'stretch'
      }}>
      <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', height: '100%', minHeight: 0, display: 'flex' }}>
        {children}
      </div>
    </section>
  );
}

/* =======================================================
   OVERLAY (section panel) - legacy, unused in scroll layout
   ======================================================= */
function Overlay_Legacy({ sectionKey, onClose }) {
  const Section = SECTION_MAP[sectionKey];
  const leaf = LEAVES.find((l) => l.key === sectionKey);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [onClose]);

  if (!Section || !leaf) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(43,58,46,0.18)',
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 300ms'
      }}
      onClick={onClose}>
      
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: 'min(1100px, 92vw)',
          background: 'var(--cream)',
          overflowY: 'auto',
          boxShadow: '-40px 0 80px rgba(43,58,46,0.18)',
          animation: 'slideIn 520ms cubic-bezier(.22,.8,.2,1)'
        }}
        data-screen-label={`Section · ${leaf.label}`}>
        
        {/* top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 2,
          background: 'var(--cream)',
          borderBottom: '1px solid var(--line)',
          padding: '20px 48px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <MiniLeaf hue={leaf.hue} />
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.14em' }}>
                LEAF · {leaf.label.toUpperCase()}
              </div>
              <div className="serif" style={{ fontSize: 16, color: 'var(--ink)' }}>{leaf.ko}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="close"
            style={{
              background: 'transparent', border: '1px solid var(--line)',
              width: 36, height: 36, borderRadius: '50%',
              cursor: 'pointer', color: 'var(--ink)',
              fontSize: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
            ×          </button>
        </div>

        <div style={{ padding: '40px 48px 80px' }}>
          <Section />
        </div>

        {/* bottom nav - next leaves */}
        <div style={{
          padding: '24px 48px 40px',
          borderTop: '1px solid var(--line)',
          display: 'flex', gap: 12, justifyContent: 'center',
          background: 'var(--cream-deep)'
        }}>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--ink-mute)', alignSelf: 'center', marginRight: 12 }}>
            EXPLORE OTHER LEAVES →          </div>
          {LEAVES.filter((l) => l.key !== sectionKey).map((l) =>
          <a key={l.key} href={`#${l.key}`}
          onClick={(e) => {e.preventDefault();window.__goTo(l.key);}}
          style={{
            padding: '10px 16px',
            background: 'var(--cream)',
            border: '1px solid var(--line)',
            borderRadius: 999,
            fontSize: 13,
            color: 'var(--ink)',
            textDecoration: 'none',
            display: 'flex', gap: 8, alignItems: 'center',
            transition: 'all 200ms'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--sage)';e.currentTarget.style.borderColor = 'var(--clover)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = 'var(--cream)';e.currentTarget.style.borderColor = 'var(--line)';}}>
            
              <MiniLeaf hue={l.hue} size={14} />
              <span>{l.label}</span>
              <span style={{ color: 'var(--ink-mute)', fontSize: 11 }}>{l.ko}</span>
            </a>
          )}
        </div>
      </div>
    </div>);

}

function MiniLeaf({ hue = '#6FB860', size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 3 C13 6, 16 6, 16 9 C16 11, 14 12, 12 12 C10 12, 8 11, 8 9 C8 6, 11 6, 12 3 Z" fill={hue} />
      <path d="M12 12 L12 21" stroke="#3E7A35" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>);

}

/* =======================================================
   HERO / HOME
   ======================================================= */
function Hero({ onOpen, cloverMode }) {
  const [hover, setHover] = useState(-1);
  const [vw, setVw] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const onR = () => setVw(window.innerWidth);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  const cloverSize = Math.min(560, vw > 1100 ? vw * 1 : vw * 1);

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
              onMouseLeave={() => setHover(-1)}
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
              rotation={0}
              smooth={true}
              />

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
function TweakPanel({ open, tweaks, setTweak }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', right: 24, bottom: 24, zIndex: 200,
      width: 280,
      background: 'var(--ivory)',
      border: '1px solid var(--line)',
      borderRadius: 8,
      boxShadow: '0 12px 32px rgba(43,58,46,0.18)',
      padding: '18px 20px 20px',
      fontFamily: 'inherit'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <div className="serif" style={{ fontSize: 16, color: 'var(--ink)' }}>Tweaks</div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>LIVE</div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', marginBottom: 8, letterSpacing: '0.1em' }}>
          CLOVER STYLE
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {[
          { k: 'photo', label: '3D Photo' },
          { k: 'svg', label: 'Illustrated' },
          { k: 'line', label: 'Line' }].
          map((o) =>
          <button key={o.k}
          onClick={() => setTweak('cloverMode', o.k)}
          style={{
            padding: '10px 6px',
            fontSize: 11,
            background: tweaks.cloverMode === o.k ? 'var(--clover)' : 'var(--cream)',
            color: tweaks.cloverMode === o.k ? 'white' : 'var(--ink)',
            border: '1px solid ' + (tweaks.cloverMode === o.k ? 'var(--clover-deep)' : 'var(--line)'),
            borderRadius: 4,
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}>
              {o.label}
            </button>
          )}
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--ink-mute)', lineHeight: 1.5, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
        클로버 표현 방식을 3가지 스타일로 비교해보세요.
      </div>
    </div>);

}

/* =======================================================
   SIDE NAV + TOP BAR
   ======================================================= */
function SideNav({ active, onJump }) {
  const items = [
    { id: 'home', num: '00', label: 'HOME' },
    { id: 'hope', num: '01', label: 'HOPE' },
    { id: 'trust', num: '02', label: 'TRUST' },
    { id: 'happiness', num: '03', label: 'HAPPINESS' },
    { id: 'luck', num: '04', label: 'LUCK' }
  ];
  return (
    <nav className="side_nav">
      {items.map((it) => (
        <a key={it.id} href={`#${it.id}`}
          onClick={(e) => { e.preventDefault(); onJump(it.id); }}
          className={`side_nav_dot ${active === it.id ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}>
          <span className="bar" />
          <span className="lbl">{it.num} · {it.label}</span>
        </a>
      ))}
    </nav>
  );
}

function TopBar({ active }) {
  const current = String(active || 'home').toUpperCase();
  return (
    <header className="topbar">
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <MiniLeaf size={22} />
        <span className="serif" style={{ fontSize: 16, color: 'var(--ink)' }}>SEULGI</span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.14em' }}>
          4 LEAVES | PORTFOLIO
        </span>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--clover)' }} />
        <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.14em' }}>
          SEOUL | 2026 | {current}
        </span>
      </div>
    </header>
  );
}

/* =======================================================
   APP - scroll narrative
   ======================================================= */
