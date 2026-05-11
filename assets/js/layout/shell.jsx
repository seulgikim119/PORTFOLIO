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
        padding: 'clamp(112px, 13vh, 140px) clamp(24px, 6vw, 120px) clamp(24px, 8vh, 96px)',
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
