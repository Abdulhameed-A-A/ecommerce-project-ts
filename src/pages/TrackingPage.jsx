import dayjs from 'dayjs';
import axios from 'axios'
import { Link } from 'react-router';
import { useParams } from 'react-router'
import { useState, useEffect } from 'react';
import { Header } from '../components/Header'
import "./TrackingPage.css"

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async() => {
      const response = await axios.get(`api/orders/${orderId}?expand=products`)
      setOrder(response.data)
    }

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  let orderProduct;
  try {
    orderProduct = order.products.find((orderProduct) => orderProduct.productId == productId);
    if (!orderProduct) {
      throw new Error('Product not found in order');
    }
  } catch (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return(
    <>
      <title>Tracking</title>
      <Header cart={cart}/>

      <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="images/logo-white.png" />
          <img className="mobile-logo"
            src="images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">3</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>

    <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div className="delivery-date">
          Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
        </div>

        <div className="product-info">
          {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity: {orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className="progress-label">
            Preparing
          </div>
          <div className="progress-label current-status">
            Shipped
          </div>
          <div className="progress-label">
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
    </>
  );
}