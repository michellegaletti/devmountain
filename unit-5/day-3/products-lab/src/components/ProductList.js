import { Component } from "react";
import axios from "axios";
import Form from "./Form";

class ProductList extends Component {
  constructor() {
    super();
    this.state = {
      allProducts: [],
      product: null,
      isEdit: false,
      newDesc: "",
    };
  }

  componentDidMount() {
    axios
      .get("/api/products/")
      .then((response) => {
        this.setState({ allProducts: response.data });
      })
      .catch((err) => console.log(err));
  }

  getOne = (id) => {
    axios
      .get(`/api/products/${id}`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((err) => console.log(err));
  };

  create = (name, description, price, image_url) => {
    axios
      .post(`/api/products/`, { name, description, price, image_url })
      .then((response) =>
        this.setState({ allProducts: response.data, ...this.state.allProducts })
      )
      .catch((err) => console.log(err));
  };

  update = (id, description) => {
    axios
      .put(`/api/products/${id}`, description)
      .then((response) => {
        this.setState({ allProducts: response.data });
      })
      .catch((err) => console.log(err));
  };

  delete = (id) => {
    axios
      .delete(`/api/products/${id}`)
      .then((response) => {
        this.setState({ allProducts: response.data });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (value) => {
    console.log(value);
    this.setState({ newDesc: value });
  };

  toggleEdit = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  handleSave = (index) => {
    this.update(this.state.allProducts[index].product_id, this.state.newDesc);
    this.toggleEdit();
    this.setState({ newDesc: "" });
  };

  render() {
    return this.state.editMode ? (
      <div>
        <Form allProducs={this.state.allProducts} createProduct={this.create} />
        <div className="products">
          {this.state.allProducts.map((product, index) => {
            return (
              <div key={index} className="productCard">
                <img
                  className="productImg"
                  src={product.image_url}
                  alt={product.name}
                />
                <p>${product.price}</p>
                <h3>{product.name}</h3>
                <div>
                  <input
                    className="inputFields"
                    placeholder={product.description}
                    value={product.description}
                    onChange={(e) => this.handleChange(e.target.value)}
                  />
                  <button onClick={() => this.handleSave(index)}>Save</button>
                </div>
                <button onClick={() => this.delete(product.product_id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div>
        <Form allProducs={this.state.allProducts} createProduct={this.create} />
        <div className="products">
          {this.state.allProducts.map((product, index) => {
            return (
              <div key={index} className="productCard">
                <img
                  className="productImg"
                  src={product.image_url}
                  alt={product.name}
                />
                <p>${product.price}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button onClick={() => this.toggleEdit()}>Edit</button>
                <button onClick={() => this.delete(product.product_id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductList;
