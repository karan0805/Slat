// import { Paper } from '@mantine/core';
import { React, useEffect, useState } from 'react';
import * as d3 from 'd3';

import './index.css';
import { OrgChartComponent } from './OrgChart';

// const projectData = [
//   {
//     name: 'John Doe',
//     title: 'Lead',
//     children: [
//       {
//         name: 'Jane Doe',
//         title: 'Maintainer',
//         children: [
//           {
//             name: 'Mark Doe',
//             title: 'Member',
//           },
//           {
//             name: 'Mary Doe',
//             title: 'Member',
//           },
//         ],
//       },
//       {
//         name: 'Scott Doe',
//         title: 'Maintainer',
//         children: [
//           {
//             name: 'Drake Doe',
//             title: 'Member',
//           },
//         ],
//       },
//       {
//         name: 'Tom Doe',
//         title: 'Maintainer',
//         children: [
//           {
//             name: 'Jack Doe',
//             title: 'Member',
//           },
//           {
//             name: 'Drake Doe',
//             title: 'Member',
//           },
//         ],
//       },
//     ],
//   },
// ];

// // const data = [
// //   {
// //     name: 'Root',
// //     children: [
// //       {
// //         name: 'Child 1',
// //         children: [
// //           {
// //             name: 'Grand Child',
// //           },
// //         ],
// //       },
// //       {
// //         name: 'Child 2',
// //         children: [
// //           {
// //             name: 'Grand Child',
// //             children: [
// //               {
// //                 name: 'Great Grand Child 1',
// //               },
// //               {
// //                 name: 'Grand Grand Child 2',
// //               },
// //             ],
// //           },
// //         ],
// //       },
// //       {
// //         name: 'Child 3',
// //       },
// //     ],
// //   },
// // ];

// const Card = ({ data }) => {
//   return (
//     <ul>
//       {data.map((member) => (
//         <>
//           <li key={member.name}>
//             <Paper shadow="sm" p="md" className="id">
//               {/* <Avatar
//                 radius="xl"
//                 size="lg"
//                 shadow="sm"
//                 src={`https://avatars.dicebear.com/api/adventurer-neutral/${member.name}.svg`}
//               /> */}
//               <div className="card-body">
//                 <h2>{member.name}</h2>
//                 <p>{member.title}</p>
//               </div>
//             </Paper>
//             {member.children?.length && <Card data={member.children} />}
//           </li>
//         </>
//       ))}
//     </ul>
//   );
// };

const Chart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    d3.csv(
      'https://gist.githubusercontent.com/kkhitesh/e132e6ec468302efdae0aff323733db4/raw/9c155de0c5d0c4b05acf586ab4bd57bb648c42be/users.csv',
    ).then((data) => {
      setData(data);
    });
  }, [true]);

  // useEffect(() => {
  //   d3.csv('users.csv', function (data) {
  //     setData(data);
  //   });
  // }, []);

  console.log(data);

  return (
    <div className="org-tree">
      <OrgChartComponent data={data} />
    </div>
  );
};

export default Chart;
