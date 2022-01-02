import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";

import colors from "../shared/colors";
import { useDispatch, useSelector } from "react-redux";
import { AddLikeDB } from "../redux/actions/multiLike";
import Nickname from "./Nickname";

const MultiVoted = props => {
  const dispatch = useDispatch();
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

  const PerA = (multiList.voteCntA / TotalCnt) * 100;
  const PerB = (multiList.voteCntB / TotalCnt) * 100;
  const PerC = (multiList.voteCntC / TotalCnt) * 100;
  const PerD = (multiList.voteCntD / TotalCnt) * 100;
  const PerE = (multiList.voteCntE / TotalCnt) * 100;

  //투표 항목별 %당 프로그레스바 길이 구현
  const [perA, setPerA] = useState(0);
  setTimeout(() => {
    if (isNaN(PerA)) {
      setPerA("0");
    } else {
      setPerA(PerA.toFixed(0));
    }
  }, 10);

  const [perB, setPerB] = useState(0);
  setTimeout(() => {
    if (isNaN(PerB)) {
      setPerB("0");
    } else {
      setPerB(PerB.toFixed(0));
    }
  }, 20);

  const [perC, setPerC] = useState(0);
  setTimeout(() => {
    if (isNaN(PerC)) {
      setPerC("0");
    } else {
      setPerC(PerC.toFixed(0));
    }
  }, 30);

  const [perD, setPerD] = useState(0);
  setTimeout(() => {
    if (isNaN(PerD)) {
      setPerD("0");
    } else {
      setPerD(PerD.toFixed(0));
    }
  }, 40);

  const [perE, setPerE] = useState(0);
  setTimeout(() => {
    if (isNaN(PerE)) {
      setPerE("0");
    } else {
      setPerE(PerE.toFixed(0));
    }
  }, 50);

  //좋아요 기능 뷰에서 +1은 state로 변경
  const addLike = () => {
    if (multiList.liked === null) {
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
      <ProgressWrapper>
        <div>
          <div>
            <SelectContent>
              {multiList.contentA} {perA + "%"}
            </SelectContent>
            <Progress>
              {multiList.voted === "A" ? (
                <div>
                  <VotedLabel>{perA + "%"}</VotedLabel>
                  <VotedHighLight width={perA + "%"} />
                </div>
              ) : (
                <div>
                  <UnVotedLabel>{perA + "%"}</UnVotedLabel>
                  <HighLight width={perA + "%"} />
                </div>
              )}
            </Progress>
          </div>
          <div>
            <SelectContent>
              {multiList.contentB} {perB + "%"}
            </SelectContent>
            <Progress>
              {multiList.voted === "B" ? (
                <div>
                  <VotedLabel>{perB + "%"}</VotedLabel>
                  <VotedHighLight width={perB + "%"} />
                </div>
              ) : (
                <div>
                  <UnVotedLabel>{perB + "%"}</UnVotedLabel>
                  <HighLight width={perB + "%"} />
                </div>
              )}
            </Progress>
          </div>

          {multiList.contentC !== null ? (
            <div>
              <SelectContent>
                {multiList.contentC} {perC + "%"}
              </SelectContent>
              <Progress>
                {multiList.voted === "C" ? (
                  <div>
                    <VotedLabel>{perC + "%"}</VotedLabel>
                    <VotedHighLight width={perC + "%"} />
                  </div>
                ) : (
                  <div>
                    <UnVotedLabel>{perC + "%"}</UnVotedLabel>
                    <HighLight width={perC + "%"} />
                  </div>
                )}
              </Progress>
            </div>
          ) : null}
          {multiList.contentD !== null ? (
            <div>
              <SelectContent>
                {multiList.contentD} {perD + "%"}
              </SelectContent>
              <Progress>
                {multiList.voted === "D" ? (
                  <div>
                    <VotedLabel>{perD + "%"}</VotedLabel>
                    <VotedHighLight width={perD + "%"} />
                  </div>
                ) : (
                  <div>
                    <UnVotedLabel>{perD + "%"}</UnVotedLabel>
                    <HighLight width={perD + "%"} />
                  </div>
                )}
              </Progress>
            </div>
          ) : null}
          {multiList.contentE !== null ? (
            <div>
              <SelectContent>
                {multiList.contentE} {perE + "%"}
              </SelectContent>
              <Progress>
                {multiList.voted === "E" ? (
                  <div>
                    <VotedLabel>{perE + "%"}</VotedLabel>
                    <VotedHighLight width={perE + "%"} />
                  </div>
                ) : (
                  <div>
                    <UnVotedLabel>{perE + "%"}</UnVotedLabel>
                    <HighLight width={perE + "%"} />
                  </div>
                )}
              </Progress>
            </div>
          ) : null}
        </div>
      </ProgressWrapper>
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

const ProgressWrapper = styled.div`
  max-width: 620px;
`;

const SelectContent = styled.p`
  font-size: 16px;
  color: ${colors.blue};
  margin: 16px auto 0 auto;
  word-break: break-all;
`;

const Progress = styled.div`
  margin: 9px 0 0 0;
  border: 1px ${colors.blue} solid;
  border-radius: 8px;
  min-width: 100%;
  max-width: 620px;
  height: 32px;
  position: relative;
`;

const HighLight = styled.div`
  margin: 0 0 0 0;
  background-color: #dfdfdf;
  transition: 1s;
  max-width: ${props => props.width};
  height: 32px;
  border-radius: 8px;
`;

const VotedHighLight = styled.div`
  margin: 0 0 0 0;
  background-color: ${colors.blue};
  transition: 1s;
  width: ${props => props.width};
  height: 32px;
  border-radius: 6px;
`;

const UnVotedLabel = styled.div`
  margin: 8px 0px 0px 10px;
  position: absolute;
  color: ${colors.darkGray};
  font-size: 12px;
  display: flex;
`;

const VotedLabel = styled.div`
  margin: 8px 0px 0px 10px;
  position: absolute;
  color: ${colors.white};
  font-size: 12px;
  display: flex;
`;

const DesWrapper = styled.div`
  margin: 20px auto 20px 0;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${colors.darkGray};
  word-break: break-all;
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

export default MultiVoted;
