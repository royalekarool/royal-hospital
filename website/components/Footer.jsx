import Link from "next/link";
import { tel } from "@/lib/utils";

export default function Footer({ footer, landline }) {
  return (
    <footer>
      <div className="wrap">
        <span className="ft-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" />
          <span>
            © {new Date().getFullYear()} {footer}
          </span>
        </span>
        <span className="ft-links">
          <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <a href={tel(landline)}>{landline}</a>
        </span>
      </div>
    </footer>
  );
}
