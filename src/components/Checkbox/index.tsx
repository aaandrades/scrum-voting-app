import "./styles.css";

interface CheckboxProps {
  value: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ value, onChange }: CheckboxProps) => {
  return (
    <label className="checkbox-container">
      Are you scrum master?
      <input type="checkbox" checked={value} onChange={onChange} name="scrum" />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
