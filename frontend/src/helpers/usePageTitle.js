import { useEffect } from 'react';

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Codely`;
  }, []);
};

export default usePageTitle;
