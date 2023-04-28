import React, { useCallback } from "react";
import "./DarkMode.css";

const DarkMode = () => {
  const setDarkMode = useCallback(() => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  }, []);

  const setLightMode = useCallback(() => {
    document.querySelector("body").setAttribute("data-theme", "light");
  }, []);

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        {/* <i className="uil uil-sun sun"></i>
        <i className="uil uil-moon moon"></i> */}
      </label>
    </div>
  );
};

export default DarkMode;
