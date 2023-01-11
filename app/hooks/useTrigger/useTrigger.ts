import { useState } from 'react';

type Value = boolean;
type Off = () => void;
type On = () => void;

const useTrigger = (defaultValue = false): [Value, On, Off] => {
  const [value, setValue] = useState<Value>(defaultValue);

  const on = (): void => setValue(true);
  const off = (): void => setValue(false);

  return [value, on, off];
};

export default useTrigger;
