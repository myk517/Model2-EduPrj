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
          <li style={{ width: "20%", margin: "0 auto" }}>
            <img
              src="img/e4netMain.png"
              alt="E4net"
              onClick={() => {
                navigate("/loginAlert");
              }}
            />
          </li>
          <li>
            <Link to="charge">머니충전</Link>
          </li>

          <li>
            <Link to="payment">머니결제</Link>
          </li>
          <li>
            <Link to="myPage">거래내역</Link>
            {/* <Link to="myPage2.jsp?pageNum1=0&pageNum2=10">거래내역</Link> */}
          </li>
          {!sessionStorage.getItem("token") ? (
            <li>
              <Link to="/">로그인</Link>
            </li>
          ) : (
            <li>
              <Link to="/" onClick={logout}>
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
