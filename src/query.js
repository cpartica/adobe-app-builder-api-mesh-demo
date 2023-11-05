const SEARCH_TERM = "tops";
const SORT = "ASC";
const NUMBER_OF_RESULTS = 6;

//    products(search: "${SEARCH_TERM}") {

const query = {
  query: `{
    products(search: "${SEARCH_TERM}", sort: { name: ${SORT} },  pageSize: 18) {
      items {
        __typename
        name
        sku
        price_range {
          minimum_price {
            discount { percent_off }
            regular_price { value }
            final_price { value }
          }
        }
        image { url }
      }
    }
  }`,
};
export default query;
