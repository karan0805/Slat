import * as d3 from 'd3';
import { React, useEffect, useState } from 'react';
import './index.css';
import { OrgChartComponent } from './OrgChart';

const Chart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv(
      'https://gist.githubusercontent.com/kkhitesh/e132e6ec468302efdae0aff323733db4/raw/9c155de0c5d0c4b05acf586ab4bd57bb648c42be/users.csv',
    ).then((data) => {
      setData(data);
    });
  }, [true]);

  return (
    <div className="org-tree">
      <OrgChartComponent data={data} />
    </div>
  );
};

export default Chart;
