import React, { FC, useEffect } from 'react';
import Meter from '../Meter/Meter.component';
import { decayMeters } from '../../helpers/meters.helper';
import { meters } from '../../data/meters.data';

const MeterArea: FC = () => {
  useEffect(() => {
    decayMeters(meters);
  }, []);
  return (
    <div>
      <Meter meterName="hunger" />
      <Meter meterName="energy" />
      <Meter meterName="health" />
      <Meter meterName="money" />
    </div>
  );
};

export default MeterArea;
