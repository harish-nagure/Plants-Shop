import { useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const paymentType = location.state?.paymentType || "Online";

  return (
    <div style={{textAlign: "center", marginTop: "60px"}}>
      <h1>Order Placed Successfully 🎉</h1>
      <p>Payment Method: <b>{paymentType}</b></p>
      <p>Your order will be delivered within 3 to 5 days.</p>
    </div>
  );
}