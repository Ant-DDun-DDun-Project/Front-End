import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";

import MultiSlick from "../components/MultiSlick";
import colors from "../shared/colors";
import { mobile } from "../shared/style";
import { PostDB, PostingDB, PostCompleteDB } from "../redux/actions/multiCard";
import LoadingBubble from "../elements/LoadingBubble";
import MultiPagination from "../components/MultiPagination";
import { SetView } from "../redux/reducers/viewSlice";
import { SetParams } from "../redux/reducers/paramsSlice";

const Multi = props => {
  const dispatch = useDispatch();
  const paramsId = useSelector(state => state.params.paramsId);
  const viewStatus = useSelector(state => state.view.viewStatus);
  const [select, setSelect] = useState("checkMulti");
  const [status, setStatus] = useState("Post");
  const [loadDone, setLoadDone] = useState(false);
  const [changeView, setChangeView] = useState(viewStatus);
  const userNickname = localStorage.getItem("nickname");

  const {
    multiPost,
    multiPosting,
    multiPostComplete,
    PostDBDone,
    PostingDBDone,
    PostCompleteDBDone,
    PostDBLoading,
    PostingDBLoading,
    PostCompleteDBLoading,
  } = useSelector(state => state.multiCard);

  const cardList = multiPost && multiPost.multi;
  const ingCardList = multiPosting && multiPosting.multi;
  const completeCardList = multiPostComplete && multiPostComplete.multi;
  // console.log("cardList", cardList);
  // console.log("ingCardList", ingCardList);

  useEffect(() => {
    if (viewStatus === false) {
      dispatch(PostDB(paramsId));
      dispatch(PostingDB(paramsId));
      dispatch(PostCompleteDB(paramsId));
      setStatus("Post");
    } else {
      dispatch(PostDB("all"));
      dispatch(PostingDB("all"));
      dispatch(PostCompleteDB("all"));
      setStatus("Post");
    }
  }, [dispatch, paramsId, viewStatus]);

  const showPost = () => {
    setStatus("Post");
  };
  const showPosting = () => {
    setStatus("Posting");
  };
  const showCompletePost = () => {
    setStatus("CompletePost");
  };

  const goToWrite = () => {
    if (!userNickname) {
      window.alert("로그인 후 이용 가능합니다");
      history.replace("/login");
    } else {
      window.scroll(0, 0);
      history.push({
        pathname: "/write",
        state: { select: select },
      });
    }
  };

  const viewList = () => {
    setChangeView(true);
    dispatch(SetView(true));
    dispatch(SetParams("all"));
  };
  const viewSlide = () => {
    setChangeView(false);
    dispatch(SetView(false));
    dispatch(SetParams("all"));
  };
  return (
    <Container>
      <TabBtnWarpper>
        {status === "Post" ? (
          <TabBtnOn onClick={showPost}>전체</TabBtnOn>
        ) : (
          <TabBtn onClick={showPost}>전체</TabBtn>
        )}
        {status === "Posting" ? (
          <TabBtnOn onClick={showPosting}>진행중</TabBtnOn>
        ) : (
          <TabBtn onClick={showPosting}>진행중</TabBtn>
        )}
        {status === "CompletePost" ? (
          <TabBtnOn onClick={showCompletePost}>종료됨</TabBtnOn>
        ) : (
          <TabBtn onClick={showCompletePost}>종료됨</TabBtn>
        )}
      </TabBtnWarpper>
      {viewStatus === false ? (
        <QuestionWarpper>
          <ViewWarpper>
            <ViewBtn data-testid="slideView" onClick={viewSlide}>
              <img
                className="view"
                src={require("../images/slideViewSelected.png").default}
                alt=""
              />
            </ViewBtn>
            <ViewBtn data-testid="listView" onClick={viewList}>
              <img
                className="view"
                src={require("../images/listView.png").default}
                alt=""
              />
            </ViewBtn>
          </ViewWarpper>
          <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
        </QuestionWarpper>
      ) : (
        <QuestionWarpperB>
          <ViewWarpper>
            <ViewBtn onClick={viewSlide}>
              <img
                className="view"
                src={require("../images/slideView.png").default}
                alt=""
              />
            </ViewBtn>
            <ViewBtn onClick={viewList}>
              <img
                className="view"
                src={require("../images/listViewSelected.png").default}
                alt=""
              />
            </ViewBtn>
          </ViewWarpper>
          <QuestionBtn onClick={goToWrite}>질문하기</QuestionBtn>
        </QuestionWarpperB>
      )}
      {changeView === false ? (
        <SliderWarpper>
          {PostDBLoading ? <LoadingBubble /> : null}
          {status === "Post" && PostDBDone === true && (
            <MultiSlick cardList={cardList} />
          )}
          {/* {PostingDBLoading === true && <LoadingBubble />} */}
          {status === "Posting" && <MultiSlick cardList={ingCardList} />}
          {/* {PostCompleteDBLoading === true && <LoadingBubble />} */}
          {status === "CompletePost" && (
            <MultiSlick cardList={completeCardList} />
          )}
        </SliderWarpper>
      ) : (
        <PaginationWarpper>
          {PostDBLoading ? <LoadingBubble /> : null}
          {status === "Post" && PostDBDone === true && (
            <MultiPagination items={cardList} />
          )}
          {status === "Posting" && <MultiPagination items={ingCardList} />}
          {status === "CompletePost" && (
            <MultiPagination items={completeCardList} />
          )}
        </PaginationWarpper>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 1280px;
  margin: auto;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
  @media screen and (max-width: ${mobile}) {
    max-width: 768px;
    padding-bottom: 60px;
  }
`;

const TabBtnWarpper = styled.div`
  margin: 51px auto 0px auto;
  width: 100%;
  text-align: center;
  width: 240px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${mobile}) {
    /* max-width: 300px; */
    width: 80%;
    margin: 30px auto 0px auto;
  }
`;

const TabBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.gray5};
  line-height: 29px;
  cursor: pointer;
  &:hover {
    color: ${colors.blue};
    text-decoration: underline;
    text-underline-position: under;
  }
  @media screen and (max-width: ${mobile}) {
    font-size: 17px;
  }
`;

const TabBtnOn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;
  font-family: "Noto Sans KR", sans-serif;
  line-height: 29px;
  cursor: pointer;
  color: ${colors.blue};
  text-decoration: underline;
  text-underline-position: under;
  @media screen and (max-width: ${mobile}) {
    font-size: 17px;
  }
`;

const QuestionWarpper = styled.div`
  margin: 16px auto -8px auto;
  width: 100%;
  max-width: 418px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 80%;
  }
`;

const QuestionWarpperB = styled.div`
  margin: 16px auto -8px auto;
  width: 100%;
  max-width: 840px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: ${mobile}) {
    margin: 30px auto;
    width: 80%;
  }
`;

const QuestionBtn = styled.button`
  display: block;

  border: 1px ${colors.red} solid;
  border-radius: 8px;
  width: 132px;
  height: 40px;
  color: ${colors.red};
  background-color: ${colors.white};
  font-size: 16px;
  font-family: "Noto Sans KR", sans-serif;
  z-index: 10;
  cursor: pointer;
  &:hover {
    background-color: ${colors.red};
    color: ${colors.white};
  }
  @media screen and (max-width: ${mobile}) {
    transform: scale(0.9);
    margin: 0 -4px;
  }
`;

const ViewWarpper = styled.div`
  height: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  margin: auto 0;
`;

const ViewBtn = styled.div`
  z-index: 10;
  margin-right: 16px;
  cursor: pointer;
  .view {
    height: 24px;
  }
`;

const SliderWarpper = styled.div`
  margin: 0px auto;
  width: 100%;
  height: 100%;
`;

const PaginationWarpper = styled.div``;

export default Multi;
