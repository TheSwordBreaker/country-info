import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Layout from '../../components/Layout';
import { CountryDeatils } from '../../interfaces';
import styles from '../../styles/Details.module.css';

type CountryDeatilsViewProps = {
  country?: CountryDeatils;
  error?: string;
};

const CountryDeatilsView = ({ country, error }: CountryDeatilsViewProps) => {
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Layout title={country?.name}>
      <div>
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
            <div className={styles.details_panel_value}>{country?.languages.map(({ name }) => name).join(', ')} </div>
          </div>
          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}> currencies</div>
            <div className={styles.details_panel_value}>{country?.currencies.map(({ name }) => name).join(', ')} </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}> Native name </div>
            <div className={styles.details_panel_value}>{country?.nativeName} </div>
          </div>

          <div className={styles.details_panel_row}>
            <div className={styles.details_panel_label}> gini </div>
            <div className={styles.details_panel_value}>{country?.gini} </div>
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
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const country: Country = await res.json();
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
