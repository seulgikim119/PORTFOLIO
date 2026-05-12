function TrustSection() {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const wheelLockUntil = useRef(0);
  const wheelDeltaY = useRef(0);
  const lastMoveDirection = useRef(0);
  const directionGuardUntil = useRef(0);
  const p = PROJECTS[active];

  const getCardRole = (idx) => {
    if (idx === active) return 'active';
    if (idx < active) return 'prev';
    if (idx === active + 1) return 'next';
    return 'hidden';
  };

  useEffect(() => {
    const isProjectSectionLocked = () => {
      const stage = stageRef.current;
      if (!stage) return false;

      const section = stage.closest('.snap_section') || stage;
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight * 0.08 && rect.bottom >= window.innerHeight * 0.25;
    };

    const onProjectWheel = (e) => {
      if (!isProjectSectionLocked()) return;

      const direction = Math.sign(e.deltaY);
      const atStart = active === 0;
      const atEnd = active === PROJECTS.length - 1;

      if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
        wheelDeltaY.current = 0;
        return;
      }

      if (e.cancelable !== false) e.preventDefault();
      if (e.stopPropagation) e.stopPropagation();

      const now = Date.now();
      if (now < wheelLockUntil.current || direction === 0) return;

      if (
        lastMoveDirection.current !== 0 &&
        direction !== lastMoveDirection.current &&
        now < directionGuardUntil.current
      ) {
        wheelDeltaY.current = 0;
        return;
      }

      wheelDeltaY.current += e.deltaY;
      if (Math.abs(wheelDeltaY.current) < 42) return;

      const moveDirection = wheelDeltaY.current > 0 ? 1 : -1;
      setActive((prev) => Math.max(0, Math.min(PROJECTS.length - 1, prev + moveDirection)));
      lastMoveDirection.current = moveDirection;
      directionGuardUntil.current = now + 980;
      wheelDeltaY.current = 0;
      wheelLockUntil.current = now + 620;
    };

    window.addEventListener('wheel', onProjectWheel, { passive: false, capture: true });
    return () => window.removeEventListener('wheel', onProjectWheel, true);
  }, [active]);

  return (
    <SectionShell
      eyebrow="02 \u00B7 Trust"
      title="\uBB38\uC81C\uB97C \uAD6C\uC870\uD654\uD574 \uC2E0\uB8B0 \uAC00\uB2A5\uD55C \uACBD\uD5D8\uC744 \uB9CC\uB4ED\uB2C8\uB2E4">
      <div className="project_stage" ref={stageRef}>
        <div className="project_title_panel reveal">
          <div key={active} className="project_title_content">
            <span>{p.tag}</span>
            <h3>{p.title}</h3>
          </div>
        </div>

        <div className="project_card_viewport reveal d2">
          {PROJECTS.map((pr, i) => {
            const hasSiteLink = Boolean(pr.siteUrl && pr.siteUrl !== '#');
            const hasPlanLink = Boolean(pr.planUrl && pr.planUrl !== '#');
            return (
              <article
                key={i}
                className={`project_rotate_card ${getCardRole(i)}`}
                aria-hidden={i !== active}>
                <div className="project_card_header">
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <span>{pr.tag}</span>
                </div>
                <div className="project_card_body">
                  <h3>{pr.title}</h3>
                  <div className="project_rows">
                    <ProjectRow k="Problem" v={pr.problem} />
                    <ProjectRow k="Hypothesis" v={pr.hypothesis} />
                    <ProjectRow k="Solution" v={pr.solution} />
                  </div>
                  {pr.imageUrl ? (
                    <div className="project_card_media">
                      <img src={pr.imageUrl} alt={pr.imageAlt || pr.title} loading="lazy" />
                    </div>
                  ) : null}
                </div>
                <div className="project_card_footer">
                  <span>{pr.work}</span>
                  <div className="project_link_group">
                    <a
                      href={pr.siteUrl || '#'}
                      target={hasSiteLink ? '_blank' : undefined}
                      rel={hasSiteLink ? 'noopener noreferrer' : undefined}
                      className={`trust_link_btn ${hasSiteLink ? '' : 'is_disabled'}`}
                      onClick={(e) => {if (!hasSiteLink) e.preventDefault();}}>
                      {'\uD648\uD398\uC774\uC9C0\uB85C \uC774\uB3D9'}
                    </a>
                    <a
                      href={pr.planUrl || '#'}
                      target={hasPlanLink ? '_blank' : undefined}
                      rel={hasPlanLink ? 'noopener noreferrer' : undefined}
                      className={`trust_link_btn trust_link_btn_secondary ${hasPlanLink ? '' : 'is_disabled'}`}
                      onClick={(e) => {if (!hasPlanLink) e.preventDefault();}}>
                      {'\uAE30\uD68D\uC11C \uBCF4\uAE30'}
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="project_progress" aria-hidden="true">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active ? 'active' : ''}
              onClick={() => setActive(i)}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function ProjectRow({ k, v }) {
  return (
    <div className="project_info_row">
      <div className="mono">
        {k.toUpperCase()}
      </div>
      <p>{v}</p>
    </div>);
}
