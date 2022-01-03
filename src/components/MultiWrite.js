import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import moment from "moment";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { AddPostDB, EditPostDB } from "../redux/actions/multiCard";
import { SetParams } from "../redux/reducers/paramsSlice";
import colors from "../shared/colors";
import { mobile } from "../shared/style";

const MultiWrite = props => {
  const dispatch = useDispatch();
  const editData = props.editData;
  const multiId = props.multiId;
  const isEdit = editData ? true : false;

  const { AddPostDBDone, EditPostDBDone } = useSelector(
    state => state.multiCard,
  );
  const [title, setTitle] = useState(isEdit ? editData.title : "");
  const [description, setDescription] = useState(
    isEdit ? editData.description : "",
  );
  const [hiddenBtnB, setHiddenBtnB] = useState(
    isEdit && editData.contentC !== null ? false : true,
  );
  const [hiddenBtnC, setHiddenBtnC] = useState(
    isEdit && editData.contentD !== null ? false : true,
  );
  const [hiddenBtnD, setHiddenBtnD] = useState(
    isEdit && editData.contentE !== null ? false : true,
  );
  const [hiddenInputC, setHiddenInputC] = useState(
    isEdit && editData.contentC !== null ? true : false,
  );
  const [hiddenInputD, setHiddenInputD] = useState(
    isEdit && editData.contentD !== null ? true : false,
  );
  const [hiddenInputE, setHiddenInputE] = useState(
    isEdit && editData.contentE !== null ? true : false,
  );
  const [contentA, setContentA] = useState(isEdit ? editData.contentA : "");
  const [contentB, setContentB] = useState(isEdit ? editData.contentB : "");
  const [contentC, setContentC] = useState(isEdit ? editData.contentC : "");
  const [contentD, setContentD] = useState(isEdit ? editData.contentD : "");
  const [contentE, setContentE] = useState(isEdit ? editData.contentE : "");
  const [addAction, setAddAction] = useState(null);
  const [editAction, setEditAction] = useState(null);

  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const editedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const titleRef = useRef();
  const descriptionRef = useRef();
  const contentARef = useRef();
  const contentBRef = useRef();
  const contentCRef = useRef();
  const contentDRef = useRef();
  const contentERef = useRef();

  //수정하던 게시물의 경우, 해당 게시물 아이디 기억하도록 설정
  //기억해둔 아이디의 게시물 위치로 목록 볼 수 있도록함
  useEffect(() => {
    if (isEdit) {
      dispatch(SetParams(multiId));
    } else {
      dispatch(SetParams("all"));
    }
  });

  //작성 완료 통신 후 게시물 목록으로 이동
  useEffect(() => {
    if (addAction && AddPostDBDone) {
      window.alert("작성이 완료되었습니다.");
      history.replace("/multi");
    }
  }, [AddPostDBDone, addAction]);

  //수정 완료 통신 후 게시물 목록으로 이동
  useEffect(() => {
    if (editAction && EditPostDBDone) {
      window.alert("수정이 완료되었습니다.");
      history.replace("/multi");
    }
  }, [EditPostDBDone, editAction]);

  //post 작성하기
  //투표 항목 1번부터 차례대로 입력되도록 설정
  //투표 빈칸별로 if문 조건처리
  const addPost = () => {
    if (title === "") {
      window.alert("no title");
      return setTimeout(() => {
        titleRef.current.focus();
      }, 500);
    } else if (description === "") {
      window.alert("no description");
      return setTimeout(() => {
        descriptionRef.current.focus();
      }, 500);
    } else if (contentA === "") {
      window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentARef.current.focus();
      }, 500);
    } else if (contentB === "") {
      window.alert("선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentBRef.current.focus();
      }, 500);
    } else if ((contentD !== "" || contentE !== "") && contentC === "") {
      window.alert("세번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentCRef.current.focus();
      }, 500);
    } else if (contentE !== "" && contentD === "") {
      window.alert("네번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentDRef.current.focus();
      }, 500);
    } else if (contentC === "" && contentD === "" && contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          contentA,
          contentB,
        }),
      );
      setAddAction(true);
    } else if (contentD === "" && contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          contentA,
          contentB,
          contentC,
        }),
      );
      setAddAction(true);
    } else if (contentE === "") {
      dispatch(
        AddPostDB({
          title,
          description,
          contentA,
          contentB,
          contentC,
          contentD,
        }),
      );
      setAddAction(true);
    } else {
      dispatch(
        AddPostDB({
          title,
          description,
          contentA,
          contentB,
          contentC,
          contentD,
          contentE,
        }),
      );
      setAddAction(true);
    }
  };

  //post 수정하기
  //투표 항목 1번부터 차례대로 입력되도록 설정
  //투표 빈칸별로 if문 조건처리
  const eidtPost = () => {
    if (title === "") {
      window.alert("제목을 입력해주세요");
      return setTimeout(() => {
        titleRef.current.focus();
      }, 500);
    } else if (description === "") {
      window.alert("내용을 입력해주세요");
      return setTimeout(() => {
        descriptionRef.current.focus();
      }, 500);
    } else if (contentA === "") {
      window.alert("첫번쨰 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentARef.current.focus();
      }, 500);
    } else if (contentB === "") {
      window.alert("두번쨰 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentBRef.current.focus();
      }, 500);
    } else if ((contentD !== "" || contentE !== "") && contentC === "") {
      window.alert("세번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentCRef.current.focus();
      }, 500);
    } else if (contentE !== "" && contentD === "") {
      window.alert("네번째 선택지를 빈칸없이 차례대로 입력해 주세요");
      return setTimeout(() => {
        contentDRef.current.focus();
      }, 500);
    } else if (contentC === "" && contentD === "" && contentE === "") {
      dispatch(
        EditPostDB({
          multiId,
          data: { title, description, contentA, contentB },
        }),
      );
      setEditAction(true);
    } else if (contentD === "" && contentE === "") {
      dispatch(
        EditPostDB({
          multiId,
          data: {
            title,
            description,
            contentA,
            contentB,
            contentC,
          },
        }),
      );
      setEditAction(true);
    } else if (contentE === "") {
      dispatch(
        EditPostDB({
          multiId,
          data: {
            title,
            description,
            contentA,
            contentB,
            contentC,
            contentD,
          },
        }),
      );
      setEditAction(true);
    } else {
      dispatch(
        EditPostDB({
          multiId,
          data: {
            title,
            description,
            contentA,
            contentB,
            contentC,
            contentD,
            contentE,
          },
        }),
      );
      setEditAction(true);
    }
  };

  //제목 입력
  const changeTitle = e => {
    setTitle(e.target.value.substr(0, 30));
  };

  //내용 입력
  const changeDescription = e => {
    setDescription(e.target.value);
  };

  //3번째 투표항목부터 입력창 on off
  const showInputC = () => {
    setHiddenInputC(true);
    hideBtnB();
  };

  const hideInputC = () => {
    setHiddenInputC(false);
    showBtnB();
    setContentC("");
  };

  const showInputD = () => {
    setHiddenInputD(true);
    hideBtnC();
  };

  const hideInputD = () => {
    setHiddenInputD(false);
    showBtnC();
    setContentD("");
  };

  const showInputE = () => {
    setHiddenInputE(true);
    hideBtnD();
  };

  const hideInputE = () => {
    setHiddenInputE(false);
    showBtnD();
    setContentE("");
  };

  //선택지 추가제거 버튼 on off
  const showBtnB = () => {
    setHiddenBtnB(true);
  };

  const hideBtnB = () => {
    setHiddenBtnB(false);
  };

  const showBtnC = () => {
    setHiddenBtnC(true);
  };

  const hideBtnC = () => {
    setHiddenBtnC(false);
  };

  const showBtnD = () => {
    setHiddenBtnD(true);
  };

  const hideBtnD = () => {
    setHiddenBtnD(false);
  };

  //글 작성 취소
  const cancel = () => {
    dispatch(SetParams("all"));
    history.push("/multi");
  };

  //투표항목 내용 입력
  const changeContentA = e => {
    setContentA(e.target.value.substr(0, 30));
  };

  const changeContentB = e => {
    setContentB(e.target.value.substr(0, 30));
  };

  const changeContentC = e => {
    setContentC(e.target.value.substr(0, 30));
  };

  const changeContentD = e => {
    setContentD(e.target.value.substr(0, 30));
  };

  const changeContentE = e => {
    setContentE(e.target.value.substr(0, 30));
  };

  return (
    <>
      <WriteHr />
      <TitleWarpper>
        <InfoWarpper>
          <InfoText>제목</InfoText>
        </InfoWarpper>
        <InputWarpper>
          <Input
            ref={titleRef}
            type="text"
            maxlength="40"
            placeholder="질문을 입력해주세요. (30자 이내)"
            onChange={changeTitle}
            value={title}
          />
        </InputWarpper>
      </TitleWarpper>
      <WriteHr />
      <ContentWarpper>
        <InfoWarpper>
          <InfoText>내용</InfoText>
        </InfoWarpper>
        <InputWarpper>
          <Textarea
            ref={descriptionRef}
            type="text"
            placeholder="선택지 추가를 눌러 선택지 개수를 늘려보세요. 최대 5개까지 추가할 수 있습니다."
            rows="10"
            onChange={changeDescription}
            value={description}
          />
        </InputWarpper>
      </ContentWarpper>
      <VoteBox>
        <PollWarpper>
          <InputPoll
            ref={contentARef}
            onChange={changeContentA}
            value={contentA}
            placeholder="선택지 내용을 입력해주세요. (30자 이내)"
          />
        </PollWarpper>
        <PollWarpper>
          <InputPoll
            ref={contentBRef}
            onChange={changeContentB}
            value={contentB}
            placeholder="선택지 내용을 입력해주세요. (30자 이내)"
          />
          {hiddenBtnB ? (
            <FullBtn onClick={showInputC}>+ 선택지 추가</FullBtn>
          ) : null}
        </PollWarpper>
        {hiddenInputC ? (
          <PollWarpper>
            <InputPoll
              ref={contentCRef}
              onChange={changeContentC}
              value={contentC}
              placeholder="선택지 내용을 입력해주세요. (30자 이내)"
            />
            <BtnWarpper>
              {hiddenBtnC ? (
                <HalfBtn onClick={hideInputC}>- 선택지 삭제</HalfBtn>
              ) : null}
              {hiddenBtnC ? (
                <HalfBtn onClick={showInputD}>+ 선택지 추가</HalfBtn>
              ) : null}
            </BtnWarpper>
          </PollWarpper>
        ) : null}
        {hiddenInputD ? (
          <PollWarpper>
            <InputPoll
              ref={contentDRef}
              onChange={changeContentD}
              value={contentD}
              placeholder="선택지 내용을 입력해주세요. (30자 이내)"
            />
            <BtnWarpper>
              {hiddenBtnD ? (
                <HalfBtn onClick={hideInputD}>- 선택지 삭제</HalfBtn>
              ) : null}
              {hiddenBtnD ? (
                <HalfBtn onClick={showInputE}>+ 선택지 추가</HalfBtn>
              ) : null}
            </BtnWarpper>
          </PollWarpper>
        ) : null}
        {hiddenInputE ? (
          <PollWarpper>
            <InputPoll
              ref={contentERef}
              onChange={changeContentE}
              value={contentE}
              placeholder="선택지 내용을 입력해주세요. (30자 이내)"
            />
            <FullBtn onClick={hideInputE}>- 선택지 삭제</FullBtn>
          </PollWarpper>
        ) : null}
        <WriteHr />
        <EventBtnWarpper>
          <CancelBtn onClick={cancel}>취소</CancelBtn>
          {isEdit ? (
            <AddBtn onClick={eidtPost}>수정 완료</AddBtn>
          ) : (
            <AddBtn onClick={addPost}>완료</AddBtn>
          )}
        </EventBtnWarpper>
      </VoteBox>
    </>
  );
};

