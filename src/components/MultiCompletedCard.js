import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FiThumbsUp, FiMessageSquare } from "react-icons/fi";

import colors from "../shared/colors";
import { DetailDB } from "../redux/actions/multiDetail";
import Nickname from "./Nickname";

const MultiCard = props => {
  const userNickname = localStorage.getItem("nickname");
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    multiId,
    title,
    description,
    nickname,
    date,
    editedDate,
    completed,
    likeCnt,
    commentCnt,
  } = props;

  //상세보기 페이지로 이동
  const goToDetail = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else {
      dispatch(DetailDB(multiId));
      history.push(`/multi/${multiId}`);
    }
  };

  return (
    <Container>
      <Card>
        <TitleWrapper>
          <TitleText>{title}</TitleText>
        </TitleWrapper>
        <DateWarpper>
          <DateText>{date}</DateText>
        </DateWarpper>
        {/* <ContentHr /> */}
        <DesWrapper>
          <DesText>{description}</DesText>
        </DesWrapper>
        <VoteBtn onClick={goToDetail}>투표하기</VoteBtn>
        <TempWarpper>
          <FooterWrapper>
            <UserWrapper>
              <NickText>
                <Nickname
                  nickname={nickname}
                  fontSize={"14px"}
                  width={"32px"}
                  height={"32px"}
                ></Nickname>
              </NickText>
              {/* {isEdited ? <p>{editedDate}</p> : null} */}
            </UserWrapper>
            <InfoWarpper>
              <CommentWarpper>
                <FiMessageSquare /> <TotalComment>{commentCnt}</TotalComment>
              </CommentWarpper>
              <LikeWarpper>
                <FiThumbsUp />
                <TotalLike>{likeCnt}</TotalLike>
              </LikeWarpper>
            </InfoWarpper>
          </FooterWrapper>
        </TempWarpper>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  text-align: left;
  width: 380px;
  height: 490px;
  padding: 46px 56px;
  margin: 0 auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.2) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const Card = styled.div`
  width: 100%;
  height: 600px;

  margin: auto;
  word-break: break-all;
`;

const TitleWrapper = styled.div`
  width: 100%;
  /* height: 30px; */
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin: auto;
`;

const TitleText = styled.p`
  font-size: 20px;
  margin: 0 auto;
`;

const DateWarpper = styled.div`
  margin: auto;
`;

const DateText = styled.p`
  font-size: 11px;
  text-align: center;
  margin: 8px auto;
  color: ${colors.gray5};
`;

const ContentHr = styled.hr`
  border: none;
  width: 103px;
  height: 1px;
  margin: 12px auto 11px auto;
  background-color: ${colors.gray5};
`;

const DesWrapper = styled.div`
  margin: 16px auto 0 auto;
  height: 176px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 9;
  -webkit-box-orient: vertical;
`;

const DesText = styled.p`
  font-size: 14px;
  color: ${colors.gray5};
`;

const VoteBtn = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  margin: 40px auto 0 auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.red};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
`;

const TempWarpper = styled.div``;

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 12px auto 0 auto;
`;

const UserWrapper = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
`;

const NickText = styled.p`
  font-size: 14px;
  color: ${colors.darkGray};
`;

const InfoWarpper = styled.div`
  width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
`;

const TotalComment = styled.p`
  font-size: 12px;
`;

const LikeWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.red};
`;

const TotalLike = styled.p`
  font-size: 12px;
`;

export default MultiCard;
