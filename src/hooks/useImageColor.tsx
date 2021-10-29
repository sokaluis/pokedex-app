/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import ImageColors from 'react-native-image-colors';

export type Color = string | undefined;

interface Props {
  url: string;
}

export const useImageColor = ({ url }: Props) => {
  const [bgColor, setBgColor] = useState<Color>('#3c3c3c');
  const isMounted = useRef(true);

  const handleBgColor = async () => {
    const result = await ImageColors.getColors(url, {
      fallback: '#3c3c3c',
      cache: true,
    });

    let dominant: Color;
    let backgroungColor: Color;

    if (!isMounted) {
      return;
    }

    switch (result.platform) {
      case 'android':
        dominant = result.dominant;
        setBgColor(dominant);
        break;
      case 'ios':
        backgroungColor = result.background;
        setBgColor(backgroungColor);
        break;
      default:
        throw new Error('Unexpected platform key');
    }

    return () => (isMounted.current = false);
  };

  useEffect(() => {
    handleBgColor();
  }, [url]);

  return {
    bgColor,
  };
};
