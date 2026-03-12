let AUTO_INCREMENT = 1;
const cities = [];

// immutable
function findAll() {
  return JSON.parse(JSON.stringify(cities));
}

// immutable
function findOneById(cityId) {
  return findAll().find((city) => city.id === cityId);
}

function findOneByName(cityName) {
  return findAll().find(
    (city) => city.name.toLowerCase() === cityName.toLowerCase()
  );
}

function createOne(city) {
  const name = city.name
    .toLowerCase()
    .replace(
      /^./,
      city.name[0].toUpperCase()
    );

  const newCity = {
    id: AUTO_INCREMENT,
    name,
  }
  cities.push(newCity);

  AUTO_INCREMENT += 1;

  return {...newCity};
}

const cityService = {
  findAll,
  findOneById,
  findOneByName,
  createOne,
}

export default cityService;
