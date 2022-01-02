import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import { FiArrowLeft } from "react-icons/fi";

import colors from "../shared/colors";
import MultiComment from "../components/MultiComment";
import MultiVoted from "../components/MultiVoted";
import LoadingBubble from "../elements/LoadingBubble";
import { mobile } from "../shared/style";
import { DetailDB } from "../redux/actions/multiDetail";
import { SetParams } from "../redux/reducers/paramsSlice";
import MultiMenu from "../elements/MultiMenu";

const CompletedDetail = props => {
  const dispatch = useDispatch();
  const multiDetail = useSelector(state => state.multiDetail.multiDetail);
  const userNickname = localStorage.getItem("nickname");
  const multiId = props.multiId;
  const TotalCnt = props.TotalCnt;
  const dataList = multiDetail.multi && multiDetail;
  const completed = true;
  const { DetailDBDone, DetailDBLoading } = useSelector(
    state => state.multiDetail,
  );

  useEffect(() => {
    dispatch(DetailDB(multiId));
    dispatch(SetParams(multiId));
  }, [dispatch, multiId]);

  const goToMulti = () => {
    history.push({
      pathname: "/multi",
      state: { multiId: multiId },
    });
  };

  return (
    <>
      <Container>
        {DetailDBLoading === true && <LoadingBubble />}
        {DetailDBDone === true && (
          <Wrapper>
            <MenuWarpper>
              <BackBtn onClick={goToMulti}>
                <FiArrowLeft />
              </BackBtn>
              {userNickname === dataList.multi.nickname ? (
                <MultiMenu
                  multiId={multiId}
                  TotalCnt={TotalCnt}
                  completed={completed}
                />
              ) : null}
            </MenuWarpper>
            <DisabledComment>투표가 종료된 게시물 입니다</DisabledComment>
            <div>
              <MultiVoted multiId={multiId} dataList={dataList} />
            </div>

            <div>
              <MultiComment multiId={multiId} />
            </div>
          </Wrapper>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  /* min-width: 100%; */
  max-width: 1100px;
  min-height: 100%;
  margin: 56px auto 50px auto;
  box-sizing: border-box;
  @media screen and (max-width: ${mobile}) {
    width: 90%;
    margin-top: 28px;
  }
`;

const BackBtn = styled.button`
  margin: 10px auto 0 10px;
  border: none;
  font-size: 24px;
  font-family: "Noto Sans KR", sans-serif;
  color: ${colors.gray5};
  background-color: ${colors.white};
`;

const Wrapper = styled.div`
  /* min-width: 80%; */
  max-width: 840px;
  margin: auto;
  border: 2px ${colors.blue} solid;
  border-radius: 10px;
  background-color: ${colors.white};
`;

const MenuWarpper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DisabledComment = styled.p`
  text-align: center;
  color: ${colors.darkGray};
  font-size: 14px;
`;

export default CompletedDetail;