const WriteHr = styled.hr`
  border: none;
  height: 1px;
  margin: 0 auto;
  background-color: ${colors.lineGray};
`;

const TitleWarpper = styled.div`
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InfoWarpper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
`;

const InfoText = styled.p`
  width: 68px;
  /* left: 0px;
  text-align: left; */
  font-size: 18px;
  font-weight: 700;
  color: ${colors.darkGray};
  @media screen and (max-width: ${mobile}) {
    font-size: 16px;
  }
`;

const ContentWarpper = styled.div`
  display: flex;
`;

const InputWarpper = styled.div`
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: "Noto Sans KR", sans-serif;
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray5};
  }
  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;

const Textarea = styled.textarea`
  min-width: 100%;
  max-width: 510px;
  margin: 16px 0;
  border: none;
  outline: none;
  font-size: 18px;
  font-family: "Noto Sans KR", sans-serif;
  resize: none;
  &::placeholder {
    font-size: 16px;
    color: ${colors.gray5};
  }
  @media screen and (max-width: ${mobile}) {
    font-size: 14px;
  }
`;

const VoteBox = styled.div`
  margin: auto;
  min-width: 100%;
  max-width: 620px;
`;

const PollWarpper = styled.div`
  max-width: 620px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const InputPoll = styled.input`
  width: 100%;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  margin: 4px auto;
  padding: 10px;
  background-color: ${colors.gray};
  border: 1px ${colors.gray5} solid;
  border-radius: 8px;
  box-sizing: border-box;
`;

