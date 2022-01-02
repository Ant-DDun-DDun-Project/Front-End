import React, { useCallback } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowRight } from "react-icons/fi";

import { history } from "../redux/configureStore";
import MainCard from "../components/MainCard";

import { ReactComponent as PrevArrow } from "../images/arrowLRed.svg";
import { ReactComponent as NextArrow } from "../images/arrowRed.svg";
import { blue, red, mobile, tablet } from "../shared/style";

const ProductSlick = ({ cardList, type }) => {
  const settings = {
    dots: true,
    speed: 500,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    lazyLoad: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    centerPadding: "150px",
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          initialSlide: 1,
        },
      },
    ],
  };

  const onClickShowAll = useCallback(() => {
    window.scroll(0, 0);
    if (type === "either") {
      history.push("/either");
      return;
    }
    history.push("/multi");
  }, [type]);

  return (
    <>
      <Wrap>
        <Title>
          <div className="rank">
            {type === "either" ? "찬반 인기글" : "객관식 인기글"}
            <div className="hot">HOT</div>
          </div>
          <div className="showAll" onClick={onClickShowAll}>
            전체보기
            <FiArrowRight />
          </div>
        </Title>
        <div data-testid="slickSlider">
          <StyledSlider {...settings}>
            {cardList?.map((v, i) => (
              <MainCard
                id={v.eitherId || v.multiId}
                key={i}
                title={v.title}
                content={v.description}
                type={type}
                commentNum={v.commentCnt}
                likeNum={v.likeCnt}
                username={v.nickname}
                userId={v.user}
                date={v.date}
              />
            ))}
          </StyledSlider>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 103%;
  height: 336px;
  margin: 0;

  @media screen and (max-width: ${mobile}) {
    width: 95%;
  }

  ul.slick-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: -50px;
  }

  li button:before {
    position: relative;
    top: 2px;
    background-color: white;
    border: 0.2em solid ${red};
    border-radius: 50%;
    display: inline-block;
    opacity: 1;
    color: transparent;
    margin: 0;
    box-sizing: border-box;
  }

  li button::before {
    width: 6.5px;
    height: 6.5px;
    box-sizing: content-box;
  }

  li.slick-active {
    top: -6px;
    right: -1.5px;
    margin: 0 5px;
    button::before {
      position: relative;
      top: 2.3px;
      right: 2px;
      box-sizing: border-box;
      margin: 0;
    }
  }

  li.slick-active button:before {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 1;
    color: ${red};
    margin: 0;
  }

  ul li {
    width: 6px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 16px 20px;

  .rank {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
    color: ${blue};

    @media screen and (max-width: ${mobile}) {
      font-size: 22px;
    }
  }

  .hot {
    font-size: 14px;
    font-weight: 700;
    margin: 0 10px;
    padding: 1px 10px;
    color: ${red};
    border: 1px solid ${red};
    border-radius: 7px;
    box-sizing: border-box;
  }

  .showAll {
    display: flex;
    position: relative;
    top: 5px;
    height: 25px;
    align-items: center;
    font-size: 14px;
    color: ${red};
    border-bottom: 1px solid ${red};
    cursor: pointer;
    user-select: none;
  }

  @media screen and (max-width: ${mobile}) {
    flex-direction: row;
    margin: 0 0 20px;

    .showAll {
      width: 70px;
    }
  }
`;

const StyledSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    width: 12px;
    height: 28px;
  }

  .slick-disabled {
    display: none !important;
  }
`;

export default ProductSlick;
