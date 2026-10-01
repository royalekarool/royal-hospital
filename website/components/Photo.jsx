import { PhotoIcon } from "./Icons";

// Shows the photo when there is one, otherwise a dashed placeholder box.
export default function Photo({ src, label, alt }) {
  return (
    <div className={"ph" + (src ? " has-img" : "")}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt || label} />
      ) : (
        <div>
          <PhotoIcon />
          <div>{label}</div>
        </div>
      )}
    </div>
  );
}
