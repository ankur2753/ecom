import React from 'react'
import '../css/Input.css'
interface inputProps {
    type?: string,
    name: string,
    min?: number,
    max?: number,
    pattern?: string,
    placeholder?: string,
    minVal?: number | string,
    maxVal?: number | string,
    required?: boolean,
    errorMessage?: string,
    handleChange: (e: any) => void,
    label?: string,
    value?: string | number,
}

const InputWithValidation: React.FC<inputProps> = ({ value, type = 'text', label, minVal, handleChange, required = false, errorMessage, maxVal, name, max, min, placeholder, pattern }) => {
    return (
        <fieldset className='form-element'>
            <label className='label' htmlFor={name}>{label ? label : name}{required ? "*" : ""}</label>
            <input type={type} id={name} name={name} value={value} onChange={handleChange} max={maxVal} min={minVal} required={required} maxLength={max} placeholder={placeholder ?? `enter your ${name}`} minLength={min} pattern={pattern} />
            {errorMessage && <h5>{errorMessage}</h5>}
        </fieldset>
    )
}

export default InputWithValidation