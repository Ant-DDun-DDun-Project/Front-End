import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";

import colors from "../shared/colors";
import AnswerList from "./AnswerList";
import { AddLikeDB } from "../redux/actions/multiLike";
import Nickname from "./Nickname";
import { history } from "../redux/configureStore";

const MultiUnvoted = props => {
  const dispatch = useDispatch();
  const userNickname = localStorage.getItem("nickname");
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiList = dataList.multi;
  const multiId = props.multiId;
  const [likes, setLikes] = useState(multiList.likeCnt);
  const [likeState, setLikeState] = useState(
    multiList.liked === null ? false : true,
  );
  const TotalCnt =
    multiList.voteCntA +
    multiList.voteCntB +
    multiList.voteCntC +
    multiList.voteCntD +
    multiList.voteCntE;

  //좋아요 기능 뷰에서 +1은 state로 변경
  const addLike = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && multiList.liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(multiList.likeCnt + 1);
      setLikeState(true);
    } else {
      return;
    }
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>{multiList.title}</Title>
      </TitleWrapper>
      <Date>{multiList.date.substring(0, 16)}</Date>
      <TotalCntWarpper>
        <AiOutlineUser className="icon" />
        <p>{TotalCnt}</p>
      </TotalCntWarpper>
      {/* <TitleHr /> */}
      <div>
        <AnswerList dataList={multiList} />
      </div>
      <DesWrapper>
        <Description>{multiList.description}</Description>
      </DesWrapper>
      <InfoWarpper>
        <Nickname
          userId={multiList.user}
          nickname={multiList.nickname}
          fontSize={"14px"}
          width={"32px"}
          height={"32px"}
        ></Nickname>
        <RightWarpper>
          <CommentWarpper>
            <AiOutlineMessage />{" "}
            <TotalComment>
              {dataList.comment.length + dataList.childComment.length}
            </TotalComment>
          </CommentWarpper>
          <LikeWarpper>
            {!likeState ? (
              <LikeBtn onClick={addLike}>
                <AiOutlineLike />
              </LikeBtn>
            ) : (
              <LikedBtn>
                <AiFillLike />
              </LikedBtn>
            )}
            <TotalLike>{likes}</TotalLike>
          </LikeWarpper>
        </RightWarpper>
      </InfoWarpper>
      <CommentHr />
    </Container>
  );
};

const Container = styled.div`
  max-width: 620px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  max-width: 612px;
  margin: auto;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`;

const Title = styled.p`
  font-size: 24px;
  word-break: break-all;
`;

const Date = styled.p`
  margin: auto;
  color: ${colors.gray5};
  font-size: 14px;
`;

const TotalCntWarpper = styled.div`
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  color: ${colors.gray5};
  display: flex;
  flex-direction: row;
  align-items: center;
  .icon {
    padding-bottom: 2px;
    margin-right: 6px;
  }
`;

const TitleHr = styled.hr`
  margin: 34px auto 34px auto;
  width: 103px;
  height: 1px;
  border: none;
  background-color: ${colors.gray5};
`;

const DesWrapper = styled.div`
  margin: 20px auto 20px 0;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.darkGray};
  white-space: pre-wrap;
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

// const Nickname = styled.p`
//   font-size: 14px;
//   color: ${colors.darkGray};
// `;

const RightWarpper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CommentWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
  padding-bottom: 2px;
`;

const TotalComment = styled.p`
  font-size: 12px;
  margin-left: 10px;
  padding-top: 2px;
`;

const LikeWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${colors.red};
`;

const LikeBtn = styled.div`
  font-size: 16px;
  color: ${colors.red};
  padding-top: 1px;
  cursor: pointer;
`;

const LikedBtn = styled.div`
  font-size: 16px;
  color: ${colors.red};
  padding-top: 1px;
`;

const TotalLike = styled.p`
  font-size: 12px;
  margin-left: 10px;
`;

const CommentHr = styled.hr`
  border: none;
  min-width: 100%;
  max-width: 620px;
  height: 1px;
  background-color: ${colors.lineGray};
`;

export default MultiUnvoted;
