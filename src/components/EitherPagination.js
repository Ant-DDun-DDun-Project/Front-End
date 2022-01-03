import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import EitherListCard from "./EitherListCard";
import EitherCompleteListCard from "./EitherCompleteListCard";

import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((v, i) =>
          v.completed === 0 ? (
            <EitherListCard
              key={i}
              eitherId={v.eitherId}
              nickname={v.nickname}
              title={v.title}
              contentA={v.contentA}
              contentB={v.contentB}
              date={v.date}
              likeCnt={v.likeCnt}
              voteCntA={v.voteCntA}
              voteCntB={v.voteCntB}
              liked={v.liked}
              voted={v.voted}
              completed={v.completed}
              user={v.user}
            />
          ) : (
            <EitherCompleteListCard
              key={i}
              eitherId={v.eitherId}
              nickname={v.nickname}
              title={v.title}
              contentA={v.contentA}
              contentB={v.contentB}
              date={v.date}
              likeCnt={v.likeCnt}
              voteCntA={v.voteCntA}
              voteCntB={v.voteCntB}
              liked={v.liked}
              voted={v.voted}
              completed={v.completed}
              user={v.user}
            />
          ),
        )}
    </div>
  );
}

const EitherPagination = ({ items, itemsPerPage = 5 }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = event => {
    window.scroll(0, 0);
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <StyledPagenation>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="다음 >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< 이전"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </StyledPagenation>
  );
};

const StyledPagenation = styled.div`
  .pagination {
    margin: 60px auto;
    display: flex;
    justify-content: center;
    list-style: none;
    outline: none;
    font-size: 12px;
    padding: 0;
    user-select: none;
  }
  .pagination > .active > a {
    color: #fff;
  }
  .pagination > li > a {
    padding: 5px 10px;
    outline: none;
    cursor: pointer;
  }
  .pagination > .active > a,
  .pagination > .active > span,
  .pagination > .active > a:hover,
  .pagination > .active > span:hover,
  .pagination > .active > a:focus,
  .pagination > .active > span:focus {
    background-color: ${blue};
    border-color: ${blue};
    outline: none;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: ${blue};
  }

  .page-link:hover {
    background-color: #eeeeee;
  }

  .pagination > li:first-child > a,
  .pagination > li:first-child > span,
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-radius: unset;
  }
`;

export default EitherPagination;
