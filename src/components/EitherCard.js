import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike, AiFillLike, AiOutlineUser } from "react-icons/ai";

import { mobile, tablet } from "../shared/style";
import Nickname from "./Nickname";
import { history } from "../redux/configureStore";
import {
  deletePostDB,
  likePostDB,
  votePostDB,
  completePostDB,
} from "../redux/actions/eitherCard";

const EitherCard = props => {
  const dispatch = useDispatch();
  const {
    eitherId,
    nickname,
    title,
    contentA,
    contentB,
    date,
    likeCnt,
    voteCntA,
    voteCntB,
    liked,
    voted,
    completed,
    user,
    goToNext,
  } = props;

  const [percent, setPercent] = useState("");
  const [likes, setLikes] = useState(likeCnt);
  const [choice, setChoice] = useState(voted);
  const [likeState, setLikeState] = useState(liked === null ? false : true);
  const [action, setAction] = useState(null);
  const [showGraph, setShowGraph] = useState(voted === null ? false : true);

  const {
    completePostDBDone,
    completePostDBError,
    deletePostDBDone,
    deletePostDBError,
  } = useSelector(state => state.eitherCard);

  useEffect(() => {
    if (action) {
      if (completePostDBDone) {
        alert("투표가 종료되었습니다.");
        window.location.replace("/either");
      }
      if (completePostDBError) {
        alert("투표 종료에 오류가 발생하였습니다.");
      }
      if (deletePostDBDone) {
        alert("투표가 삭제되었습니다.");
        window.location.replace("/either");
      }
      if (deletePostDBError) {
        alert("투표 삭제에 오류가 발생하였습니다.");
      }
      setAction(null);
    }
  }, [
    completePostDBDone,
    deletePostDBDone,
    completePostDBError,
    deletePostDBError,
  ]);

  //Props likeCnt 변화시 재렌더링
  useEffect(() => {
    setLikes(likeCnt);
  }, [likeCnt]);

  //Progress Bar 퍼센트 계산
  useEffect(() => {
    if (voteCntA === 0 && voteCntB === 0) {
      setPercent(50);
    } else if (voteCntA === 0) {
      setPercent(0);
    } else if (voteCntB === 0) {
      setPercent(100);
    } else {
      let calPercent = (voteCntA / (voteCntA + voteCntB)) * 100;
      setPercent(Math.round(calPercent));
    }
  }, [voteCntA, voteCntB]);

  //유저정보(닉네임)
  const userNickname = localStorage.getItem("nickname");

  //수정하기
  const onClickModify = () => {
    if (completed === 1 || voteCntA + voteCntB > 0) {
      alert("이미 투표가 진행되었거나 투표가 종료된 글은 수정할 수 없습니다.");
      return;
    } else {
      history.push(`/either/${eitherId}/edit`);
    }
  };
  //삭제하기
  const onClickDelete = () => {
    const deleteConfirm = window.confirm("투표를 삭제하시겠습니까?");
    if (deleteConfirm === true) {
      dispatch(deletePostDB(eitherId));
      setAction(true);
    } else if (deleteConfirm === false) {
      return;
    }
  };
  //좋아요
  const onClickLike = () => {
    if (liked !== null) {
      return;
    } else if (!userNickname) {
      alert("로그인 후 사용 가능합니다.");
      history.replace("/login");
    } else {
      dispatch(likePostDB(eitherId));
      setLikes(likeCnt + 1);
      setLikeState(true);
    }
  };
  //content 투표
  const onClickContent = e => {
    if (!userNickname) {
      alert("로그인 후 사용 가능합니다.");
      history.replace("/login");
    } else {
      dispatch(votePostDB({ eitherId, data: { vote: e } }));
      setChoice(e);
      if (window.innerWidth > 1200) {
        goToNext();
      }
    }
  };
  //투표 종료하기
  const onClickComplete = () => {
    const deleteConfirm = window.confirm("투표를 종료하시겠습니까?");
    if (completed === 1) {
      alert("이미 투표가 종료되었습니다.");
      return;
    } else if (deleteConfirm === true) {
      dispatch(completePostDB(eitherId));
      setAction(true);
    } else {
      return;
    }
  };
  //버튼A 상태 보여주기
  const SelctButtonA = (BGcolor, color, disabled, vote, content) => {
    return (
      <EitherButtonA
        style={{ backgroundColor: BGcolor, color: color }}
        disabled={disabled}
        onClick={() => {
          onClickContent(vote);
          setShowGraph(!userNickname ? false : true);
        }}
        className="buttonA"
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonA>
    );
  };
  //버튼B 상태 보여주기
  const SelctButtonB = (BGcolor, color, disabled, vote, content) => {
    return (
      <EitherButtonB
        style={{ backgroundColor: BGcolor, color: color }}
        disabled={disabled}
        onClick={() => {
          onClickContent(vote);
          setShowGraph(!userNickname ? false : true);
        }}
        className="buttonB"
      >
        <ButtonText>{content}</ButtonText>
      </EitherButtonB>
    );
  };
  return (
    <>
      <Container>
        <MenuButtonGrid>
          <div>
            {nickname === userNickname ? ( // 메뉴 버튼
              <div>
                <Menu
                  menuButton={
                    <MenuButton
                      styles={{
                        border: "none",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <FiMoreHorizontal size={20} data-testid="menuImage" />
                    </MenuButton>
                  }
                  menuStyles={{ border: "0px solid" }}
                  portal={true}
                >
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickModify}
                    data-testid="menuModify"
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickComplete}
                    data-testid="menuComplete"
                  >
                    투표 종료하기
                  </MenuItem>
                  <MenuItem
                    styles={{
                      fontSize: "14px",
                    }}
                    onClick={onClickDelete}
                    data-testid="menuDelete"
                  >
                    삭제하기
                  </MenuItem>
                </Menu>
              </div>
            ) : null}
          </div>
        </MenuButtonGrid>
        {/* 제목 */}
        <TitleDiv> {title} </TitleDiv>
        {/* 날짜 */}
        <DateDiv>{date.substring(0, 16)}</DateDiv>
        {/* 투표한 인원 수 */}
        <TotalCntGrid>
          <AiOutlineUser
            style={{
              width: "18",
              height: "18",
              color: "#00397c",
            }}
          />
          <TotalCntDiv>{voteCntA + voteCntB}</TotalCntDiv>
        </TotalCntGrid>
        {/* 투표 상태에 따른 버튼 형식 변경 */}
        {!userNickname ? (
          <ButtonGrid>
            {SelctButtonA(null, "#101214", false, null, contentA)}
            {SelctButtonB(null, "#101214", false, null, contentB)}
          </ButtonGrid>
        ) : userNickname && choice === "A" ? (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA("#00397c", "#FFFFFF", true, null, contentA)
              : SelctButtonA("#00397c", "#FFFFFF", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
          </ButtonGrid>
        ) : userNickname && choice === "B" ? (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB("#E25B45", "#101214", true, null, contentB)
              : SelctButtonB("#E25B45", "#101214", false, "B", contentB)}
          </ButtonGrid>
        ) : (
          <ButtonGrid>
            {completed === 1
              ? SelctButtonA(null, "#101214", true, null, contentA)
              : SelctButtonA(null, "#101214", false, "A", contentA)}
            {completed === 1
              ? SelctButtonB(null, "#101214", true, null, contentB)
              : SelctButtonB(null, "#101214", false, "B", contentB)}
          </ButtonGrid>
        )}
        {/* 투표율 그래프 */}
        {showGraph ? (
          <ProgressGrid>
            <EitherProgress>
              <ProgressLabel>
                <div className="LabelLeft">{percent + "%"}</div>
                <div className="LabelRight">{100 - percent + "%"}</div>
              </ProgressLabel>
              <HightLight width={percent + "%"} />
            </EitherProgress>
          </ProgressGrid>
        ) : null}
        <EitherFooter>
          <div className="Position">
            <div>
              {/* 프로필 */}
              <Nickname
                nickname={nickname}
                userId={user}
                width={"32px"}
                height={"32px"}
                fontSize={"14px"}
              />
            </div>
            <div className="Grid">
              {!likeState ? ( //좋아요 이미지
                <AiOutlineLike
                  onClick={onClickLike}
                  style={{
                    width: "24",
                    height: "24",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <AiFillLike
                  style={{
                    width: "24",
                    height: "24",
                    cursor: "pointer",
                  }}
                />
              )}
              <div className="Likes">{likes}</div>
            </div>
          </div>
        </EitherFooter>
      </Container>
    </>
  );
};

const Container = styled.div`
  text-align: center;
  width: 380px;
  height: 490px;
  box-sizing: border-box;
  margin: 70px auto;
  border: 2px solid #00397c;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 46px 32px;
  position: relative;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 90%;
  }
`;
const MenuButtonGrid = styled.div`
  .div {
    position: relative;
  }
  position: absolute;
  top: 15px;
  right: 20px;
`;
const TitleDiv = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: auto;
  word-break: break-all;
`;
const DateDiv = styled.div`
  margin: 8px auto;
  font-size: 11px;
  color: #868e96;
`;
const TotalCntGrid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
const TotalCntDiv = styled.div`
  font-size: 12px;
  color: #868e96;
  margin-left: 8px;
  align-items: center;
`;
const ButtonGrid = styled.div`
  width: 312px;
  height: 160px;
  box-sizing: border-box;
  margin: 24px auto 0px auto;
  justify-content: center;
  @media screen and (max-width: ${mobile}) {
    width: 100%;
  }
`;
const EitherButtonA = styled.button`
  width: 157px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-size: 16px;
  font-family: "Noto-Sans KR", sans-serif;
  cursor: pointer;
  margin-right: -1px;
  &:hover {
    background-color: #dfdfdf;
  }
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
`;
const EitherButtonB = styled.button`
  width: 157px;
  height: 160px;
  border: 2px solid #00397c;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 16px;
  font-family: "Noto-Sans KR", sans-serif;
  cursor: pointer;
  margin-left: -1px;
  &:hover {
    background-color: #dfdfdf;
  }
  @media screen and (max-width: ${mobile}) {
    width: 50%;
  }
`;
const ProgressGrid = styled.div`
  width: 100%;
  margin: auto;
`;
const EitherProgress = styled.div`
  margin: 24px auto 0px auto;
  border-radius: 6px;
  width: 100%;
  height: 6px;
  z-index: 0;
  background-color: #e25b45;
`;
const HightLight = styled.div`
  background-color: #00397c;
  transition: 1s;
  width: ${props => props.width};
  height: 6px;
  margin-bottom: 1px;
  border-radius: ${props =>
    props.width === "100%" ? "5px 5px 5px 5px" : "5px 0px 0px 5px"};
`;
const ProgressLabel = styled.div`
  width: 316px;
  position: absolute;
  color: #00397c;
  margin-top: 6px;
  font-size: 12px;
  display: inline-flex;
  justify-content: space-between;
  transform: translateX(-50%);
  .LabelLeft {
    margin: 8px 0px 0px 10px;
  }
  .LabelRight {
    margin: 8px 10px 0px 0px;
  }
  @media screen and (max-width: ${mobile}) {
    width: 100%;
    .LabelLeft {
      margin: 8px 0px 0px 40px;
    }
    .LabelRight {
      margin: 8px 40px 0px 0px;
    }
  }
`;
const EitherFooter = styled.div`
  width: 100%;
  margin: auto;
  align-items: center;

  .Position {
    width: 82%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 430px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .Grid {
    color: #e25b45;
    display: flex;
    align-items: center;
  }
  .Likes {
    font-size: 14px;
    margin-left: 14px;
  }
`;
const ButtonText = styled.div`
  word-break: break-all;
  display: inline-block;
  vertical-align: middle;
  font-size: 13px;
  font-weight: bold;
  padding: 5px 3px;
`;
export default EitherCard;
