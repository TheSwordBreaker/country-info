import SearchRounded from '@material-ui/icons/SearchRounded';
import { GetStaticProps } from 'next';
import React, { useState } from 'react';

import CountryTable from '../components/CountryTable';
import Layout from '../components/Layout';
import { Countries } from '../interfaces';
import styles from '../styles/Home.module.css';

const SearchInput = ({ ...rest }) => (
  <div className={styles.inputWrapper}>
    <SearchRounded />
    <input className={styles.input} {...rest} />
  </div>
);

const Home = ({ countries }: Countries) => {
  console.log('do something');

  const [keyword, setKeyword] = useState<string>('');
  const filterCountries = countries.filter(
    (x) =>
      x.name.toLowerCase().includes(keyword) ||
      x.region.toLowerCase().includes(keyword) ||
      x.subregion.toLowerCase().includes(keyword),
  );

  // console.log(filterCountries);
  const onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputBar}>
        <div className={styles.counts}>Found {countries.length} countries </div>

        <SearchInput placeholder="Filter By Name, Region and SubRegion" value={keyword} onChange={onInputChanged} />
      </div>

      <CountryTable countries={filterCountries} />
    </Layout>
  );
};

console.log('do something');
export const getStaticProps: GetStaticProps = async () => {
  // I was trying to get field with types key If you know that pls tell me
  const FieldNeed = ['gini', 'flag', 'alpha2Code', 'population', 'name', 'area', 'capital', 'region', 'subregion'];

  const url = `https://restcountries.eu/rest/v2/all?fields=${FieldNeed.join(';')} `;
  const res = await fetch(url);
  // const res = await fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;population;area;alpha2Code');
  // console.log(res);
  const countries: Countries = await res.json();
  // console.log(countries);

  // var countries: Countries = { countries:s sampleCountryData };
  return {
    props: {
      countries,
    },
  };
};

export default Home;
