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

