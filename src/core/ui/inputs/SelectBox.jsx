import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../shadcn/components/ui/select';

const SelectField = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  className = '',
  name,
  ...props
}) => (
  <div className={` ${className}`}>
    <Select value={value} onValueChange={onChange} name={name} {...props}>
      <SelectTrigger className="w-full" style={{ height: '56px' }}>
        <div className="flex w-full flex-col items-start gap-1">
          {label && (
            <label className="block text-xs text-gray-500" htmlFor={name}>
              {label}
            </label>
          )}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent>
        {options &&
          options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  </div>
);

export default SelectField;
