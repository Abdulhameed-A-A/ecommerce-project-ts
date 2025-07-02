import { OrderGridDetails } from './OrderGridDetails';
import { OrdersHeader } from './OrdersHeader';

export function OrdersGrid({ orders }) {
  return (
    <div className="orders-grid">
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-container">
            <OrdersHeader order={order} />
            <OrderGridDetails order={order} />  
          </div>
        )
      })}
    </div>
  );
}