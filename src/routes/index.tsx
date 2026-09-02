import { createFileRoute } from "@tanstack/react-router";
import wordmark from "@/assets/fivematter-wordmark.png";
import letterheadImg from "@/assets/letterhead.png";
import cardDesignImg from "@/assets/card-design.png";
import emailSignatureImg from "@/assets/email-signature.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FiveMatter Brand Guidelines" },
      {
        name: "description",
        content:
          "FiveMatter's official brand foundation, visual language, typography, color, and applications.",
      },
      { property: "og:title", content: "FiveMatter Brand Guidelines" },
      { property: "og:description", content: "The official FiveMatter brand and design system." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandSystem,
});

const dimensions = ["People", "Process", "Data", "Technology", "Governance"];

function FiveMarks({
  variant = "balanced",
  compact = false,
}: {
  variant?: "balanced" | "data" | "chart";
  compact?: boolean;
}) {
  const heights =
    variant === "data"
      ? [48, 66, 100, 72, 56]
      : variant === "chart"
        ? [32, 48, 76, 58, 90]
        : [72, 88, 100, 88, 72];
  return (
    <div
      className={`five-marks ${compact ? "five-marks--compact" : ""}`}
      aria-label={`Five Marks, ${variant} variation`}
    >
      {heights.map((height, index) => (
        <span
          key={dimensions[index]}
          className={`mark mark-${index + 1}`}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

function Wordmark({ dark = false, className = "" }: { dark?: boolean; className?: string }) {
  return (
    <img
      src={wordmark}
      alt="FiveMatter"
      className={`wordmark ${dark ? "wordmark--dark" : ""} ${className}`}
    />
  );
}

function SectionHead({
  index,
  label,
  light = false,
}: {
  index: string;
  label: string;
  light?: boolean;
}) {
  return (
    <div className={`section-head ${light ? "section-head--light" : ""}`}>
      <span>{index}</span>
      <span>{label}</span>
    </div>
  );
}

function BrandSystem() {
  return (
    <main>
      <header className="hero section-dark">
        <nav className="hero-nav" aria-label="Brand guide">
          <Wordmark />
          <span>Brand system / 01</span>
        </nav>
        <div className="hero-core">
          <div className="hero-title-wrap">
            <Wordmark className="hero-wordmark" />
          </div>
          <div className="hero-bottom">
            <h1>Focus. Solve. Scale.</h1>
            <div className="dimension-tags">
              {dimensions.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
          </div>
        </div>
        <FiveMarks />
      </header>

      <section className="story section-cobalt">
        <SectionHead index="01" label="Brand foundation" light />
        <div className="story-grid">
          <h2>Five things make transformation work.</h2>
          <div className="story-copy">
            <p className="story-lead">
              Transformation fails when one critical dimension is left out. FiveMatter unifies
              People, Process, Data, Technology and Governance—so what gets delivered still works
              after the consultants leave.
            </p>
            <div className="mission-grid">
              <div>
                <span>Mission</span>
                <p>
                  Make change durable by designing every transformation as one connected system.
                </p>
              </div>
              <div>
                <span>Vision</span>
                <p>A world where transformation creates capability, not dependency.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="voice section-paper">
        <SectionHead index="02" label="Tone of voice" />
        <div className="voice-intro">
          <h2>
            Say less.
            <br />
            Mean more.
          </h2>
          <p>
            Our voice is precise, direct and useful. It sounds like a partner in the room—not a
            pitch from outside it.
          </p>
        </div>
        <div className="principle-grid">
          {[
            [
              "01",
              "Specific, not sweeping",
              "Name the problem, the outcome and what changes. Avoid claims that could belong to anyone.",
            ],
            [
              "02",
              "Cut before you add",
              "Remove filler. Keep the words that carry meaning and make the next action clear.",
            ],
            [
              "03",
              "Lead with outcomes",
              "Start with the business result. Tools and methods come second, when they add context.",
            ],
            [
              "04",
              "Sound like a partner",
              "Write with confidence, not hype. No exclamation marks. Never “revolutionary.”",
            ],
          ].map(([n, t, c]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="logo-section section-light">
        <SectionHead index="03" label="Logo usage" />
        <div className="logo-intro">
          <h2>
            One mark.
            <br />
            Three grounds.
          </h2>
          <p>
            The lowercase wordmark is direct, geometric and human. Use only the supplied artwork.
            Contrast is structural, never decorative.
          </p>
        </div>
        <div className="logo-grounds">
          <div className="logo-ground logo-ground--black">
            <span>01 / Black</span>
            <Wordmark />
          </div>
          <div className="logo-ground logo-ground--white">
            <span>02 / White</span>
            <Wordmark dark />
          </div>
          <div className="logo-ground logo-ground--cobalt">
            <span>03 / Cobalt</span>
            <Wordmark />
          </div>
        </div>
        <div className="logo-rules">
          <div className="clearspace-demo">
            <div className="clearspace-box">
              <i>x</i>
              <Wordmark dark />
            </div>
            <div>
              <span>Clear space</span>
              <p>Keep a minimum clear space of one wordmark cap-height (x) on every side.</p>
            </div>
          </div>
          <div className="minimum">
            <span>Minimum size</span>
            <Wordmark dark />
            <p>
              Digital: 96 px wide
              <br />
              Print: 25 mm wide
            </p>
          </div>
        </div>
        <div className="donts">
          <h3>Do not</h3>
          <div>
            {["Distort", "Stretch", "Add shadows", "Use off-palette color", "Rotate"].map(
              (x, i) => (
                <span key={x}>
                  <b>0{i + 1}</b>
                  {x}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="colors section-paper">
        <SectionHead index="04" label="Color system" />
        <div className="color-title">
          <h2>Color has a job.</h2>
          <p>
            Black and white carry the brand. Paper gives the eye room. Cobalt signals the point that
            matters.
          </p>
        </div>
        <div className="primary-swatches">
          <div className="swatch swatch-black">
            <b>Black</b>
            <span>
              #0A0A0A
              <br />
              10 / 10 / 10
            </span>
          </div>
          <div className="swatch swatch-white">
            <b>White</b>
            <span>
              #FFFFFF
              <br />
              255 / 255 / 255
            </span>
          </div>
          <div className="swatch swatch-paper">
            <b>Paper</b>
            <span>
              #F5F4F0
              <br />
              245 / 244 / 240
            </span>
          </div>
          <div className="swatch swatch-cobalt">
            <b>Cobalt</b>
            <span>
              #2A4CFF
              <br />
              42 / 76 / 255
            </span>
          </div>
        </div>
        <div className="dimension-scale">
          {[
            ["People", "#0A0A0A"],
            ["Process", "#1C33B3"],
            ["Data", "#2A4CFF"],
            ["Technology", "#7C90FF"],
            ["Governance", "#ADBAFF"],
          ].map(([n, h], i) => (
            <div key={n} className={`scale-${i + 1}`}>
              <span>{n}</span>
              <b>{h}</b>
            </div>
          ))}
        </div>
        <div className="ratio">
          <div className="ratio-label">
            <h3>Usage ratio</h3>
            <p>Cobalt is emphasis, not atmosphere.</p>
          </div>
          <div className="ratio-visual">
            <div className="ratio-bar">
              <i />
              <i />
              <i />
            </div>
            <div>
              <span>
                Black / White <b>60%</b>
              </span>
              <span>
                Paper <b>30%</b>
              </span>
              <span>
                Cobalt <b>10%</b>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="type section-dark">
        <SectionHead index="05" label="Typography" light />
        <div className="type-display">
          <div>
            <span>Display / Space Grotesk</span>
            <p className="weight-300">
              Aa <small>300</small>
            </p>
            <p className="weight-500">
              Aa <small>500</small>
            </p>
            <p className="weight-700">
              Aa <small>700</small>
            </p>
          </div>
          <div className="type-statement">
            <h2>
              Form follows
              <br />
              the problem.
            </h2>
            <p>
              Space Grotesk shares the geometric, rounded construction of the wordmark. It carries
              headlines, eyebrows, numerals and stats.
            </p>
          </div>
        </div>
        <div className="type-body">
          <div>
            <span>Body / Inter</span>
            <p className="inter-400">Inter Regular 400</p>
            <p className="inter-500">Inter Medium 500</p>
            <p className="inter-600">Inter Semibold 600</p>
          </div>
          <p>
            Inter stays quiet on purpose. It carries detail with clarity and never competes with the
            headline.
          </p>
        </div>
        <div className="hierarchy-demo">
          <span>TRANSFORMATION / 05</span>
          <h3>
            Build capability.
            <br />
            Not dependency.
          </h3>
          <p>
            We connect decisions across the five dimensions so the operating model holds when the
            project ends.
          </p>
          <a href="#dimensions">
            Explore the five dimensions <b>→</b>
          </a>
        </div>
      </section>

      <section id="dimensions" className="device section-light">
        <SectionHead index="06" label="The Five Marks" />
        <div className="device-intro">
          <h2>
            Distinct.
            <br />
            Connected.
            <br />
            In motion.
          </h2>
          <div>
            <FiveMarks />
            <p>
              Always five. Always in this order. Rounded ends and clear gaps preserve the idea of
              five distinct dimensions acting as one system.
            </p>
          </div>
        </div>
        <div className="dimension-definitions">
          {[
            ["People", "The roles, skills and behaviours that make change real."],
            ["Process", "The repeatable flows that turn intent into delivery."],
            ["Data", "The evidence that sharpens decisions and measures progress."],
            ["Technology", "The platforms and tools that enable the operating model."],
            ["Governance", "The ownership and controls that keep change on course."],
          ].map(([n, c], i) => (
            <article key={n}>
              <span>0{i + 1}</span>
              <h3>{n}</h3>
              <p>{c}</p>
            </article>
          ))}
        </div>
        <div className="variations">
          <article>
            <span>Balanced / Default</span>
            <FiveMarks variant="balanced" />
          </article>
          <article>
            <span>Data-led / Emphasis</span>
            <FiveMarks variant="data" />
          </article>
          <article className="chart-variation">
            <span>Diagnostic / Data visualisation</span>
            <FiveMarks variant="chart" compact />
            <div className="chart-meta">
              <b>72</b>
              <p>
                Transformation
                <br />
                readiness
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="applications section-cobalt">
        <SectionHead index="07" label="Applications" light />
        <div className="applications-title">
          <h2>
            The system
            <br />
            at work.
          </h2>
          <p>
            Every application uses the same rhythm: restraint, contrast and a single point of
            emphasis.
          </p>
        </div>

        <article className="application-block letterhead-block">
          <div className="application-label">
            <span>07.1 / Letterhead</span>
            <h3>Built for correspondence.</h3>
            <p>
              A quiet document frame keeps the message primary. Three fixed elements hold every page
              together.
            </p>
          </div>
          <div className="letterhead-stage">
            <div className="letterhead-image-wrap">
              <img
                src={letterheadImg}
                alt="FiveMatter Letterhead design"
                className="letterhead-image"
              />
            </div>
            <div className="spec-list">
              <div>
                <b>01</b>
                <span>Logo placement</span>
                <p>Top-left, aligned to the document margin.</p>
              </div>
              <div>
                <b>02</b>
                <span>Margin rule</span>
                <p>One cobalt hairline. No decorative fields.</p>
              </div>
              <div>
                <b>03</b>
                <span>Contact footer</span>
                <p>Fixed to the lower margin with the Five Marks.</p>
              </div>
            </div>
          </div>
        </article>

        <article className="application-block card-block">
          <div className="application-label">
            <span>07.2 / Business card</span>
            <h3>
              One identity.
              <br />
              Two approved grounds.
            </h3>
            <p>
              The front leads with the brand. The reverse makes every contact detail useful and
              immediate.
            </p>
          </div>
          <div className="card-stage">
            <img
              src={cardDesignImg}
              alt="FiveMatter Business Card design"
              className="card-design-image"
            />
          </div>
        </article>

        <article className="application-block email-block">
          <div className="application-label">
            <span>07.3 / Email signature</span>
            <h3>Designed to arrive intact.</h3>
            <p>
              System-safe, compact and readable in Outlook or Gmail. No image-dependent contact
              information.
            </p>
          </div>
          <div className="email-stage">
            <img
              src={emailSignatureImg}
              alt="FiveMatter Email Signature design"
              className="email-signature-image"
            />
          </div>
        </article>

        <article className="application-block templates-block">
          <div className="application-label">
            <span>07.4 / Presentation &amp; proposal</span>
            <h3>Clarity at every density.</h3>
            <p>
              The system scales from a single proposition to structured evidence and formal
              documentation.
            </p>
          </div>
          <div className="slide-pair">
            <div className="deck-slide deck-slide--cover">
              <div className="deck-meta">
                <Wordmark />
                <span>CAPABILITY PROPOSAL / 2026</span>
              </div>
              <h4>
                Five dimensions.
                <br />
                One operating model.
              </h4>
              <div className="deck-footer">
                <span>Focus. Solve. Scale.</span>
                <FiveMarks compact />
              </div>
            </div>
            <div className="deck-slide deck-slide--bio">
              <div className="deck-meta">
                <Wordmark dark />
                <span>03 / LEADERSHIP</span>
              </div>
              <div className="bio-grid">
                <div className="bio-identity">
                  <span>Engagement lead</span>
                  <h4>
                    Kamaldeep
                    <br />
                    Dhanjal
                  </h4>
                  <b>CEO / Managing Director</b>
                  <FiveMarks compact />
                </div>
                <div className="bio-summary">
                  <span>Profile</span>
                  <p>
                    Kamaldeep helps organisations turn transformation strategy into durable
                    operating capability, connecting decisions across people, process, data,
                    technology and governance.
                  </p>
                  <blockquote>
                    “Build capability.
                    <br />
                    Not dependency.”
                  </blockquote>
                </div>
                <div className="bio-history">
                  <span>Experience</span>
                  <p>
                    <b>Transformation leadership</b>Enterprise operating models and capability
                    programmes.
                  </p>
                  <p>
                    <b>Delivery</b>Cross-functional execution, governance and adoption.
                  </p>
                  <span>Credentials</span>
                  <p>
                    Strategic transformation
                    <br />
                    Operating model design
                    <br />
                    Technology enablement
                  </p>
                </div>
              </div>
              <div className="deck-footer">
                <span>FIVEMATTER / CONFIDENTIAL</span>
                <FiveMarks compact />
              </div>
            </div>
          </div>
          <div className="proposal-pair">
            <div className="proposal-page proposal-cover">
              <div className="proposal-top">
                <Wordmark dark />
                <span>PROPOSAL / 26—09</span>
              </div>
              <div>
                <span>Prepared for</span>
                <p>Client organisation</p>
              </div>
              <h4>
                Operating model
                <br />
                transformation
              </h4>
              <div className="proposal-bottom">
                <FiveMarks compact />
                <p>
                  02 September 2026
                  <br />
                  Private &amp; confidential
                </p>
              </div>
            </div>
            <div className="proposal-page proposal-content">
              <div className="proposal-top">
                <Wordmark dark />
                <span>02 / APPROACH</span>
              </div>
              <div className="content-number">02</div>
              <h4>A connected approach</h4>
              <p className="content-lead">
                Each workstream is designed as part of one operating system, with ownership built in
                from the start.
              </p>
              <div className="proposal-copy">
                <p>
                  We begin by establishing the decisions that must hold after delivery. The five
                  dimensions are then shaped together, with clear owners, measures and handover
                  points.
                </p>
                <aside>
                  <b>5</b>
                  <span>
                    dimensions aligned
                    <br />
                    to one outcome
                  </span>
                </aside>
                <p>
                  The result is a practical operating model that teams can run, measure and improve
                  without ongoing dependency.
                </p>
              </div>
              <div className="proposal-bottom">
                <FiveMarks compact />
                <span>FIVEMATTER / CONFIDENTIAL</span>
                <p>12</p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <footer className="footer section-dark">
        <Wordmark />
        <p>Focus. Solve. Scale.</p>
        <span>Brand system / 2026</span>
      </footer>
    </main>
  );
}
