import React, { useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import colors from "../shared/colors";
import { useDispatch } from "react-redux";
import { AddCommentDB } from "../redux/actions/comment";

const CommentInput = props => {
  const dispatch = useDispatch();
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const multiId = props.multiId;
  const [comment, setComment] = useState("");
  const inputRef = useRef();

  const changeComment = e => {
    setComment(e.target.value);
    console.log(e.target.value);
  };

  const addComment = () => {
    if (comment == "") {
      window.alert("댓글 내용을 입력해주세요");
    } else {
      dispatch(AddCommentDB({ multiId, data: { comment, date } }));
      inputReset();
    }
    console.log("comment", comment);
  };

  const inputReset = () => {
    inputRef.current.value = "";
  };

  return (
    <Container>
      <Warpper>
        <TextArea
          ref={inputRef}
          onChange={changeComment}
          placeholder="내용을 입력해주세요"
        ></TextArea>
        <AddBtn onClick={addComment}>작성</AddBtn>
      </Warpper>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
`;

const Warpper = styled.div`
  width: 556px;
  height: 80px;
  border: 1px ${colors.gray5} solid;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  background-color: ${colors.gray};
`;

const TextArea = styled.textarea`
  width: 480px;
  height: 50px;
  margin: auto;
  border: none;
  resize: none;
  background-color: ${colors.gray};
  &:focus {
    outline: none;
  }
`;

const AddBtn = styled.button`
  border: none;
  border-radius: 4px;
  margin: 60px 5px 0 0;
  width: 35px;
  height: 16px;
  font-size: 10px;
  color: ${colors.white};
  background-color: ${colors.red};
`;

export default CommentInput;
