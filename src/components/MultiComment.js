import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import CommentList from "./CommentList";
import CommentInput from "../elements/CommentInput";
import colors from "../shared/colors";

const MultiComment = props => {
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const multiId = props.multiId;

  return (
    <Contaier>
      <Warpper>
        <TextAreaWarpper>
          <CommentInput multiId={multiId} />
        </TextAreaWarpper>
        {dataList.comment[0] ? (
          <div>
            <CommentList multiId={multiId} items={dataList.comment} />
          </div>
        ) : (
          <EmptyComment> 첫번째 댓글을 남겨주세요!</EmptyComment>
        )}
      </Warpper>
    </Contaier>
  );
};

const Contaier = styled.div`
  max-width: 620px;
  margin: 10px auto 20px auto;
  display: flex;
  padding: 0 20px;
  flex-direction: column;
`;

const Warpper = styled.div`
  width: 100%;
  margin: auto;
`;

const TextAreaWarpper = styled.div`
  min-width: 100%;
  max-width: 620px;
  margin: 0 auto 20px;
`;

const EmptyComment = styled.p`
  text-align: center;
  color: ${colors.darkGray};
  font-size: 12px;
`;

export default MultiComment;
