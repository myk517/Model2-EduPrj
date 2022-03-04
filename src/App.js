import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import Join from "./page/Join";
import Charge from "./page/charge/Charge";
import Payment from "./page/payment/Payment";
import LoginAlert from "./page/LoginAlert";
import PaymentHistory from "./page/paymentHistory/PaymentHistory";
import Mcharge from "./libraries/import/Mcharge";
import Mpayment from "./libraries/import/Mpayment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/charge" element={<Charge />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/myPage" element={<PaymentHistory />} />
      <Route path="/loginAlert" element={<LoginAlert />} />
      <Route path="/Mcharge" element={<Mcharge />} />
      <Route path="/Mpayment" element={<Mpayment />} />
    </Routes>
  );
}

export default App;
