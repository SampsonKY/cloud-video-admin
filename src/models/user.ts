import { useState } from 'react';

export default () => {
  const [username, setUsername] = useState<string>('');
  return { username, setUsername };
};
