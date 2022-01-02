import React, { useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MultiCard from "../components/MultiCard";
import { mobile } from "../shared/style";
import { ReactComponent as PrevArrow } from "../images/arrowLRed.svg";
import { ReactComponent as NextArrow } from "../images/arrowRed.svg";

const MultiSlick = props => {
  const CardList = props.cardList;
  const { PostDBDone } = useSelector(state => state.multiCard);
  const checkRef = useRef();

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    lazyLoad: "progress",
    adaptiveHeight: true,
    focusOnSelect: true,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    // initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // initialSlide: 0,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
    ],
  };

  return (
    <Container>
      <SliderWarpper>
        {PostDBDone === true && (
          <StyledSlider {...settings} ref={checkRef}>
            {CardList?.map((p, i) => (
              <CardWarpper>
                <MultiCard
                  multiId={p.multiId}
                  title={p.title}
                  description={p.description}
                  user={p.user}
                  date={p.date}
                  editedDate={p.editedDate}
                  completed={p.completed}
                  likeCnt={p.likeCnt}
                  commentCnt={p.commentCnt}
                  nickname={p.nickname}
                  liked={p.liked}
                />
              </CardWarpper>
            ))}
          </StyledSlider>
        )}
      </SliderWarpper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .slick-slide.slick-center {
    transform: scale(1.1);
    transition: 0.5s;
    z-index: 2;

    .slick-list {
      width: 100%;
    }
  }
  .slick-slider {
    padding: 30px 0;
    margin: -40px auto -20px auto;
    width: 100%;
    @media screen and (min-width: ${mobile}) and (max-width: 1300px) {
      margin: -50px auto -20px auto;
      width: 55%;
    }
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

const SliderWarpper = styled.div`
  /* height: 100%; */
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
      margin: 0px 40px;
    }
  }
  /* max-width: 1300px; */
`;

const CardWarpper = styled.div`
  /* height: 100%; */
`;

export default MultiSlick;
