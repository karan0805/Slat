import React from 'react';
import { Table } from '@mantine/core';
import { Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { useSelector } from 'react-redux';
import { selectActiveOrgDetails } from '../../redux/slices/OrgSlice';

const Explore = () => {
  // const projectData = [
  //   {
  //     id: 1,
  //     name: 'Slat',
  //     endDate: '2022-03-05',
  //     status: 'In Progress',
  //     lead: 'John Doe',
  //     members: [
  //       {
  //         name: 'John Doe',
  //         title: 'Lead',
  //         children: [
  //           {
  //             name: 'Jane Doe',
  //             title: 'Maintainer',
  //             children: [
  //               {
  //                 name: 'Mark Doe',
  //                 title: 'Member',
  //               },
  //               {
  //                 name: 'Mary Doe',
  //                 title: 'Member',
  //               },
  //             ],
  //           },
  //           {
  //             name: 'Scott Doe',
  //             title: 'Maintainer',
  //             children: [
  //               {
  //                 name: 'Drake Doe',
  //                 title: 'Member',
  //               },
  //             ],
  //           },
  //           {
  //             name: 'Tom Doe',
  //             title: 'Maintainer',
  //             children: [
  //               {
  //                 name: 'Jack Doe',
  //                 title: 'Member',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: 'Query',
  //     endDate: '2022-05-03',
  //     status: 'Not Started',
  //     lead: 'Charlie',
  //     members: [
  //       {
  //         name: 'Charlie',
  //         title: 'Lead',
  //         children: [],
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: 'Algo',
  //     endDate: '2022-02-05',
  //     status: 'Completed',
  //     lead: 'Alan',
  //   },
  // ];

  const projectData = useSelector(selectActiveOrgDetails);

  const nav = useNavigate();

  const statusBadge = (status) => {
    if (status === 'In Progress') {
      return <Badge size="lg">{status}</Badge>;
    } else if (status === 'Completed') {
      return (
        <Badge color="green" size="lg">
          {status}
        </Badge>
      );
    } else {
      return (
        <Badge color="red" size="lg">
          {status}
        </Badge>
      );
    }
  };

  const projects = projectData.projects.map((project) => (
    <tr
      key={project.id}
      onClick={() => nav('/dashboard/project-chart/' + project._id)}
    >
      <td>{project.name}</td>
      <td>{project.endDate.split('T')[0]}</td>
      <td>{statusBadge(project.status)}</td>
      <td>{project.lead.fullname}</td>
    </tr>
  ));

  return (
    <>
      <div align="center" className="table">
        <h1> 🔍 Explore</h1>
        <p>Have a look at all the Projects within the Organization</p>
        <Table horizontalSpacing="xl" verticalSpacing="xs" highlightOnHover>
          <thead>
            <tr>
              <th>Project</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Lead</th>
            </tr>
          </thead>
          <tbody>{projects}</tbody>
        </Table>
      </div>
    </>
  );
};

export default Explore;
