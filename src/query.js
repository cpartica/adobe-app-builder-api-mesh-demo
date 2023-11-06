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
            # we don't need "discount.value" anymore # discount { percent_off }
            # we're using "discount_percentage"
            regular_price { value }
            # we don't need "final_price.value" anymore #  final_price { value }
            #we're using "discounted_price"
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
