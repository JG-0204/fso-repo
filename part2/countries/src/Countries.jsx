import { useState } from 'react';
import Weather from './Weather';

const Countries = ({ countries }) => {
  const length = countries.length;

  if (length > 10) return <p>Too many matches, specify another filter</p>;

  if (length <= 10 && length !== 1) {
    return (
      <>
        {countries.map((country, index) => (
          <Country key={index} name={country.name.common} country={country} />
        ))}
      </>
    );
  }

  const country = countries[0];

  return (
    <CountryData
      key={0}
      name={country.name.common}
      area={country.area}
      capital={country.capital}
      capitalInfo={country.capitalInfo.latlng}
      languages={country.languages}
      flag={country.flags.png}
    />
  );
};

const Country = ({ name, country }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {name}
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show ? (
        <CountryData
          key={0}
          name={country.name.common}
          area={country.area}
          capital={country.capital}
          capitalInfo={country.capitalInfo.latlng}
          languages={country.languages}
          flag={country.flags.png}
        />
      ) : null}
    </div>
  );
};

const CountryData = ({ name, area, capital, capitalInfo, languages, flag }) => {
  const arrOfLang = Object.values(languages);
  const latitude = capitalInfo[0];
  const longitude = capitalInfo[1];

  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>languages: </h3>
      <ul>
        {arrOfLang.map((lang, index) => (
          <Language key={index} lang={lang} />
        ))}
      </ul>
      <img src={flag} alt="" />
      <div>
        <Weather lat={latitude} lng={longitude} capitalName={capital} />
      </div>
    </div>
  );
};

const Language = ({ lang }) => {
  return <li>{lang}</li>;
};

export default Countries;
