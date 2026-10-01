import Link from "next/link";
import Photo from "@/components/Photo";
import TimingsPanel from "@/components/TimingsPanel";
import { ArrowIcon, ServiceIcon } from "@/components/Icons";
import { getSiteData } from "@/lib/data";
import { bookHref, tel, waUrl } from "@/lib/utils";

export default async function Home() {
  const { site, timings, doctors } = await getSiteData();
  const heroStyle = site.hero.image
    ? {
        backgroundImage: `linear-gradient(90deg,rgba(13,19,34,.94),rgba(13,19,34,.72)),url("${site.hero.image}")`,
      }
    : undefined;

  return (
    <>
      <section className="hero dark" id="hero" style={heroStyle}>
        <div className="wrap">
          <div>
            <h1>{site.hero.title}</h1>
            <p className="lead">{site.hero.text}</p>
            <div className="cta-row">
              <Link className="btn btn-red" href="/doctors">
                Book appointment
              </Link>
              <a className="btn btn-line" href={tel(site.landline)}>
                Call the hospital
              </a>
            </div>
            <div className="facts">
              <div>
                <small>Phone</small>
                <b>
                  <a href={tel(site.landline)}>{site.landline}</a>
                </b>
              </div>
              <div>
                <small>Location</small>
                <b>{site.address}</b>
              </div>
            </div>
          </div>

          <TimingsPanel timings={timings} landline={site.landline} />
        </div>
      </section>

      <section id="departments">
        <div className="wrap">
          <div className="sec-top">
            <div>
              <h2>Departments and services</h2>
              <p>{site.deptIntro}</p>
            </div>
          </div>
          <div className="svc-grid">
            {site.services.map((x, i) => (
              <div className="svc" key={i}>
                <span className="ico">
                  <ServiceIcon name={x.icon} />
                </span>
                <h3>{x.name}</h3>
                <p>{x.text}</p>
                {x.link ? (
                  <a className="more" href={x.link.href}>
                    {x.link.label}
                    <ArrowIcon />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="doctors">
        <div className="wrap">
          <div className="sec-top">
            <div>
              <h2>Our doctors</h2>
              <p>Meet the specialists who will look after you.</p>
            </div>
            <Link className="link" href="/doctors">
              View all doctors
            </Link>
          </div>
          {doctors.length ? (
            <div className="docs">
              {doctors.slice(0, 8).map((d) => (
                <div className="doc" key={d.id}>
                  <Photo src={d.image} label="Doctor photo" alt={d.name} />
                  <h3>{d.name}</h3>
                  <div className="role">{d.role}</div>
                  <Link className="btn btn-line btn-sm" href={bookHref({ doctor: d.id })}>
                    Book appointment
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="noresult">Doctors will be listed here soon.</div>
          )}
        </div>
      </section>

      <section className="dark" id="about">
        <div className="wrap about">
          <Photo src={site.about.image} label="Hospital interior or team photo" />
          <div>
            <h2>{site.about.title}</h2>
            <p>{site.about.text}</p>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="wrap contact">
          <div>
            <h2>Visit or contact us</h2>
            <dl>
              {site.contact.map(([k, v]) => (
                <div key={k + v}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <a
                className="btn btn-red"
                href={waUrl(site.whatsapp, `Hello, I have a question about ${site.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
              <a className="btn btn-line" href={site.mapLink} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </div>
          </div>
          {site.mapEmbed ? (
            <div className="ph map">
              <iframe
                src={site.mapEmbed}
                title={`Map of ${site.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : (
            <Photo src={site.mapImage} label="Map or hospital entrance photo" />
          )}
        </div>
      </section>
    </>
  );
}
