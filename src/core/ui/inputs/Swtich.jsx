import React from 'react';
import { Switch as SnSwitch } from '../shadcn/components/ui/switch';

/**
 * Switch component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} [props.checked=false] - Whether the switch is checked.
 * @param {function} props.onChange - Callback fired when the switch state changes.
 * @param {boolean} [props.disabled] - Whether the switch is disabled.
 * @param {'sm'|'default'|'lg'|'xl'} [props.size='md'] - Size of the switch. Options: 'sm', 'md', 'lg'.
 * @param {Object} [props.options={}] - Additional options to pass to the underlying SnSwitch component.
 * @returns {JSX.Element} The rendered Switch component.
 */
const Switch = ({
  checked = false,
  onChange,
  disabled,
  size = 'md',
  options = {},
  ...props
}) => (
  <div>
    <SnSwitch
      disabled={disabled}
      onChange={onChange}
      checked={checked}
      size={size}
      {...options}
      {...props}
    />
  </div>
);

export default Switch;
