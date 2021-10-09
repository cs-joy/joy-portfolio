import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  dark: true,
  toggle: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [IsDark, setIsDark] = useState(true);

  const toggleTheme = () => {

    localStorage.setItem('dark', JSON.stringify(!IsDark));
    setIsDark(!IsDark);

    document.body.classList.toggle('dark', !IsDark);
    document.body.classList.toggle('light', IsDark);
  };

  useEffect(() => {
    const localeDark = JSON.parse(localStorage.getItem('dark'));

    if (typeof localeDark !== 'boolean')
      document.body.classList.add(IsDark ? 'dark' : 'light');
    else {
      setIsDark(localeDark);
      document.body.classList.add(localeDark ? 'dark' : 'light');
    }
  }, []);

  return (
    <>
    <ThemeContext.Provider value={{ IsDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  </>
  );
};
