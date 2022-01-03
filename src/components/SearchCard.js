import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AiOutlineLike, AiOutlineMessage } from "react-icons/ai";

import { history } from "../redux/configureStore";
import { SetParams } from "../redux/reducers/paramsSlice";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

const SearchCard = ({
  type,
  id,
  userId,
  title,
  date,
  completed,
  likeCnt,
  commentCnt,
  nickname,
}) => {
  const dispatch = useDispatch();

  const onClickContent = useCallback(() => {
    if (type === "찬반") {
      dispatch(SetParams(id));
      history.push({
        pathname: "/either",
      });
      return;
    }
    history.push(`/multi/${id}`);
  }, [id, type, dispatch]);

  const onClickNick = useCallback(() => {
    if (userId) {
      history.push(`/profile/${userId}`);
      window.scroll(0, 0);
    }
  }, [userId]);

  return (
    <Container>
      <Subjects onClick={onClickContent}>
        <Type type={type}>{type}</Type>
        <span className="subjectContent">{title}</span>
        <Completed completed={completed}>
          {completed ? "종료됨" : "진행중"}
        </Completed>
      </Subjects>
      <Contents>
        <div>
          {nickname && (
            <span className="searchCardNick" onClick={onClickNick}>
              {nickname}
            </span>
          )}
          <span className="dateContent">{date.substring(0, 16)}</span>
        </div>
        <IconWrapper>
          {type === "객관식" && <StyledFiMessage fill={blue} />}
          <span className="commentCnt">{type === "객관식" && commentCnt}</span>
          <StyledFiThumbsUp />
          <span style={{ color: red }}> {likeCnt}</span>
        </IconWrapper>
      </Contents>
    </Container>
  );
};

const IconWrapper = styled.div`
  position: relative;
  right: -85px;

  .commentCnt {
    color: ${blue};
    margin: 0 5px 0 0;
  }

  @media screen and (max-width: ${tablet}) {
    display: flex;
    justify-content: end;
    right: 0px;
    margin: 0;
  }

  @media screen and (max-width: 450px) {
    justify-content: start;
  }
`;

const StyledFiMessage = styled(AiOutlineMessage)`
  position: relative;
  margin-right: 2px;
  top: 1px;

  @media screen and (max-width: ${tablet}) {
    top: 2px;
  }
`;

const StyledFiThumbsUp = styled(AiOutlineLike)`
  color: ${red};
  position: relative;
  margin-right: 2px;

  @media screen and (max-width: ${tablet}) {
    top: 2px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 840px;
  width: 90%;
  height: 112px;
  border: 1px solid ${blue};
  border-radius: 5px;
  margin: 10px auto;
  background-color: white;
  box-sizing: border-box;
  user-select: none;

  @media screen and (max-width: ${tablet}) {
    height: auto;
    padding: 0 20px;
  }
`;

const Subjects = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  width: 95%;
  height: 39px;
  margin: 18px 20px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;

  div {
    display: flex;
    flex-direction: row;
  }

  .subjectContent {
    width: 619px;
    color: ${blue};
    font-weight: bold;

    @media screen and (max-width: ${tablet}) {
      width: 100%;
    }
  }

  @media screen and (max-width: ${tablet}) {
    flex-direction: column;
    height: auto;
    margin: 18px auto;
  }
`;

const Completed = styled.span`
  color: ${props => (props.completed ? gray5 : red)};
  font-weight: bold;

  @media screen and (max-width: ${tablet}) {
    position: absolute;
    right: 0px;
    font-size: 14px;
  }
`;

const Type = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 20px;
  padding: 0 5px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${props => (props.type === "찬반" ? "white" : blue)};
  color: ${props => (props.type === "찬반" ? blue : "white")};
  border: 1px solid ${blue};
  border-radius: 5px;
  box-sizing: border-box;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  width: 619px;
  margin: 0 auto 14px;
  justify-content: space-between;
  font-size: 14px;

  .searchCardNick {
    font-weight: bold;
    color: ${gray5};
    cursor: pointer;
    margin: 0 30px 0 0;

    @media screen and (max-width: ${mobile}) {
      margin: 0 10px 0 0;
    }
  }

  .dateContent {
    color: ${gray5};
    font-weight: normal;

    @media screen and (max-width: ${tablet}) {
      margin: 0;
    }
  }

  @media screen and (max-width: ${tablet}) {
    width: 95%;
  }

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;

export default SearchCard;
