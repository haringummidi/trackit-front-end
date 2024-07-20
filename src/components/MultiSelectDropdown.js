import React from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

const MultiSelectDropdown = ({ title, options, selectedOptions, onChange }) => {
  const handleSelect = (event) => {
    const value = event.target.value;
    const selected = [...selectedOptions];
    const index = selected.indexOf(value);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      selected.push(value);
    }
    onChange(selected);
  };

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={title}
      variant="secondary"
    >
      <div className="dropdown-menu show">
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="checkbox"
            id={`checkbox-${option}`}
            label={option}
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={handleSelect}
            className="dropdown-item"
          />
        ))}
      </div>
    </DropdownButton>
  );
};

export default MultiSelectDropdown;
