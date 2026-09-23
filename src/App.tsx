import { useState } from "react";

type IconName = "crosshair" | "shield" | "settings" | "user" | "server" | "play" | "power" | "globe" | "cpu" | "code";
type View = "launch" | "customize" | "options";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    crosshair: <><circle cx="12" cy="12" r="7" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /><circle cx="12" cy="12" r="1" /></>,
    shield: <><path d="M12 3 5 6v5c0 4.4 2.8 7.6 7 9.5 4.2-1.9 7-5.1 7-9.5V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l-2.8 2.8a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-2 .4L4.2 17a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 3 14v-4a1.8 1.8 0 0 0 1.6-1A1.8 1.8 0 0 0 4.2 7L7 4.2a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10 3h4a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.4L19.8 7a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1v4a1.8 1.8 0 0 0-1.6 1Z" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.7-4.2 3.3-6 8-6s7.3 1.8 8 6" /></>,
    server: <><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="14" width="18" height="6" rx="1" /><path d="M7 7h.01M7 17h.01M11 7h7M11 17h7" /></>,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    power: <><path d="M12 2v10" /><path d="M18.4 6.6a9 9 0 1 1-12.8 0" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" /></>,
    cpu: <><rect x="6" y="6" width="12" height="12" rx="1" /><path d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3M10 10h4v4h-4z" /></>,
    code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const accents = ["#f59e0b", "#d6f52f", "#36d399", "#38bdf8", "#ef4444"];
const defaultCss = `.launcher {\n  /* Add your custom styles here */\n}\n\n.launch-button {\n  letter-spacing: 0.04em;\n}`;

