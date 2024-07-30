interface InputProps {
  className: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  onChange: any;
}

const Input = ({
  className,
  id,
  name,
  type,
  placeholder,
  value = "",
  onChange,
}: InputProps) => {
  return (
    <input
      className={className}
      id={id}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
