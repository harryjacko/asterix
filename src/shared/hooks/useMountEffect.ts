import { EffectCallback, useEffect, useLayoutEffect } from "react";

/*

useMountEffect allows running function only once after component was mounted.

useMountEffect(() => {
  someAction(someProp);
});

Basically it's the same as writing

useEffect(() => {
  someAction(someProp);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

However, it will show other developers that the function is intended to be run
once only on component's mount. That is why "missing" dependencies warning was
suppressed intentionally.

*/

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useMountEffect = (effect: EffectCallback) => useEffect(effect, []);

export const useMountLayoutEffect = (effect: EffectCallback) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, []);
