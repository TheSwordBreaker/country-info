import { GetStaticProps } from 'next';
import React, { useState } from 'react';

import Layout from '../components/Layout';
import { Countries, Country } from '../interfaces';
// import List from '../components/List';

type Direaction = 'asc' | 'desc' | null;

const Home = ({ countries }: Countries) => {
  const [data, setData] = useState(countries);
  const [dires, setDires] = useState<Direaction>(null);
  const showOnly: number = 10;

  const changedDireaction = (x: keyof Country, direaction?: Direaction) => {
    if (direaction === 'asc') setData([...countries].sort((a: Country, b: Country) => (a[x] > b[x] ? -1 : 1)));
    else if (direaction === 'desc') setData([...countries].sort((a: Country, b: Country) => (a[x] < b[x] ? -1 : 1)));
    else setData(countries);
  };

  const orderBy = (x: keyof Country) => {
    if (!dires) {
      setDires('asc');
      console.log('asc');
      changedDireaction(x, 'asc');
    } else if (dires === 'asc') {
      setDires('desc');
      console.log('desc');
      changedDireaction(x, 'desc');
    } else {
      setDires(null);
      console.log(null);
      changedDireaction(x);
    }
  };

  return (
    <Layout>
      <div>
        <button onClick={() => orderBy('name')}>
          <div>Name</div>
        </button>
        <button onClick={() => orderBy('population')}>
          <div>population</div>
        </button>
        <button onClick={() => orderBy('capital')}>
          <div>capital</div>
        </button>
        <button onClick={() => orderBy('area')}>
          <div>area</div>
        </button>
      </div>
      {data.slice(0, showOnly).map((x, id) => (
        <div key={id} style={{ display: 'flex' }}>
          <div>{x.name}</div>
          <div>{x.population}</div>
          <div>{x.capital}</div>
          <div>{x.area}</div>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  // console.log(res);
  const countries: Countries = await res.json();
  // console.log(countries);
  // var countries = 'raj';
  return {
    props: {
      countries,
    },
  };
};

export default Home;
