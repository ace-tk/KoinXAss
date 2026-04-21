import React, { forwardRef, useEffect, useRef } from 'react';

const Checkbox = forwardRef(({ checked, indeterminate, onChange, ...props }, ref) => {
  const innerRef = useRef(null);

  // Combine refs
  const resolvedRef = ref || innerRef;

  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [resolvedRef, indeterminate]);

  return (
    <input
      type="checkbox"
      className="custom-checkbox"
      ref={resolvedRef}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
