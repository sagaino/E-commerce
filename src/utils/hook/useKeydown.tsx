import React, { useEffect } from 'react'

type DataFunction = () => Promise<void>;

const useEnterKeyHandler = (data: DataFunction) => {
  const keyHandler = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      data()
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
};

export default useEnterKeyHandler;
