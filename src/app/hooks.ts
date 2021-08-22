import { useLayoutEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useNearBottom(effect: () => void) {
  const throttleWait = 300;
  let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

  const callBack = () => {
    const scrolled = window.innerHeight + window.scrollY;
    const scrollThreshold = document.body.offsetHeight - 500;
    if (scrolled >= scrollThreshold) {
      effect();
    }
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout === null) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        throttleTimeout = setTimeout(callBack, throttleWait);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
