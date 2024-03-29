import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { ReactComponent as CommonIcon } from "../images/CommonIcon.svg";
import { gray5, blue, red, mobile, tablet } from "../shared/style";
import { useCallback } from "react";

const Nickname = ({ nickname, userId, width, height, fontSize, color }) => {
  const onClickNick = useCallback(() => {
    history.push(`/profile/${userId}`);
    window.scroll(0, 0);
  }, [userId]);

  return (
    <Container onClick={onClickNick}>
      <StyledCommonIcon width={width} height={height} />
      <Nick fontSize={fontSize} color={color}>
        {nickname}
      </Nick>
    </Container>
  );
};

Nickname.defaultProps = {
  width: "16px",
  height: "16px",
  fontSize: "12px",
  color: gray5,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  /* width: 110px; */
  height: 16px;
  cursor: pointer;
`;

const StyledCommonIcon = styled(CommonIcon)`
  width: ${props => props.width};
  height: ${props => props.height};
  margin-right: 5px;
`;

const Nick = styled.span`
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  width: 100%;
`;

export default Nickname;
