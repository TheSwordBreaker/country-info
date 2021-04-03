import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/Layout';
import { CountryDeatils } from '../../interfaces';
import styles from '../../styles/Details.module.css';

type CountryDeatilsViewProps = {
  country?: CountryDeatils;
  error?: string;
};

const getCountry = async (id: string | string[] | undefined) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country: CountryDeatils = await res.json();
  return country;
};

const CountryDeatilsView = ({ country, error }: CountryDeatilsViewProps) => {
  if (error) {
    return <div>{error}</div>;
  }

  const [border, setBorder] = useState<CountryDeatils[]>([]);

  const getBorders = async () => {
    const borders = country?.borders.map(async (x: string) => await getCountry(x)) || [];
    const border: CountryDeatils[] | undefined = await Promise.all(borders || []);
    console.log(border);
    setBorder(border);
  };
  console.log('Borders are');
  console.log(border);
  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country?.name}>
      <div className={styles.countainer}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country?.flag} alt={country?.name} />
            <h1 className={styles.overview_name}>{country?.name}</h1>
            <div className={styles.overview_region}>{country?.region}</div>
            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>{country?.population}</div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country?.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}> Deatils </h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> Captial </div>
              <div className={styles.details_panel_value}>{country?.capital} </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> Subregion </div>
              <div className={styles.details_panel_value}>{country?.subregion} </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> languages </div>
              <div className={styles.details_panel_value}>
                {country?.languages?.map(({ name }) => name).join(', ')}{' '}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> currencies</div>
              <div className={styles.details_panel_value}>
                {country?.currencies?.map(({ name }) => name).join(', ')}{' '}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> Native name </div>
              <div className={styles.details_panel_value}>{country?.nativeName} </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}> gini </div>
              <div className={styles.details_panel_value}>{country?.gini} </div>
            </div>

            <div className={styles.details_panel_border}>
              <div className={styles.details_panel_border_label}>Neighbouring Countries</div>
              <div className={styles.details_panel_border_body}>
                {border?.map(({ name, flag }) => (
                  <div key={name} className={styles.details_panel_border_country}>
                    <img src={flag} alt={name} />
                    <div className={styles.details_panel_border_name}>{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }: GetServerSidePropsContext) => {
  //something
  try {
    const id = params?.id;
    const country: CountryDeatils = await getCountry(id);

    return {
      props: {
        country,
      },
    };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};

export default CountryDeatilsView;
