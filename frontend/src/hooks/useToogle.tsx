import { useState, useCallback } from 'react';

const useToggle = (initialState: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback((): void => setState((prev) => !prev), []);
  return [state, toggle];
};

export default useToggle;
