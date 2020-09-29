import axios from 'axios';

const fetchData = async () => {
  try {
    const {data: {categories} = {}} = await axios.get(
      'https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e',
    );
    console.log(categories, 'data-fetchData');
    return categories;
  } catch (error) {
    console.log(error, 'error-fetchData');
  }
};

export {fetchData};
