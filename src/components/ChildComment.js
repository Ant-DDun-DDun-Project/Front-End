import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";

import colors from "../shared/colors";
import {
  AddChildDB,
  DelChildDB,
  EditChildDB,
} from "../redux/actions/childComment";
import { AddLikeChild } from "../redux/actions/multiLike";
import CommentContent from "../elements/CommentContent";
import CommentDate from "../elements/CommentDate";
import Nickname from "./Nickname";
import { history } from "../redux/configureStore";
import { darkGray } from "../shared/style";

const ChildComment = props => {
  const {
    nickname,
    date,
    id,
    parentComment,
    comment,
    deleted,
    likeCnt,
    liked,
    user,
  } = props;

  const dispatch = useDispatch();
  const multiId = props.multiId;
  const userNickname = localStorage.getItem("nickname");
  const dataList = useSelector(state => state.multiDetail.multiDetail);

  const [addInput, setAddInput] = useState(false);
  const [addBtn, setAddBtn] = useState(true);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [editBtn, setEditBtn] = useState(true);
  const [editCancelBtn, setEditCancelBtn] = useState(false);
  const [delBtn, setDelBtn] = useState(true);
  const [likes, setLikes] = useState(likeCnt);
  const [likeState, setLikeState] = useState(
    liked && liked !== null ? true : false,
  );
  const inputRef = useRef();
  const editInputRef = useRef();

  useEffect(() => {
    setLikes(likeCnt);
  }, [likeCnt]);

  useEffect(() => {
    if (dataList.multi.completed === 1) {
      setAddInput(false);
      setAddInput(false);
      setAddBtn(false);
      setCancelBtn(false);
      setEditBtn(false);
      setEditCancelBtn(false);
      setDelBtn(false);
    }
  }, []);

  const showInput = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && addInput === false) {
      setAddInput(true);
      setAddBtn(false);
      setCancelBtn(true);
      setEditBtn(false);
      setDelBtn(false);
      setTimeout(() => {
        inputRef.current.focus();
      }, 500);
    } else {
      setAddInput(false);
      setAddBtn(true);
      setCancelBtn(false);
      setEditBtn(true);
      setDelBtn(true);
    }
  };

  const newDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const [newComment, setNewComment] = useState();
  const changeChild = e => {
    setNewComment(e.target.value);
  };

  const addChildComment = () => {
    dispatch(
      AddChildDB({
        multiId,
        id: parentComment,
        data: { comment: newComment },
      }),
    );
    showInput();
  };

  const showEditInput = () => {
    if (editInput === false) {
      setEditInput(true);
      setEditBtn(false);
      setEditCancelBtn(true);
      setDelBtn(false);
      setTimeout(() => {
        editInputRef.current.focus();
      }, 500);
    } else {
      setEditInput(false);
      setEditBtn(true);
      setEditCancelBtn(false);
      setDelBtn(true);
    }
  };
  const editedDate = moment().format("YYYY-MM-DD HH:mm:ss");

  const [newEditChild, setNewEditChild] = useState();
  const changeEditChild = e => {
    setNewEditChild(e.target.value.substr(0, 1000));
  };

  const editChildComment = () => {
    dispatch(EditChildDB({ multiId, id, data: { comment: newEditChild } }));
    showEditInput();
  };

  const delComment = () => {
    dispatch(DelChildDB({ id, multiId }));
  };

  const addLike = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용가능합니다");
      history.push("/login");
    } else if (userNickname && liked === null) {
      dispatch(AddLikeChild({ id, multiId }));
      setLikes(likeCnt + 1);
      setLikeState(true);
    } else {
      return;
    }
  };

  return (
    <>
      <div>
        <InfoWarpper>
          <NickWarpper>
            <Nickname
              userId={user}
              nickname={nickname}
              fontSize={"12px"}
              width={"24px"}
              height={"24px"}
              color={darkGray}
            ></Nickname>
            {"\u00a0\u00a0"}
            <CommentDate>{date.substring(0, 16)}</CommentDate>
          </NickWarpper>
          <BtnWrapper>
            {userNickname === nickname && !deleted && editBtn ? (
              <EventBtn onClick={showEditInput}>수정</EventBtn>
            ) : null}
            {userNickname === nickname && !deleted && delBtn ? (
              <EventBtn onClick={delComment}>삭제</EventBtn>
            ) : null}
            {addBtn ? <EventBtn onClick={showInput}>답글 달기</EventBtn> : null}
          </BtnWrapper>
        </InfoWarpper>
        <ContentWrapper>
          <CommentWrapper>
            {deleted ? (
              <CommentContent>{"삭제된 댓글입니다"}</CommentContent>
            ) : (
              <CommentContent>{comment}</CommentContent>
            )}
          </CommentWrapper>
          <LikeWrapper>
            {!likeState ? (
              <LikeBtn onClick={addLike}>
                <AiOutlineLike />
              </LikeBtn>
            ) : (
              <LikeBtn>
                <AiFillLike />
              </LikeBtn>
            )}
            <TotalLikes>{likes}</TotalLikes>
          </LikeWrapper>
        </ContentWrapper>

        {userNickname === nickname && !deleted && editInput ? (
          <ReplyWarpper>
            <TextArea ref={editInputRef} onChange={changeEditChild}>
              {comment}
            </TextArea>
            <TextAreaBtn onClick={editChildComment}>완료</TextAreaBtn>
            <TextAreaBtn onClick={showEditInput}>취소</TextAreaBtn>
          </ReplyWarpper>
        ) : null}

        {addInput ? (
          <ReplyWarpper>
            <TextArea
              ref={inputRef}
              onChange={changeChild}
              placeholder="내용을 입력해주세요"
            ></TextArea>
            <TextAreaBtn onClick={showInput}>취소</TextAreaBtn>
            <TextAreaBtn onClick={addChildComment}>완료</TextAreaBtn>
          </ReplyWarpper>
        ) : null}
      </div>
    </>
  );
};

const InfoWarpper = styled.div`
  margin: 5px 0 8px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const NickWarpper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 0 0;
`;

const BtnWrapper = styled.div`
  padding: 0 0 6px 0;
`;

const EventBtn = styled.button`
  font-size: 10px;
  text-decoration: underline;
  font-family: "Noto Sans KR", sans-serif;
  border: none;
  color: ${colors.gray5};
  background-color: ${colors.white};
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin: -20px auto 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CommentWrapper = styled.div`
  margin: 0 auto 0 32px;
`;

const LikeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeBtn = styled.button`
  border: none;
  padding: 2px 6px 0 6px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.red};
  background-color: ${colors.white};
  cursor: pointer;
`;

const TotalLikes = styled.p`
  font-size: 10px;
  color: ${colors.red};
`;

const ReplyWarpper = styled.div`
  width: 100%;
  height: 80px;
  margin: 0 0 0 auto;
  border: 1px ${colors.gray5} solid;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  background-color: ${colors.gray};
`;

const TextAreaBtn = styled.button`
  border: none;
  border-radius: 4px;
  margin: 54px 5px 0 0;
  width: 50px;
  height: 20px;
  font-size: 10px;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
  background-color: ${colors.red};
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 80%;
  height: 50px;
  margin: auto;
  padding-left: 10px;
  border: none;
  resize: none;
  font-family: "Noto-Sans KR", sans-serif;
  background-color: ${colors.gray};
  &:focus {
    outline: none;
  }
`;

export default ChildComment;
