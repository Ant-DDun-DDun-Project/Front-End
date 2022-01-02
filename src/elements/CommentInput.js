import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import colors from "../shared/colors";
import { useDispatch, useSelector } from "react-redux";
import { AddCommentDB } from "../redux/actions/comment";
import { history } from "../redux/configureStore";

const CommentInput = props => {
  const dispatch = useDispatch();
  const userNickname = localStorage.getItem("nickname");
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  const changeComment = e => {
    setComment(e.target.value.substr(0, 1000));
  };

  const addComment = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && comment == "") {
      window.alert("댓글 내용을 입력해주세요");
      inputRef.current.focus();
    } else {
      dispatch(AddCommentDB({ multiId, data: { comment } }));
      inputReset();
      setComment("");
    }
  };

  const inputReset = () => {
    inputRef.current.value = "";
  };

  return (
    <Container>
      {dataList.multi.completed !== 1 ? (
        <Warpper>
          {userNickname ? (
            <TextArea
              data-testid="commentInput"
              ref={inputRef}
              onChange={changeComment}
              placeholder="내용을 입력해주세요"
            ></TextArea>
          ) : (
            <TextArea
              ref={inputRef}
              disabled
              placeholder="로그인 후 이용 가능합니다."
            ></TextArea>
          )}
          <AddBtn onClick={addComment}>작성</AddBtn>
        </Warpper>
      ) : (
        <DisabledWarpper>
          <DisabledComment>
            투표가 종료된 게시물에는 댓글을 작성할 수 없습니다
          </DisabledComment>
        </DisabledWarpper>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  min-width: 100%;
  max-width: 556px;
`;

const Warpper = styled.div`
  margin: auto;
  /* width: 90%; */
  height: 80px;
  border: 1px ${colors.gray5} solid;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  background-color: ${colors.gray};
`;

const TextArea = styled.textarea`
  width: 540px;
  height: 50px;
  margin: auto;
  padding: 0 0 0 10px;
  border: none;
  resize: none;
  font-family: "Noto-Sans KR", sans-serif;

  background-color: ${colors.gray};
  &:focus {
    outline: none;
  }
`;

const AddBtn = styled.button`
  border: none;
  border-radius: 4px;
  margin: 54px 5px 0 0;
  min-width: 50px;
  height: 20px;
  font-size: 10px;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
  background-color: ${colors.red};
  cursor: pointer;
`;

const DisabledWarpper = styled.div`
  min-width: 100%;
  max-width: 556px;
  height: 80px;
  /* border: 1px ${colors.gray5} solid; */
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  /* background-color: ${colors.gray}; */
`;

const DisabledComment = styled.p`
  max-width: 556px;
  margin: auto;
  text-align: center;
  color: ${colors.darkGray};
  font-size: 14px;
`;

export default CommentInput;
