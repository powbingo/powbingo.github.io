import { useCallback, useState } from 'react';

export default function useToggle(defaultValue = false) {
  const [isToggled, setIsToggled] = useState(defaultValue);
  const toggle = useCallback(() => setIsToggled((prevState) => !prevState), []);
  return { isToggled, toggle };
}