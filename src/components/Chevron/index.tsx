interface ChevronProps {
  open: boolean;
  onClick: () => void;
}

const Chevron = ({ open, onClick }: ChevronProps) => {
  return (
    <button
      className={`nav-container__button ${
        open ? "open-button" : "close-button"
      }`}
      onClick={onClick}
    >
      {open ? (
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#ffffff"
        >
          <path
            d="M11 6L5 12L11 18"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M19 6L13 12L19 18"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      ) : (
        <svg
          width="16px"
          height="16px"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          color="#ffffff"
        >
          <path
            d="M13 6L19 12L13 18"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M5 6L11 12L5 18"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </button>
  );
};

export default Chevron;
