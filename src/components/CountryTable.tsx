import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';

import { Countries, Country } from '../interfaces';
import styles from '../styles/CountryTable.module.css';

type Direaction = 'asc' | 'desc' | null;

type SortArrayProps = {
  className: string;
  onClick: () => void;
  direaction: Direaction;
  myKey: keyof Country;
  orderByKey: keyof Country;
  children?: ReactNode;
};

const SortArray = ({ children, className, onClick, direaction, myKey, orderByKey }: SortArrayProps) => {
  return (
    <>
      <button onClick={onClick} className={className}>
        {children ?? <div>{myKey}</div>}
        {myKey == orderByKey && direaction ? (
          <div className={styles.heading_arrow}>
            {direaction != null && direaction === 'asc' ? <KeyboardArrowDownRounded /> : <KeyboardArrowUpRounded />}
          </div>
        ) : null}
      </button>
    </>
  );
};

const CountryTable = ({ countries = [] }: Countries) => {
  const [LastDireaction, setLastDireaction] = useState<Direaction>(null);
  const [orderByKey, setOrderByKey] = useState<keyof Country>('name');
  // const [search, setSearch] = useState<string>('');
  // const showOnly: number = 10;

  const changedDireaction = (countries: Country[], x: keyof Country, direaction: Direaction) => {
    if (direaction === 'asc') {
      return [...countries].sort((a: Country, b: Country) => (a[x] > b[x] ? -1 : 1));
    } else if (direaction === 'desc') {
      return [...countries].sort((a: Country, b: Country) => (a[x] < b[x] ? -1 : 1));
    }
    return countries;
  };

  const orderedCountries = changedDireaction(countries, orderByKey, LastDireaction);

  const orderBy = (x: keyof Country) => {
    changedSort();
    setOrderByKey(x);
  };

  const changedSort = () => {
    if (!LastDireaction) {
      setLastDireaction('asc');
    } else if (LastDireaction === 'asc') {
      setLastDireaction('desc');
    } else {
      setLastDireaction(null);
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>
        <SortArray
          className={styles.heading_name}
          orderByKey={orderByKey}
          direaction={LastDireaction}
          myKey="name"
          onClick={() => orderBy('name')}
        />

        <SortArray
          className={styles.heading_population}
          onClick={() => orderBy('population')}
          orderByKey={orderByKey}
          direaction={LastDireaction}
          myKey="population"
        />

        <SortArray
          className={styles.heading_capital}
          onClick={() => orderBy('capital')}
          orderByKey={orderByKey}
          direaction={LastDireaction}
          myKey="capital"
        />

        <SortArray
          className={styles.heading_area}
          onClick={() => orderBy('area')}
          orderByKey={orderByKey}
          direaction={LastDireaction}
          myKey="area">
          <div>
            Area (km <sup style={{ fontSize: '0.5rem' }}> 2 </sup>)
          </div>
        </SortArray>

        <SortArray
          className={styles.heading_gini}
          onClick={() => orderBy('gini')}
          orderByKey={orderByKey}
          direaction={LastDireaction}
          myKey="gini"
        />
      </div>
      {orderedCountries.map((x, id) => (
        <Link key={id} href={`country/${x.alpha2Code}`}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={x?.flag} alt={x?.name} />
            </div>
            <div className={styles.name}>{x.name}</div>
            <div className={styles.population}>{x.population}</div>
            <div className={styles.capital}>{x.capital}</div>
            <div className={styles.area}>{x?.area?.toLocaleString()}</div>
            <div className={styles.area}>{x?.gini?.toLocaleString() || 0} </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountryTable;
