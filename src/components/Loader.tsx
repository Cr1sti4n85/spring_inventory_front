type LoadingProps = {
  size?: number | string;
  cssClass?: string;
};

const Loader = ({ size = 48, cssClass = "" }: LoadingProps) => {
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div className={`${cssClass}`} role="status" aria-live="polite">
      <div
        className="spinner"
        style={{ width: px, height: px }}
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading</span>
    </div>
  );
};
export default Loader;