function Heading({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return <header className="panel-heading"><span>{number}</span><div><p>{eyebrow}</p><h2>{title}</h2></div><i /></header>;
}

export default function App() {
  const [view, setView] = useState<View>("launch");
  const [nickname, setNickname] = useState("GHOST_01");
  const [fullscreen, setFullscreen] = useState(true);
  const [launched, setLaunched] = useState(false);
  const [accent, setAccent] = useState("#f59e0b");
  const [density, setDensity] = useState("compact");
  const [customCss, setCustomCss] = useState(defaultCss);
  const [appliedCss, setAppliedCss] = useState("");
  const [launchOptions, setLaunchOptions] = useState("-freq 144 -noforcemaccel -noforcemparms");
  const [highPriority, setHighPriority] = useState(true);
  const [consoleEnabled, setConsoleEnabled] = useState(true);

  const handleLaunch = () => {
    setLaunched(true);
    window.setTimeout(() => setLaunched(false), 2400);
  };

  const addOption = (option: string) => {
    if (!launchOptions.includes(option)) setLaunchOptions((current) => `${current} ${option}`.trim());
  };

  const command = `hl.exe -game cstrike ${fullscreen ? "-full" : "-windowed"} ${consoleEnabled ? "-console" : ""} ${launchOptions}`.replace(/\s+/g, " ").trim();

  return (
    <div className="launcher-stage" style={{ "--accent": accent } as React.CSSProperties}>
      {appliedCss && <style>{appliedCss}</style>}
      <section className={`launcher density-${density}`}>
        <div className="top-rail">
          <div className="brand">
            <div className="brand-symbol"><Icon name="crosshair" size={25} /></div>
            <div><h1>COUNTER<span>/</span>STRIKE</h1><p>TACTICAL LAUNCH SYSTEM <b>1.6</b></p></div>
          </div>
          <div className="system-state">
            <span className="status-dot" />
            <div><small>DEDICATED SERVER</small><strong>ONLINE / SECURED</strong></div>
            <Icon name="shield" size={19} />
          </div>
          <button className="power-button" aria-label="Close launcher"><Icon name="power" size={17} /></button>
        </div>

        <div className="launcher-body">
          <aside className="side-rail">
            <button className={`rail-button ${view === "launch" ? "active" : ""}`} onClick={() => setView("launch")}><Icon name="play" /><span>LAUNCH</span></button>
            <button className={`rail-button ${view === "customize" ? "active" : ""}`} onClick={() => setView("customize")}><Icon name="code" /><span>UI / CSS</span></button>
            <button className={`rail-button ${view === "options" ? "active" : ""}`} onClick={() => setView("options")}><Icon name="settings" /><span>OPTIONS</span></button>
            <div className="rail-fill" />
            <div className="build-mark"><span>BUILD</span><strong>8684</strong></div>
          </aside>

          {view === "launch" && (
            <main className="dashboard">
              <div className="left-column">
                <Heading number="01" eyebrow="OPERATOR CONFIGURATION" title="PLAYER SETUP" />
                <div className="field-group">
                  <label htmlFor="nickname"><Icon name="user" size={14} /> PLAYER NICKNAME <b>IDENTITY</b></label>
                  <div className="tactical-input">
                    <input id="nickname" maxLength={16} value={nickname} onChange={(event) => setNickname(event.target.value)} spellCheck={false} />
                    <span>{nickname.length}/16</span>
                  </div>
                </div>
                <div className="single-server">
                  <div className="server-card-head"><span><i /> YOUR SERVER</span><b>ONLINE</b></div>
                  <div className="server-title"><Icon name="server" size={22} /><div><strong>CS 1.6 CLASSIC SERVER</strong><small>Dust II • Classic public</small></div></div>
                  <div className="server-address"><Icon name="globe" size={13} /><span>185.234.45.12:27015</span><b>24 MS</b></div>
                  <div className="server-stats"><span>PLAYERS <b>18 / 24</b></span><span>MAP <b>DE_DUST2</b></span></div>
                </div>
                <div className="setting-row">
                  <div><Icon name="cpu" size={16} /><span><strong>FULLSCREEN MODE</strong><small>1920 × 1080 / 144HZ</small></span></div>
                  <button className={`toggle ${fullscreen ? "on" : ""}`} onClick={() => setFullscreen(!fullscreen)} aria-label="Toggle fullscreen"><i /></button>
                </div>
                <button className="inline-link" onClick={() => setView("options")}><Icon name="settings" size={12} /> EDIT LAUNCH OPTIONS <span>›</span></button>
              </div>

              <div className="right-column">
                <Heading number="02" eyebrow="CONNECTION CONTROL" title="SYSTEM READY" />
                <div className="terminal">
                  <div className="terminal-head"><span><i /> SYSTEM TERMINAL</span><b>LIVE</b></div>
                  <div className="terminal-log" aria-live="polite">
                    <p><span>[18:42:01]</span> Initializing GoldSrc engine...</p>
                    <p><span>[18:42:01]</span> <b>OK</b> Client files verified</p>
                    <p><span>[18:42:02]</span> <b>OK</b> VAC module authenticated</p>
                    <p><span>[18:42:02]</span> <b>OK</b> Dedicated server responded: 24ms</p>
                    <p><span>[18:42:03]</span> <b>READY</b> Awaiting deployment command_</p>
                    {launched && <p className="launch-log"><span>[NOW]</span> EXECUTING HL.EXE — STAND BY...</p>}
                  </div>
                  <div className="terminal-bars">{Array.from({ length: 17 }).map((_, i) => <i key={i} style={{ height: `${5 + ((i * 7) % 12)}px` }} />)}</div>
                </div>
                <div className="command-preview"><span>ACTIVE COMMAND</span><code>{command}</code></div>
                <button className={`launch-button ${launched ? "loading" : ""}`} onClick={handleLaunch}>
                  <span className="launch-icon"><Icon name={launched ? "cpu" : "play"} size={23} /></span>
                  <span><strong>{launched ? "INITIALIZING..." : "LAUNCH CS 1.6"}</strong><small>{launched ? "CONNECTING TO SERVER" : "JOIN 185.234.45.12:27015"}</small></span>
                  <kbd>ENTER</kbd>
                </button>
              </div>
            </main>
          )}

          {view === "customize" && (
            <main className="dashboard settings-dashboard">
              <div className="left-column">
                <Heading number="01" eyebrow="PLAYER PERSONALIZATION" title="UI APPEARANCE" />
                <div className="control-label"><span>ACCENT COLOR</span><code>{accent.toUpperCase()}</code></div>
                <div className="swatches">
                  {accents.map((color) => <button key={color} aria-label={`Use ${color}`} className={accent === color ? "active" : ""} style={{ background: color }} onClick={() => setAccent(color)}><i /></button>)}
                  <label className="custom-color" title="Custom color">+<input type="color" value={accent} onChange={(event) => setAccent(event.target.value)} /></label>
                </div>
                <div className="control-label"><span>INTERFACE DENSITY</span><code>{density.toUpperCase()}</code></div>
                <div className="segment-control">
                  {["compact", "comfortable"].map((item) => <button key={item} className={density === item ? "active" : ""} onClick={() => setDensity(item)}>{item}</button>)}
                </div>
                <div className="ui-preview">
                  <span>LIVE PREVIEW</span>
                  <div><i /><p><b>{nickname || "PLAYER"}</b><small>READY TO DEPLOY</small></p><button>LAUNCH</button></div>
                </div>
              </div>
              <div className="right-column">
                <Heading number="02" eyebrow="ADVANCED OVERRIDES" title="CUSTOM CSS" />
                <label className="code-editor">
                  <span><Icon name="code" size={12} /> user-theme.css <b>CSS</b></span>
                  <textarea value={customCss} onChange={(event) => setCustomCss(event.target.value)} spellCheck={false} />
                </label>
                <p className="editor-help">Styles are applied locally to your launcher. Target any launcher class to create a personal theme.</p>
                <div className="editor-actions">
                  <button onClick={() => { setCustomCss(defaultCss); setAppliedCss(""); }}>RESET</button>
                  <button className="primary" onClick={() => setAppliedCss(customCss)}>APPLY CSS</button>
                </div>
              </div>
            </main>
          )}

          {view === "options" && (
            <main className="dashboard settings-dashboard">
              <div className="left-column">
                <Heading number="01" eyebrow="ENGINE CONFIGURATION" title="LAUNCH OPTIONS" />
                <div className="field-group">
                  <label htmlFor="launch-options"><Icon name="cpu" size={14} /> COMMAND ARGUMENTS <b>ADVANCED</b></label>
                  <textarea id="launch-options" className="options-input" value={launchOptions} onChange={(event) => setLaunchOptions(event.target.value)} spellCheck={false} />
                </div>
                <div className="option-presets">
                  <span>QUICK ADD</span>
                  <div>{["-freq 144", "-novid", "-nojoy", "-gl", "-w 1920 -h 1080"].map((item) => <button key={item} onClick={() => addOption(item)}>{item}</button>)}</div>
                </div>
                <div className="settings-list">
                  <div><span><b>ENABLE DEVELOPER CONSOLE</b><small>Open with the tilde key in game</small></span><button className={`toggle ${consoleEnabled ? "on" : ""}`} onClick={() => setConsoleEnabled(!consoleEnabled)}><i /></button></div>
                  <div><span><b>HIGH PROCESS PRIORITY</b><small>Give the game more CPU resources</small></span><button className={`toggle ${highPriority ? "on" : ""}`} onClick={() => setHighPriority(!highPriority)}><i /></button></div>
                </div>
              </div>
              <div className="right-column">
                <Heading number="02" eyebrow="COMMAND VALIDATION" title="STARTUP PREVIEW" />
                <div className="command-box"><span>FINAL COMMAND</span><code>{highPriority ? `start /high ${command}` : command}</code><i>_</i></div>
                <div className="validation-list">
                  <p><i /> GoldSrc executable found</p><p><i /> Arguments syntax valid</p><p><i /> Server connection appended automatically</p>
                </div>
                <button className="save-options" onClick={() => setView("launch")}><Icon name="shield" size={15} /> SAVE &amp; RETURN TO LAUNCH</button>
              </div>
            </main>
          )}
        </div>

        <footer className="bottom-rail">
          <span><i /> YOUR SERVER: ONLINE</span><span>PLAYERS <b>18 / 24</b></span><span>CLIENT <b>v1.6.0.4</b></span><span className="hash">ID: 7FA9-C21D-8840</span>
        </footer>
      </section>
    </div>
  );
}
