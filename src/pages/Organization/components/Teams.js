import React from 'react';

export default function Teams() {
  const persons = ['Web', 'Software', 'Testing'];

  return (
    <div>
      <ul className="list-group">
        {persons.map((listitem) => (
          <li
            key={listitem}
            className="list-group-item list-group-item-primary"
          >
            {listitem}
          </li>
        ))}
      </ul>
    </div>
  );
}
