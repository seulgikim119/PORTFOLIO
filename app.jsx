/* =======================================================
   APP ENTRY
   ======================================================= */
function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const saved = localStorage.getItem('tweaks-np');
      return saved ? { ...TWEAK_DEFAULTS, ...JSON.parse(saved) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const [tweakOpen, setTweakOpen] = React.useState(false);
  const [section, setSection] = React.useState(() => {
    const hash = window.location.hash.replace('#', '');
    return ['hope', 'trust', 'happiness', 'luck'].includes(hash) ? hash : null;
  });
  const [active, setActive] = React.useState('home');

  // persistence
  React.useEffect(() => {
    localStorage.setItem('tweaks-np', JSON.stringify(tweaks));
  }, [tweaks]);

  React.useEffect(() => {
    if (section) {
      window.location.hash = section;
      return;
    }

    if (window.location.hash) {
      window.history.replaceState(null, '', ' ');
    }
  }, [section]);

  window.__goTo = setSection;

  // edit-mode protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== 'object') return;
      if (e.data.type === '__activate_edit_mode') setTweakOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    setTweaks((t) => ({ ...t, [k]: v }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {!loaded && <PageLoader onDone={() => setLoaded(true)} />}
      <TopBar active={active} />
      <SideNav active={active} onJump={jump} />
      <main className="scroller">
        <SnapSection id="home" onInView={setActive}>
          <Hero onOpen={jump} cloverMode={tweaks.cloverMode} />
        </SnapSection>
        <SnapSection id="hope" leaf={LEAVES[0]} onInView={setActive} tint="var(--cream)">
          <HopeSection />
        </SnapSection>
        <SnapSection id="trust" leaf={LEAVES[1]} onInView={setActive} tint="var(--ivory)">
          <TrustSection />
        </SnapSection>
        <SnapSection id="happiness" leaf={LEAVES[2]} onInView={setActive} tint="var(--cream)">
          <HappinessSection />
        </SnapSection>
        <SnapSection id="luck" leaf={LEAVES[3]} onInView={setActive} tint="var(--sage)">
          <LuckSection />
        </SnapSection>
      </main>
      <TweakPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
