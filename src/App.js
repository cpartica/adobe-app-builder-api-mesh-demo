import "./styles.css";
import React from "react";
import query from "./query.js";
import CodeSidebar from "./codeSidebar";

const API_MESH_URL =
  "https://graph.adobe.io/api/b0dbe9d4-3f38-449f-960b-d552262df0fd/graphql?api_key=7715c008367e49b48a760bc1e7c53997";

const SOURCE_1_NAME = "Source: Adobe Commerce";
const SOURCE_2_NAME = "Source: ERP";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class APIMeshExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMeshRes: "",
      products: [],
    };
  }

  componentDidMount() {
    let options = {
      method: "post",
      body: JSON.stringify(query),
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(API_MESH_URL, options)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        this.setState({
          apiMeshRes: res.data,
          products: res.data.products ? res.data.products.items : [],
        });
      });
  }

  render() {
    return (
      <>
        <div>
          <img className="nav" src="nav.png" />

          <div className="results">
            <div>
              <ul>
                {this.state.products.map((item, idx) => (
                  <>
                    <li id={idx} key={item.sku}>
                      <img id={item.image.url} src={item.image.url} />
                      <p className="item-name auto-width" id={item.name}>
                        {item.name}
                      </p>

                      {item.discount_percentage &&
                      item.discount_percentage > 0 ? (
                        <div className="price-container">
                          <p className="price strike">
                            {USDollar.format(
                              item.price_range.minimum_price.regular_price
                                .value,
                            )}
                          </p>
                          <p
                            className="sale price-container"
                            id={idx + this.state.salePrice}
                          >
                            {USDollar.format(item.discounted_price)} (
                            <span>{item.discount_percentage}% Off</span>)
                          </p>
                        </div>
                      ) : (
                        <p id="price">
                          ${item.price_range.minimum_price.regular_price.value}
                        </p>
                      )}

                      <button
                        className={
                          item.inventory_details &&
                          item.inventory_details.quantity > 0
                            ? "enabled-button"
                            : "disabled-button"
                        }
                        disabled={
                          (item.inventory_details &&
                            !item.inventory_details.quantity) > 0
                        }
                      >
                        ADD TO CART
                      </button>
                      <span>&#9825;</span>

                      {item.inventory_details &&
                      item.inventory_details.quantity > 0 ? (
                        <div>
                          <p className="auto-width" id={item.sku}>
                            Items remaining: {item.inventory_details.quantity}
                          </p>
                          <p className="auto-width" id={item.sku + idx}>
                            Location: {item.inventory_details.location}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="auto-width sale" id={item.sku}>
                            Out of Stock
                          </p>
                        </div>
                      )}
                    </li>
                  </>
                ))}
              </ul>
            </div>
            <div>
              <CodeSidebar meshResponse={this.state.apiMeshRes} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default APIMeshExample;
