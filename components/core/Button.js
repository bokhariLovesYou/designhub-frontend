import React from "react";
import Spinner from "@/components/core/Spinner";
import PropTypes from "prop-types";

const Button = (props) => {
  let classList = ``;
  if (props.variant === "dark") {
    classList = `border border-white bg-theme-dark text-white`;
  } else if (props.variant === "secondary") {
    classList = `border-theme-secondary bg-theme-secondary text-white`;
  } else {
    classList = `border-theme-primary bg-theme-primary text-white`;
  }
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`px-6 py-2 rounded inline-flex justify-center items-center ${classList} ${
        props.className
      } ${props.loading ? `opacity-50 pointer-events-none` : ``}`}
    >
      {props.loading && <Spinner button white xs={props.xs} />}
      {props.children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  className: PropTypes.string,
};
