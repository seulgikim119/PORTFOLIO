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

