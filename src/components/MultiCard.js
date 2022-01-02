import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { AiOutlineLike, AiFillLike, AiOutlineMessage } from "react-icons/ai";

import colors from "../shared/colors";
import Nickname from "./Nickname";
import { DetailDB } from "../redux/actions/multiDetail";
import { mobile } from "../shared/style";
import { AddLikeDB } from "../redux/actions/multiLike";

const MultiCard = props => {
  const history = useHistory();
  const userNickname = localStorage.getItem("nickname");
  // const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  // const dataList = multiDetail.multi && multiDetail;

  const dispatch = useDispatch();
  const {
    multiId,
    title,
    description,
    user,
    nickname,
    date,
    editedDate,
    completed,
    likeCnt,
    liked,
    commentCnt,
  } = props;
  const [likes, setLikes] = useState(likeCnt);
  const [likeState, setLikeState] = useState(liked === null ? false : true);

  //상세보기 페이지로 이동
  const goToDetail = () => {
    dispatch(DetailDB(multiId));
    history.push(`/multi/${multiId}`);
  };

  //상세보기 페이지 내 댓글로 이동
  const goToComment = () => {
    dispatch(DetailDB(multiId));
    history.push({
      pathname: `/multi/${multiId}`,
      state: { onComment: "onComment" },
    });
  };

  //좋아요 기능
  const addLike = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && liked === null) {
      dispatch(AddLikeDB(multiId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    } else {
      return;
    }
  };

  return (
    <>
      {completed !== 1 ? (
        <Container>
          <Card>
            <TitleWrapper>
              <TitleText onClick={goToDetail}>{title}</TitleText>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            {/* <ContentHr /> */}
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>
            <VoteBtnWarpper>
              <VoteBtn className="Detail" onClick={goToDetail}>
                상세보기
              </VoteBtn>
            </VoteBtnWarpper>
            <TempWarpper>
              <FooterWrapper>
                <UserWrapper>
                  <NickText>
                    <Nickname
                      userId={user}
                      nickname={nickname}
                      fontSize={"14px"}
                      width={"32px"}
                      height={"32px"}
                    ></Nickname>
                  </NickText>
                  {/* {isEdited ? <p>{editedDate}</p> : null} */}
                </UserWrapper>
                <InfoWarpper>
                  <CommentWarpper onClick={goToComment}>
                    <AiOutlineMessage size={24} />{" "}
                    <TotalComment>{commentCnt}</TotalComment>
                  </CommentWarpper>
                  <LikeWarpper>
                    {!likeState ? (
                      <LikeBtn>
                        <AiOutlineLike size={24} onClick={addLike} />
                      </LikeBtn>
                    ) : (
                      <LikeBtn>
                        <AiFillLike size={24} />
                      </LikeBtn>
                    )}
                    <TotalLike>{likes}</TotalLike>
                  </LikeWarpper>
                </InfoWarpper>
              </FooterWrapper>
            </TempWarpper>
          </Card>
        </Container>
      ) : (
        <ContainerB>
          <Card>
            <TitleWrapper>
              <TitleText>{title}</TitleText>
            </TitleWrapper>
            <DateWarpper>
              <DateText>{date.substring(0, 16)}</DateText>
            </DateWarpper>
            {/* <ContentHr /> */}
            <DesWrapper>
              <DesText>{description}</DesText>
            </DesWrapper>
            <VoteBtnWarpper>
              <VoteBtnB onClick={goToDetail}>다시보기</VoteBtnB>
            </VoteBtnWarpper>
            <TempWarpper>
              <FooterWrapper>
                <UserWrapper>
                  <NickText>
                    <Nickname
                      userId={user}
                      nickname={nickname}
                      fontSize={"14px"}
                      width={"32px"}
                      height={"32px"}
                    ></Nickname>
                  </NickText>
                  {/* {isEdited ? <p>{editedDate}</p> : null} */}
                </UserWrapper>
                <InfoWarpper>
                  <CommentWarpper onClick={goToComment}>
                    <AiOutlineMessage size={24} />{" "}
                    <TotalComment>{commentCnt}</TotalComment>
                  </CommentWarpper>
                  <LikeWarpper>
                    {!likeState ? (
                      <LikeBtn>
                        <AiOutlineLike size={24} onClick={addLike} />
                      </LikeBtn>
                    ) : (
                      <LikeBtn>
                        <AiFillLike size={24} />
                      </LikeBtn>
                    )}
                    <TotalLike>{likes}</TotalLike>
                  </LikeWarpper>
                </InfoWarpper>
              </FooterWrapper>
            </TempWarpper>
          </Card>
        </ContainerB>
      )}
    </>
  );
};

const Container = styled.div`
  text-align: left;
  width: 380px;
  height: 490px;
  padding: 46px 32px;
  margin: 70px auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  /* word-break: break-all; */
  /* display: flex;
  flex-direction: column; */
  position: relative;
  background-color: ${colors.white};
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 90%;
  }
`;

const ContainerB = styled.div`
  text-align: left;
  width: 380px;
  height: 490px;
  padding: 46px 32px;
  margin: 70px auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  /* word-break: break-all; */
  /* display: flex;
  flex-direction: column; */
  background: linear-gradient(
    180deg,
    rgba(134, 142, 150, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 90%;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
  cursor: pointer;
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
  color: ${colors.darkGray};
`;

const VoteBtnWarpper = styled.div`
  width: 100%;
  position: absolute;
  margin: auto;
  bottom: 60px;
`;

const VoteBtn = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  margin: 60px auto 0 auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.red};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
  cursor: pointer;

  &:hover {
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px ${colors.red} solid;
  }
`;

const VoteBtnB = styled.button`
  display: block;
  width: 150px;
  height: 40px;
  margin: 60px auto 0 auto;
  border: none;
  border-radius: 8px;
  background-color: ${colors.gray5};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
  cursor: pointer;
  &:hover {
    background-color: ${colors.white};
    color: ${colors.gray5};
    border: 1px ${colors.gray5} solid;
  }
`;

const TempWarpper = styled.div``;

const FooterWrapper = styled.div`
  position: absolute;
  bottom: -4px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
`;

const UserWrapper = styled.div`
  font-size: 6px;
  display: flex;
  flex-direction: row;
`;

const NickText = styled.p`
  font-size: 14px;
  color: ${colors.gray5};
  cursor: pointer;
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWarpper = styled.div`
  /* width: 30px; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.blue};
  cursor: pointer;
`;

const TotalComment = styled.p`
  margin: 0 auto 0 14px;
  font-size: 14px;
`;

const LikeWarpper = styled.div`
  /* width: 40px; */
  margin: auto auto auto 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.red};
  /* cursor: pointer; */
`;

const LikeBtn = styled.div`
  cursor: pointer;
`;

const TotalLike = styled.p`
  margin: 0 auto 0 14px;
  font-size: 14px;
`;

export default MultiCard;
