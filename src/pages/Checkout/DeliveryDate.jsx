import dayjs from "dayjs"

export function DeliveryDate({ deliveryOptions, cartItem }) {
  const selectDelivaryOption = deliveryOptions
    .find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId
    })
  return (
    <>
      <div className="delivery-date">
        Delivery date: {dayjs(selectDelivaryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>
    </>
  )
}