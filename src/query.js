const SEARCH_TERM = "tops";
const NUMBER_OF_RESULTS = 6;

//    products(search: "${SEARCH_TERM}") {

const query = {
  query: `{
    products(
      search: "${SEARCH_TERM}"
      sort: {name: ASC}
      ) {
      items {
          __typename
        name
        sku
        special_price
        price_range {
          minimum_price {
            discount { percent_off }
            regular_price { value }
            final_price { value }
          }
        }
        image {
          url
        }
        inventory_details {
          sku
          location
          quantity
        }
      }
    }
  }`,
};
export default query;
