/* eslint-disable no-sequences */
import { useEffect, useState } from 'react';

// interface Props {
//   debounce: (input: string, time: number) => string;
// }

export const useDebounceValue = (input: string = '', time: number = 500) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(input);
    }, time);
    return () => clearTimeout(timeout);
  }),
    [input];

  return {
    debounceValue,
  };
};
