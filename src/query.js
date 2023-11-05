const SEARCH_TERM = "tops";
const SORT = "DESC";
const NUMBER_OF_RESULTS = 6;

//    products(search: "${SEARCH_TERM}") {

const query = {
  query: `{
    products(search: "${SEARCH_TERM}", sort: { name: ${SORT} },  pageSize: 18) {
      items {
        name
        sku
        price_range {
          minimum_price {
            # we don't need this anymore # discount { percent_off }
            regular_price { value }
            # we don't need this anymore #  final_price { value }
          }
        }
        ... on ConfigurableProduct {
          discounted_price
          discount_percentage
          inventory_details {
            sku location quantity
          }
        }
        image { url }
      }
    }
  }`,
};
export default query;
