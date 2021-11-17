import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import EitherCard from "./EitherCard";
import EitherCompleteCard from "./EitherCompleteCard";
import { ReactComponent as PrevArrow } from "../images/arrowLRed.svg";
import { ReactComponent as NextArrow } from "../images/arrowRed.svg";
import { mobile, tablet } from "../shared/style";

// //다음으로 넘어가기 버튼
// function NextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         width: "12.25px",
//         height: "28px",
//         zIndex: "1000",
//       }}
//       onClick={onClick}
//     >
//       <img
//         src={require("../images/arrowRed.svg").default}
//         alt="arrowNext"
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           right: "-25px",
//           border: null,
//         }}
//       />
//     </div>
//   );
// }
// //이전으로 넘어가기 버튼
// function PrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         width: "12.25px",
//         height: "28px",
//         zIndex: "1000",
//       }}
//       onClick={onClick}
//     >
//       <img
//         src={require("../images/arrowLRed.svg").default}
//         alt="arrowNext"
//         style={{
//           position: "absolute",
//           width: "100%",
//           height: "100%",
//           left: "-25px",
//           border: null,
//         }}
//       />
//     </div>
//   );
// }

const EiterSlick = ({ PostList, PostingList, PostCompleteList }) => {
  const NotCompleteList =
    PostList && PostList.filter(post => post.completed === 0);
  const CompleteList =
    PostList && PostList.filter(post => post.completed === 1);
  const sliderRef = useRef();
  const goToNext = () => {
    sliderRef.current.slickNext();
  };
  return (
    <>
      <Wrap>
        <div>
          <StyledSlider {...settings} ref={sliderRef}>
            {NotCompleteList &&
              NotCompleteList?.map(v => (
                <EitherCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                  goToNext={goToNext}
                />
              ))}
            {CompleteList &&
              CompleteList.map(v => (
                <EitherCompleteCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                />
              ))}
            {PostingList &&
              PostingList?.map(v => (
                <EitherCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                  goToNext={goToNext}
                />
              ))}
            {PostCompleteList &&
              PostCompleteList?.map(v => (
                <EitherCompleteCard
                  key={v.toString()}
                  eitherId={v.eitherId}
                  nickname={v.nickname}
                  title={v.title}
                  contentA={v.contentA}
                  contentB={v.contentB}
                  date={v.date}
                  likeCnt={v.likeCnt}
                  voteCntA={v.voteCntA}
                  voteCntB={v.voteCntB}
                  liked={v.liked}
                  voted={v.voted}
                  completed={v.completed}
                  user={v.user}
                />
              ))}
          </StyledSlider>
        </div>
      </Wrap>
    </>
  );
};

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  adaptiveHeight: true,
  focusOnSelect: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  speed: 500,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  centerPadding: "0px",

  responsive: [
    { breakpoint: 1920, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 1200, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
    z-index: 2;
  }
  .slick-slider {
    padding: 30px 0 30px 0;
    margin: auto;
    width: 100%;
    @media screen and (max-width: ${mobile}) {
      padding: 0px;
    }
  }
  .slick-list {
    width: 100%;
    @media screen and (max-width: ${mobile}) {
      transform: scale(0.8);
    }
  }
`;

const StyledSlider = styled(Slider)`
  margin: auto;
  .slick-prev,
  .slick-next {
    width: 12px;
    height: 28px;
  }
  @media screen and (max-width: ${mobile}) {
    .slick-prev,
    .slick-next {
      width: 10px;
      height: 20px;
      margin: 0px 40px;
    }
  }
`;

export default EiterSlick;
