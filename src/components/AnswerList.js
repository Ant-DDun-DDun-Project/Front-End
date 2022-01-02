import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import colors from "../shared/colors";
import { DetailVote } from "../redux/actions/multiDetail";
import { history } from "../redux/configureStore";

const AnswerList = props => {
  const dispatch = useDispatch();
  const DataList = props.dataList;
  const multiId = DataList.multiId;
  const userNickname = localStorage.getItem("nickname");
  const { DetailVoteDone } = useSelector(state => state.multiDetail);
  const render = props.render;
  const [color, setColor] = useState("");
  const [select, setSelect] = useState("");

  //투표 완료 통신 확인 후 페이지 리로드
  useEffect(() => {
    if (DetailVoteDone === true) {
      window.location.reload(`/multi/${multiId}`);
    }
    return;
  }, [DetailVoteDone, multiId]);

  //투표 항목 선택하기
  const selectAnswer = e => {
    setSelect(e.target.id);
  };

  //투표 항목 선택 후 완료하기
  const selectComplete = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && select !== "") {
      dispatch(DetailVote({ multiId, select: { select } }));
      // history.replace(`/multi/${multiId}`);
    } else {
      window.alert("선택한 투표항목이 없습니다");
      return;
    }
  };

  return (
    <Container>
      {select === "A" ? (
        <AnswerBtnOn id="A" onClick={selectAnswer}>
          {DataList.contentA}
        </AnswerBtnOn>
      ) : (
        <AnswerBtn id="A" onClick={selectAnswer}>
          {DataList.contentA}
        </AnswerBtn>
      )}

      {select === "B" ? (
        <AnswerBtnOn id="B" onClick={selectAnswer}>
          {DataList.contentB}
        </AnswerBtnOn>
      ) : (
        <AnswerBtn id="B" onClick={selectAnswer}>
          {DataList.contentB}
        </AnswerBtn>
      )}

      {DataList.contentC !== null ? (
        select === "C" ? (
          <AnswerBtnOn id="C" onClick={selectAnswer}>
            {DataList.contentC}
          </AnswerBtnOn>
        ) : (
          <AnswerBtn id="C" onClick={selectAnswer}>
            {DataList.contentC}
          </AnswerBtn>
        )
      ) : null}

      {DataList.contentD !== null ? (
        select === "D" ? (
          <AnswerBtnOn id="D" onClick={selectAnswer}>
            {DataList.contentD}
          </AnswerBtnOn>
        ) : (
          <AnswerBtn id="D" onClick={selectAnswer}>
            {DataList.contentD}
          </AnswerBtn>
        )
      ) : null}

      {DataList.contentE !== null ? (
        select === "E" ? (
          <AnswerBtnOn id="E" onClick={selectAnswer}>
            {DataList.contentE}
          </AnswerBtnOn>
        ) : (
          <AnswerBtn id="E" onClick={selectAnswer}>
            {DataList.contentE}
          </AnswerBtn>
        )
      ) : null}

      <CompleteWrapper>
        <CompleteBtn data-testid="test" onClick={selectComplete}>
          완료하고 결과보기
        </CompleteBtn>
      </CompleteWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
  /* border: 1px solid #000000; */
  display: flex;
  flex-direction: column;
`;

const AnswerBtn = styled.button`
  border: 1px ${colors.blue} solid;
  padding: 0 auto 0 24px;
  margin: 5px auto;
  min-width: 100%;
  max-width: 620px;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  text-align: left;
  text-indent: 18px;
  word-break: break-all;
  border-radius: 8px;
  color: ${colors.blue};
  background-color: ${colors.white};
  cursor: pointer;
  &.on {
    opacity: 1;
    background-color: ${colors.blue};
    color: ${colors.white};
  }
  &:hover {
    opacity: 1;
  }
`;

const AnswerBtnOn = styled.button`
  border: 1px ${colors.blue} solid;
  margin: 5px auto;
  min-width: 100%;
  max-width: 620px;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  text-align: left;
  text-indent: 18px;
  word-break: break-all;
  border-radius: 8px;
  color: #ffffff;
  background-color: #00397c;
  cursor: pointer;
  &.on {
    opacity: 1;
    background-color: #00397c;
    color: #ffffff;
  }
  &:hover {
    opacity: 1;
  }
`;

const CompleteBtn = styled.button`
  width: 180px;
  height: 40px;
  margin: 14px auto 14px auto;
  color: #ffffff;
  background-color: #e25b45;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
`;

const CompleteWrapper = styled.div`
  margin: auto;
`;

export default AnswerList;