const BtnWarpper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FullBtn = styled.button`
  min-width: 100%;
  max-width: 510px;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  padding: 10px;
  margin: 8px auto 16px auto;
  color: ${colors.blue};
  background-color: ${colors.white};
  border: 1px ${colors.blue} solid;
  border-radius: 8px;
  cursor: pointer;
`;

const HalfBtn = styled.button`
  width: 290px;
  height: 48px;
  font-family: "Noto Sans KR", sans-serif;
  margin: 8px 0;
  padding: 10px;
  color: ${colors.blue};
  background-color: ${colors.white};
  border: 1px ${colors.blue} solid;
  border-radius: 8px;
  cursor: pointer;
  @media screen and (max-width: ${mobile}) {
    width: 48%;
  }
`;

const EventBtnWarpper = styled.div`
  width: 100%;
  margin: 24px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const AddBtn = styled.button`
  width: 290px;
  height: 40px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.white};
  border: 1px ${colors.red} solid;
  border-radius: 8px;
  background-color: ${colors.red};
  cursor: pointer;
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
  }
`;

const CancelBtn = styled.button`
  width: 290px;
  height: 40px;
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.red};
  border: 1px ${colors.red} solid;
  border-radius: 8px;
  background-color: ${colors.white};
  cursor: pointer;
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.8);
  }
`;

export default MultiWrite;
