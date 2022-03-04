/*global kakao*/
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const StMap = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 30vw;
  @media only screen and (max-width: 1024px) {
    height: 50vw;
  }
`;

const Map = (data) => {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  useEffect(() => {
    // const script = document.createElement("script");
    // script.async = true;
    // script.src =
    //     "https://dapi.kakao.com/v2/maps/sdk.js?appkey=5e0cf02b4db7baedceb1da4a20bf1b17&autoload=false";
    // // script.src =
    // //     "https://dapi.kakao.com/v2/maps/sdk.js?appkey=5e0cf02b4db7baedceb1da4a20bf1b17";
    // document.head.appendChild(script);

    // script.onload = () => {
    //     kakao.maps.load(() => {
    //         const pick_container = container.current;
    //         const options = {
    //             center: new kakao.maps.LatLng(
    //                 data.map_coordinate.lat,
    //                 data.map_coordinate.lng
    //             ),
    //             level: 5,
    //         };
    //         // const map = new kakao.maps.Map(pick_container, options);
    //         new kakao.maps.Map(pick_container, options);
    //     });
    // };
    const pick_container = container.current;
    const options = {
      center: new kakao.maps.LatLng(data.map_coordinate.lat, data.map_coordinate.lng), //지도의 중심좌표
      level: 5, //지도의 레벨(확대, 축소 정도)
    };
    new kakao.maps.Map(pick_container, options);
    // return () => {};
  }, [data.map_coordinate]);

  return <StMap ref={container}></StMap>;
};

export default Map;
