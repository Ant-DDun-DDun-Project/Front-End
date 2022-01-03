import React from "react";
import styled from "styled-components";

import sadIcon from "../images/sadAntIcon.png";

import { blue, red, mobile, tablet, grayMultiply } from "../shared/style";

const LoadingBubble = ({ position, height, left }) => (
  <StyledLoading position={position} height={height}>
    <div className="lds-ellipsis">
      <img className="fit-picture" src={sadIcon} alt="icon" />
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </StyledLoading>
);

LoadingBubble.defaultProps = {
  position: "relative",
  height: "100vh",
};

const StyledLoading = styled.div`
  position: ${props => props.position};
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90vh;
  padding: 50px;
  border-radius: 20px;
  background-color: ${grayMultiply};
  z-index: 9999;
  margin: 0 auto;
  left: -30px;

  @media screen and (max-width: ${mobile}) {
    top: -50px;
    left: -40px;
  }

  img {
    position: relative;
    right: 60px;
    top: -130px;
  }

  .lds-ellipsis {
    display: inline-block;
    position: relative;
    top: 200px;
    width: 80px;
    height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: black;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

export default LoadingBubble;
