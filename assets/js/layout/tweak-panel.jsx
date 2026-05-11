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
