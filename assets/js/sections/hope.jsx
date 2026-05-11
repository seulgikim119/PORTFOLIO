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

