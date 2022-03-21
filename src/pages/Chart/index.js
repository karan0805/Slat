import React from 'react';

import './index.css';

const projectData = [
  {
    name: 'John Doe',
    title: 'Lead',
    children: [
      {
        name: 'Jane Doe',
        title: 'Maintainer',
        children: [
          {
            name: 'Mark Doe',
            title: 'Member',
          },
          {
            name: 'Mary Doe',
            title: 'Member',
          },
        ],
      },
      {
        name: 'Scott Doe',
        title: 'Maintainer',
        children: [
          {
            name: 'Drake Doe',
            title: 'Member',
          },
        ],
      },
      {
        name: 'Tom Doe',
        title: 'Maintainer',
        children: [
          {
            name: 'Jack Doe',
            title: 'Member',
          },
        ],
      },
    ],
  },
];

const Card = ({ data }) => {
  return (
    <>
      {data.map((member) => (
        <>
          <li key={member.name} className="card">
            {member.name}
            {member.children?.length && <Card data={member.children} />}
          </li>
        </>
      ))}
    </>
  );
};

const Chart = () => {
  return (
    <>
      <div className="org-tree" align="center">
        <Card data={projectData} />
      </div>
    </>
  );
};

export default Chart;
