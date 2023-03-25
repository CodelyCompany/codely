import { useMemo } from 'react';

const useTheme = () => {
  const currentStoredTheme = localStorage.getItem('theme');

  const theme = useMemo(
    () =>
      parseInt(currentStoredTheme ?? 0) === 2 ? 'secondary' : 'primary',
    [currentStoredTheme]
  );

  return { theme, color: `${theme}.main` };
};

export default useTheme;