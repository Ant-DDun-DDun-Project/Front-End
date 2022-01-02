import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import ChildComment from "./ChildComment";

const ChildList = props => {
  const dataList = useSelector(state => state.multiDetail.multiDetail);
  const childList = dataList.childComment;
  const multiId = props.multiId;
  const { parentComment } = props;
  const filterList = childList.filter(p => {
    return parentComment == p.parentComment;
  });

  return (
    <>
      <TempWarpper>
        {filterList.map(p => (
          <div>
            <ChildComment
              multiId={multiId}
              nickname={p.nickname}
              date={p.date}
              id={p.id}
              parentComment={p.parentComment}
              comment={p.comment}
              deleted={p.deleted}
              likeCnt={p.likeCnt}
              liked={p.liked}
              user={p.user}
            />
          </div>
        ))}
      </TempWarpper>
    </>
  );
};

const TempWarpper = styled.div`
  width: 90%;
  margin: 0 0 0 10%;
`;

export default ChildList;
