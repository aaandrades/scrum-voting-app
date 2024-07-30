import "./styles.css";

interface ButtonProps {
  onClick?: (e: any) => void;
  label: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

const Button = ({
  onClick,
  label,
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className="button-container"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
