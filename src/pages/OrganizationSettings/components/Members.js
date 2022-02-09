import React from 'react';

export default function Members() {
  const persons = ['Sanket', 'Karan', 'Hitesh', 'Yagvalkya'];

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
