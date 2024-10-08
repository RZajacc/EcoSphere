import React from "react";

type Props = {
  onClickHandler: () => void;
};

function HamburgerButton({ onClickHandler }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="36"
      height="36"
      stroke="black"
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
      className="mx-5 cursor-pointer"
      onClick={onClickHandler}
    >
      <line x1="2" y1="4.2" x2="22" y2="4.2" />
      <line x1="2" y1="9.4" x2="20" y2="9.4" />
      <line x1="2" y1="14.6" x2="22" y2="14.6" />
      <line x1="2" y1="19.8" x2="18" y2="19.8" />
    </svg>
  );
}

export default HamburgerButton;
