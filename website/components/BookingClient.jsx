"use client";

import { useEffect, useMemo, useState } from "react";
import Photo from "./Photo";
import { WhatsAppIcon } from "./Icons";
import { DAYS, tel, waUrl } from "@/lib/utils";

const pad = (n) => String(n).padStart(2, "0");

export default function BookingClient({ doctors, timings, siteName, whatsapp, landline, initialDept, initialDoctor }) {
  const schedules = useMemo(() => Object.fromEntries(timings.map((t) => [t.name, t.days])), [timings]);
  const depts = useMemo(() => [...new Set(doctors.map((d) => d.dept).filter(Boolean))], [doctors]);

  const byId = (id) => doctors.find((d) => d.id === id);
  const scheduleOf = (d) => {
    const days = schedules[d.dept];
    return days && days.length ? days : null;
  };
  // a doctor matches a weekday if they work that day, or if their timings are not listed yet
  const matchesDay = (d, day) => {
    const s = scheduleOf(d);
    return s ? s.some((r) => r[0] === day) : true;
  };

  // The next 14 days are built in the visitor's browser (their local date).
  const [nextDays, setNextDays] = useState([]);
  useEffect(() => {
    setNextDays(
      Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
          iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
          day: DAYS[d.getDay()],
          label:
            d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) +
            (i === 0 ? " (today)" : ""),
        };
      }),
    );
  }, []);
  const dayOf = (iso) => {
    const x = nextDays.find((n) => n.iso === iso);
    return x && x.day;
  };

  const timeOptions = (st) => {
    const d = byId(st.doctor);
    if (!d || !st.date) return null;
    const s = scheduleOf(d);
    if (!s) return [];
    const row = s.find((r) => r[0] === dayOf(st.date));
    return row ? row[1] : [];
  };

  // Keeps the four choices consistent with each other.
  const sanitize = (st) => {
    const n = { ...st };
    if (n.doctor) {
      const d = byId(n.doctor);
      if (!d || (n.dept && d.dept !== n.dept) || (n.date && !matchesDay(d, dayOf(n.date)))) n.doctor = "";
    }
    const pool = doctors.filter((d) => (!n.dept || d.dept === n.dept) && (!n.doctor || d.id === n.doctor));
    if (n.date && !pool.some((d) => matchesDay(d, dayOf(n.date)))) n.date = "";
    const t = timeOptions(n);
    if (!t || !t.includes(n.time)) n.time = "";
    if (t && t.length === 1) n.time = t[0];
    return n;
  };

  const startDoc = byId(initialDoctor);
  const [raw, setRaw] = useState({
    dept: startDoc ? startDoc.dept : depts.includes(initialDept) ? initialDept : "",
    doctor: startDoc ? startDoc.id : "",
    date: "",
    time: "",
  });
  const s = sanitize(raw);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const docPool = doctors.filter((d) => (!s.dept || d.dept === s.dept) && (!s.date || matchesDay(d, dayOf(s.date))));
  const datePool = doctors.filter((d) => (!s.dept || d.dept === s.dept) && (!s.doctor || d.id === s.doctor));
  const dateOptions = nextDays.filter((n) => datePool.some((d) => matchesDay(d, n.day)));
  const list = doctors.filter(
    (d) =>
      (!s.dept || d.dept === s.dept) &&
      (!s.doctor || d.id === s.doctor) &&
      (!s.date || matchesDay(d, dayOf(s.date))),
  );
  const filtered = Boolean(s.dept || s.doctor || s.date);

  const doc = byId(s.doctor);
  const times = timeOptions(s);

  function pickDoctor(id) {
    setRaw({ ...s, doctor: id, dept: byId(id).dept });
  }

  function send() {
    const day = nextDays.find((n) => n.iso === s.date);
    const needTime = doc && scheduleOf(doc);
    const focus = (id) => document.getElementById(id) && document.getElementById(id).focus();
    if (!doc) { setErr("Please choose a doctor."); focus("b-doc"); return; }
    if (!day) { setErr("Please choose a day."); focus("b-date"); return; }
    if (needTime && !s.time) { setErr("Please choose a time."); focus("b-time"); return; }
    if (!name.trim()) { setErr("Please enter your name."); focus("b-name"); return; }
    setErr("");
    const lines = ["Hello, I would like to book an appointment at " + siteName + ".", "Name: " + name.trim()];
    if (phone.trim()) lines.push("Mobile: " + phone.trim());
    lines.push(
      "Department: " + doc.dept,
      "Doctor: " + doc.name + " (" + doc.role + ")",
      "Day: " + day.label.replace(" (today)", "") + " (" + day.iso + ")",
    );
    lines.push("Time: " + (s.time || "Please confirm the time"));
    if (note.trim()) lines.push("Problem: " + note.trim());
    window.open(waUrl(whatsapp, lines.join("\n")), "_blank", "noopener");
  }

  return (
    <>
      <section className="page-head dark">
        <div className="wrap">
          <h1>Book your doctor</h1>
          <p className="sub">
            Choose a department, doctor, day and time. Your choices also filter the doctors listed below. Then send the
            booking on WhatsApp.
          </p>

          <div className="panel" id="book-form">
            <div className="book-grid">
              <div className="field">
                <label htmlFor="b-dept">Department</label>
                <select id="b-dept" value={s.dept} onChange={(e) => setRaw({ ...s, dept: e.target.value })}>
                  <option value="">All departments</option>
                  {depts.map((x) => (
                    <option key={x} value={x}>{x}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-doc">Doctor</label>
                <select
                  id="b-doc"
                  value={s.doctor}
                  onChange={(e) => {
                    const id = e.target.value;
                    setRaw({ ...s, doctor: id, dept: id ? byId(id).dept : s.dept });
                  }}
                >
                  <option value="">Any doctor</option>
                  {docPool.map((d) => (
                    <option key={d.id} value={d.id}>{`${d.name} (${d.role})`}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-date">Day</label>
                <select id="b-date" value={s.date} onChange={(e) => setRaw({ ...s, date: e.target.value })}>
                  <option value="">Choose a day</option>
                  {dateOptions.map((n) => (
                    <option key={n.iso} value={n.iso}>{n.label}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="b-time">Time</label>
                {!doc ? (
                  <select id="b-time" disabled value=""><option value="">Choose a doctor first</option></select>
                ) : !s.date ? (
                  <select id="b-time" disabled value=""><option value="">Choose a day first</option></select>
                ) : !scheduleOf(doc) ? (
                  <select id="b-time" disabled value=""><option value="">We will confirm the time</option></select>
                ) : (
                  <select id="b-time" value={s.time} onChange={(e) => setRaw({ ...s, time: e.target.value })}>
                    <option value="">Choose a time</option>
                    {times.map((x) => (
                      <option key={x} value={x}>{x}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
            <div className="book-grid2">
              <div className="field">
                <label htmlFor="b-name">Your name</label>
                <input id="b-name" type="text" autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="b-phone">Mobile number</label>
                <input id="b-phone" type="tel" autoComplete="tel" placeholder="Optional" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="b-note">What is the problem?</label>
                <input id="b-note" type="text" placeholder="Optional, for example: knee pain for two weeks" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
            </div>
            <div className="book-foot">
              <div className="err" role="alert">{err}</div>
              <button className="btn btn-red" type="button" onClick={send}>
                <WhatsAppIcon />
                Send booking on WhatsApp
              </button>
            </div>
            <p className="formnote">Timings may change. The hospital will confirm your booking on WhatsApp.</p>
          </div>
        </div>
      </section>

      <section id="all-doctors">
        <div className="wrap">
          <div className="list-top">
            <div>
              <h2>Our doctors</h2>
              <div className="count">
                {filtered ? `Showing ${list.length} of ${doctors.length} doctors` : `${doctors.length} doctors`}
              </div>
            </div>
            {filtered ? (
              <button
                className="btn-text"
                type="button"
                onClick={() => {
                  setRaw({ dept: "", doctor: "", date: "", time: "" });
                  setErr("");
                }}
              >
                Clear filters
              </button>
            ) : null}
          </div>
          <div className="dgrid">
            {!doctors.length ? (
              <div className="noresult" style={{ gridColumn: "1/-1" }}>
                Doctors will be listed here soon. Please call{" "}
                <a href={tel(landline)}><b>{landline}</b></a> to book.
              </div>
            ) : !list.length ? (
              <div className="noresult" style={{ gridColumn: "1/-1" }}>
                No doctors match these filters. Try another day or department, or call{" "}
                <a href={tel(landline)}><b>{landline}</b></a>.
              </div>
            ) : (
              list.map((d) => {
                const sched = scheduleOf(d);
                const selected = s.doctor === d.id;
                return (
                  <div className={"dcard" + (selected ? " sel" : "")} key={d.id}>
                    <Photo src={d.image} label="Doctor photo" alt={d.name} />
                    <h3>{d.name}</h3>
                    <div className="role">{d.role}</div>
                    {d.dept ? <span className="tag">{d.dept}</span> : null}
                    <div className="avail">
                      {sched ? (
                        sched.map(([day, t]) => (
                          <div key={day}>
                            <b>{day.slice(0, 3)}</b>
                            <span>{t.join(", ")}</span>
                          </div>
                        ))
                      ) : (
                        <div>Timings on request. Call to confirm.</div>
                      )}
                    </div>
                    <button
                      className={"btn " + (selected ? "btn-red" : "btn-line") + " btn-sm"}
                      type="button"
                      onClick={() => {
                        pickDoctor(d.id);
                        const form = document.getElementById("book-form");
                        if (form) form.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                    >
                      {selected ? "Selected" : "Book this doctor"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
