import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'point-light') return lightTheme;
  else if (name === 'point-dark') return darkTheme;
  return lightTheme;
};
