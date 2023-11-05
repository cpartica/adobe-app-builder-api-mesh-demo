const SEARCH_TERM = "tops";
const SORT = "DESC";
const NUMBER_OF_RESULTS = 18;

//    products(search: "${SEARCH_TERM}") {

const query = {
  query: `{
    products(search: "${SEARCH_TERM}", sort: { name: ${SORT} },  pageSize: ${NUMBER_OF_RESULTS}) {
      items {
        name
        sku
        price_range {
          minimum_price {
            discount { percent_off }
            regular_price { value }
            final_price { value }
          }
        }
        stock_status
        image { url }
      }
    }
  }`,
};
export default query;
