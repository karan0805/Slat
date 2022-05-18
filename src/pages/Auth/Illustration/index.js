import { Center } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import illustration1 from '../../../assets/images/illustration1.png';
import illustration2 from '../../../assets/images/illustration2.png';
import illustration3 from '../../../assets/images/illustration3.png';

const Illustration = () => {
  const [active, setActive] = useState(0);

  const interval = useInterval(() => setActive((s) => (s + 1) % 3), 5000);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <>
      {active == 0 && (
        <Center>
          <img src={illustration1} width="400px" />
        </Center>
      )}
      {active == 1 && (
        <Center>
          <img src={illustration2} width="400px" />
        </Center>
      )}
      {active == 2 && (
        <Center>
          <img src={illustration3} width="400px" />
        </Center>
      )}
    </>
  );
};

export default Illustration;
