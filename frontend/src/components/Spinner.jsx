function Spinner({ isCards }) {
  return (
    <>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
      <div className={!isCards ? "spinner" : "spinner__visible"}>
        <i className="spinner__i"></i>
      </div>
    </>
  );
}

export default Spinner;
