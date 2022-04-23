import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/buttons/Button";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    alert("로그아웃");
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <>
      <nav>
        <ul className="header">
          <li style={{ width: "40%", margin: "0 auto" }}>
            <img
              src="https://www.e4net.net/img/custom/logo.png"
              alt="E4net"
              onClick={() => {
                navigate("/");
              }}
            />
          </li>
          <li>
            <Link to="charge">머니충전</Link>
          </li>

          <li>
            <Link to="payment">상품결제</Link>
          </li>
          <li>
            <Link to="myPage">거래내역</Link>
            {/* <Link to="myPage2.jsp?pageNum1=0&pageNum2=10">거래내역</Link> */}
          </li>
          {!sessionStorage.getItem("token") ? (
            <li>
              <Link to="/login">로그인</Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={logout}>
                로그아웃
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
