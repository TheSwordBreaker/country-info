import * as React from 'react';

import { Countries } from '../interfaces';

const List = ({ countries = [] }: Countries) => (
  // const List = () => (
  <ul>
    {/* {countries.map((country, id) => (
      <li key={id}> {JSON.stringify(country)} </li>
    ))} */}

    {countries.length === 0 && <div>No Data</div>}
  </ul>
);

export default List;
