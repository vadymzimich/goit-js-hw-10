import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEL = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEL.addEventListener(
  'input',
  debounce(e => {
    const trimmedValue = inputEL.value.trim();
    removeMarkup();
    if (trimmedValue !== '') {
      fetchCountries(trimmedValue).then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (!data.length) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (data.length >= 2 && data.length <= 10) {
          renderCountries(data);
        } else if (data.length === 1) {
          renderOneCountry(data);
        }
      });
    }
  }, DEBOUNCE_DELAY)
);

function removeMarkup() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderOneCountry(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="60" hight="40">
         <b class = "country-name">${country.name.official}</b></p>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
