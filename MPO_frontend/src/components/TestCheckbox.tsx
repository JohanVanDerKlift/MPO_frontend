import React from 'react';
import {TestCheckboxProps} from "../../types/Types";
import "./TestCheckbox.css";

const TestCheckbox: React.FC<TestCheckboxProps> = ({
       id,
       checked,
       disabled,
       onChange,
       register,
    }: TestCheckboxProps) => {
    return (
        <div className="checkbox-wrapper">
            <input
                type="checkbox"
                id={id}
                className="custom-checkbox"
                checked={checked}
                disabled={disabled}
                {...(register ? register(id, { onChange }) : { onChange })}
            />
            <label htmlFor={id} className="checkbox-label">
                {checked ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="green">
                        <path d="M20 6L9 17l-5-5" stroke="green" strokeWidth="4" fill="none" />
                    </svg>
                ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="red">
                        <path d="M6 6L18 18M6 18L18 6" stroke="red" strokeWidth="4" fill="none" />
                    </svg>
                )}
            </label>
        </div>
    );
};

export default TestCheckbox;