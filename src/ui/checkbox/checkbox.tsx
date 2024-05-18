import * as React from "react";
import "./checkbox.scss";

interface CheckboxProps {
  onClick: () => void;
  checked: boolean;
  onDelete: () => void;
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  onClick,
  checked,
  onDelete,
  label,
}) => {
  const deleteElement = () => {
    return onDelete();
  };

  const handleClick = () => {
    return onClick();
  };

  return (
    <div className="checkbox">
      <label aria-checked className="checkbox-content">
        <input
          tabIndex={-1}
          type="checkbox"
          checked={checked}
          onChange={handleClick}
        />
        <span className={checked ? "checkbox-checked" : ""}>{label}</span>
      </label>
      <button
        type="button"
        className="checkbox-delete"
        onClick={() => deleteElement()}
      >
        x
      </button>
    </div>
  );
};

export default Checkbox;
