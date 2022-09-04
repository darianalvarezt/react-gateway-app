import { memo } from 'react';
import { AppProvider } from './AppProvider';

const MainProvider = ({ children }) => {
  return (
    <AppProvider>{children}</AppProvider>
  );
};

export default memo(MainProvider);
