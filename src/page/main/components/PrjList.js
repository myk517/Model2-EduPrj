import { Link } from "react-router-dom";
import { Card, CardGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getApiAllGoods } from "../../../api/getApiAllGoods";
import styled from "@emotion/styled";
import "./Main.css";

const PrjList = () => {
  let [projectsData, setProjectsData] = useState([]);
  let [allData, setAllData] = useState([]); //const로 지정 시 typeError 발생하여 let 지정

  useEffect(() => {
    getApiAllGoods()
      .then((res) => {
        console.log("allGoodsApi Success...", res, res.data.data[0]);
        setAllData(res.data.data);
      })
      .catch((err) => {
        console.log("allGoodsApi fail...", err);
      });
  }, []);

  //전체 데이터(반복문)
  projectsData = allData.map(function (data, i) {
    return data;
  });

  return (
    <Container>
      <p
        className="main_home"
        style={{
          transform: "skew(-0.1deg)",
          fontWeight: "bold",
        }}
      >
        주목할 만한 프로젝트
      </p>
      <div className="main_home_in_1">
        <CardGroup className="cardgroup_Home">
          {projectsData.slice(0, 4).map(function (data, j) {
            //8개
            return (
              <Card className="card_Home" style={{ borderColor: "transparent" }}>
                <Link
                  to={`/detail/${data.goodsSn}`}
                  //onClick={()=>{mainStore.getWork(data.work_no)}}
                >
                  <Card.Img
                    variant="top"
                    src={data.goodsImgPath}
                    // src={"/img/mainImg01.jpg"}
                    style={{
                      width: "250px",
                      height: "200px",
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  />
                </Link>
                <Card.Body className="cardbody_Home">
                  <Card.Title
                    className="cardtitle_Home"
                    style={{
                      transform: "skew(-0.1deg)",
                      fontWeight: "bold",
                      color: "#6c757d",
                    }}
                  >
                    {data.merchantSn.merchantNm} | {data.goodsNm}
                  </Card.Title>
                  <Card.Text className="cardtext_Home">
                    <Link
                      to={`/detail/${data.goodsSn}`}
                      style={{
                        textDecorationLine: "none",
                        transform: "skew(-0.1deg)",
                        color: "#495057",
                        fontWeight: "bold",
                      }}
                    >
                      {data.goodsDesc}
                    </Link>
                  </Card.Text>
                  <div className="cardfooter" style={{ marginTop: "-7px" }}>
                    {/* <p style={{ color: "#FF5757" }}>{Math.round((data.funding_now / data.funding_goal) * 100)}% 달성</p> */}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>

        <CardGroup className="cardgroup_Home">
          {projectsData.slice(4, 8).map(function (data, j) {
            return (
              //data.work_title
              <Card className="card_Home" style={{ borderColor: "transparent" }}>
                <Link
                  to={`/detail/${data.goodsSn}`}
                  // onClick={() => {
                  //   mainStore.getWork(data.work_no);
                  // }}
                >
                  <Card.Img
                    variant="top"
                    // src={`image/${data.goodsImgPath}`}
                    src={data.goodsImgPath}
                    style={{
                      width: "250px",
                      height: "200px",
                      borderRadius: 15,
                      overflow: "hidden",
                    }}
                  />
                </Link>
                <Card.Body className="cardbody_Home">
                  <Card.Title
                    className="cardtitle_Home"
                    style={{
                      transform: "skew(-0.1deg)",
                      fontWeight: "bold",
                      color: "#6D6D6D",
                    }}
                  >
                    {data.merchantSn.merchantNm} | {data.goodsNm}
                  </Card.Title>
                  <Card.Text className="cardtext_Home">
                    <Link
                      to={`/detail/${data.goodsSn}`}
                      style={{
                        textDecorationLine: "none",
                        transform: "skew(-0.1deg)",
                        color: "#343a40",
                        fontWeight: "bold",
                      }}
                    >
                      {data.goodsDesc}
                    </Link>
                  </Card.Text>
                  <div className="cardfooter" style={{ marginTop: "-7px" }}>
                    {/* <p style={{ color: "#FF5757" }}>{Math.round((data.funding_now / data.funding_goal) * 100)}% 달성</p> */}
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  margin-top: 5%;
`;

export default PrjList;
