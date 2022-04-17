import { Paper } from '@mantine/core';
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
          {
            name: 'Drake Doe',
            title: 'Member',
          },
        ],
      },
    ],
  },
];

// const data = [
//   {
//     name: 'Root',
//     children: [
//       {
//         name: 'Child 1',
//         children: [
//           {
//             name: 'Grand Child',
//           },
//         ],
//       },
//       {
//         name: 'Child 2',
//         children: [
//           {
//             name: 'Grand Child',
//             children: [
//               {
//                 name: 'Great Grand Child 1',
//               },
//               {
//                 name: 'Grand Grand Child 2',
//               },
//             ],
//           },
//         ],
//       },
//       {
//         name: 'Child 3',
//       },
//     ],
//   },
// ];

const Card = ({ data }) => {
  return (
    <ul>
      {data.map((member) => (
        <>
          <li key={member.name}>
            <Paper shadow="sm" p="md" className="id">
              {/* <Avatar
                radius="xl"
                size="lg"
                shadow="sm"
                src={`https://avatars.dicebear.com/api/adventurer-neutral/${member.name}.svg`}
              /> */}
              <div className="card-body">
                <h2>{member.name}</h2>
                <p>{member.title}</p>
              </div>
            </Paper>
            {member.children?.length && <Card data={member.children} />}
          </li>
        </>
      ))}
    </ul>
  );
};

const Chart = () => {
  return (
    <div className="org-tree">
      <Card data={projectData} />
    </div>
  );
};

export default Chart;
