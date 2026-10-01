import Link from "next/link";
import { tel } from "@/lib/utils";

export default function MobileBar({ landline }) {
  return (
    <div className="bar">
      <a className="btn btn-line" href={tel(landline)}>
        Call
      </a>
      <Link className="btn btn-red" href="/doctors">
        Book appointment
      </Link>
    </div>
  );
}
