"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DAYS, bookHref, tel } from "@/lib/utils";

export default function TimingsPanel({ timings, landline }) {
  const [current, setCurrent] = useState(timings[0] ? timings[0].name : "");
  const [today, setToday] = useState("");

  // Day name is read in the visitor's browser, so it is always their local day.
  useEffect(() => {
    setToday(DAYS[new Date().getDay()]);
  }, []);

  const t = timings.find((x) => x.name === current);

  let result;
  if (!t) {
    result = (
      <div className="empty">
        Timings will be added soon.
        <br />
        Please call{" "}
        <a href={tel(landline)}>
          <b>{landline}</b>
        </a>{" "}
        to confirm.
      </div>
    );
  } else {
    const book = (
      <div className="actions">
        <Link className="btn btn-red btn-block" href={bookHref({ dept: current })}>
          Book {current}
        </Link>
        <p className="note">Timings may change. Please confirm by phone before you visit.</p>
      </div>
    );

    if (!t.days.length) {
      result = (
        <>
          <div className="empty">
            Timings for {current} are not listed yet.
            <br />
            Please call{" "}
            <a href={tel(landline)}>
              <b>{landline}</b>
            </a>{" "}
            to confirm.
          </div>
          {book}
        </>
      );
    } else {
      const row = today ? t.days.find((r) => r[0] === today) : null;
      let todayLine = null;
      if (today) {
        todayLine = row ? (
          <>
            Today, {today}: <b>{row[1].join(" and ")}</b>
          </>
        ) : (
          <>
            No {current.toLowerCase()} consultation today ({today}).
          </>
        );
      }
      result = (
        <>
          {t.consultant ? (
            <p className="who">
              Consultant: <b>{t.consultant}</b>
            </p>
          ) : null}
          {todayLine ? <div className="today">{todayLine}</div> : null}
          <div className="days">
            {t.days.map(([d, times]) => (
              <div className={"day" + (d === today ? " is-today" : "")} key={d}>
                <span className="d">{d}</span>
                <span>
                  {times.map((x, i) => (
                    <span key={i}>
                      {i > 0 ? <br /> : null}
                      {x}
                    </span>
                  ))}
                </span>
                {d === today ? <span className="tag">Today</span> : <span />}
              </div>
            ))}
          </div>
          {book}
        </>
      );
    }
  }

  return (
    <div className="panel" id="timings">
      <h2>Department consultation timings</h2>
      <p>Choose a department to see when doctors are available.</p>
      <div className="chips" role="tablist" aria-label="Department">
        {timings.map((x) => (
          <button
            key={x.name}
            type="button"
            className="chip"
            role="tab"
            aria-selected={x.name === current}
            onClick={() => setCurrent(x.name)}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div aria-live="polite">{result}</div>
    </div>
  );
}
