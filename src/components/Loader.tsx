type LoadingProps = {
  size?: number | string;
  text?: string;
};

const Loader = ({ size = 48, text = "" }: LoadingProps) => {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div className="loading-wrapper" role="status" aria-live="polite">
      <div
        className="spinner"
        style={{ width: px, height: px }}
        aria-hidden="true"
      ></div>
      {text && <div className="loading-text">{text}</div>}
      <span className="sr-only">Loading</span>
    </div>
  );
};
export default Loader;
