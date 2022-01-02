import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";

import LoadingBubble from "../elements/LoadingBubble";
import { getMyPolls, getMyPosts } from "../redux/actions/profile";
import { getProfileNick, updateNick } from "../redux/actions/user";
import { history } from "../redux/configureStore";

import MainPagination from "../components/MainPagination";
import { ReactComponent as CommonIcon } from "../images/CommonIcon.svg";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

const Profile = props => {
  const userId = props.match.params.user_id;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const {
    myPosts,
    myPolls,
    getMyPostsDone,
    getMyPollsDone,
    getMyPostsLoading,
    getMyPollsLoading,
  } = useSelector(state => state.profile);
  const { userId: myId, nickname } = useSelector(state => state.user.userInfo);
  const { profileNick, getProfileNickLoading } = useSelector(
    state => state.user,
  );
  const [clicked, setClicked] = useState("posts");
  const [nicknameClick, setNicknameClick] = useState(false);
  const [nickInput, setNickInput] = useState(profileNick);
  const [myPostsloadDone, setMyPostsloadDone] = useState(false);
  const [myPollsloadDone, setMyPollsloadDone] = useState(false);
  const [pollsClicked, setPollsClicked] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("로그인 후 접속이 가능합니다");
      history.replace("/login");
    }
  }, [token]);

  useEffect(() => {
    if (getMyPostsDone && getMyPollsDone) {
      setTimeout(() => {
        setMyPostsloadDone(true);
        setMyPollsloadDone(true);
      }, 100);
      return;
    }
    setMyPollsloadDone(false);
    setMyPostsloadDone(false);
  }, [getMyPostsDone, getMyPollsDone]);

  useEffect(() => {
    dispatch(getProfileNick(userId));
    dispatch(getMyPosts(userId));
  }, [dispatch, userId]);

  const onClickPostBtn = useCallback(
    type => {
      setClicked(type);
      if (type === "posts" && !myPostsloadDone) {
        dispatch(getMyPosts(userId));
        return;
      }
      if (type === "polls" && !pollsClicked) {
        dispatch(getMyPolls(userId));
        setPollsClicked(true);
      }
    },
    [dispatch, userId, myPostsloadDone, pollsClicked],
  );

  const onClickNickname = useCallback(() => {
    setNicknameClick(true);
  }, []);

  const onChangeNick = useCallback(e => {
    setNickInput(e.target.value);
  }, []);

  const onSubmitNick = useCallback(
    e => {
      if (e.key === "Enter") {
        dispatch(updateNick(nickInput));
        setNicknameClick(false);
      }
    },
    [dispatch, nickInput],
  );

  return (
    <Container>
      <MyInfo>
        <CommonIcon />
        <div className="nicknameWrapper">
          {nicknameClick ? (
            <>
              <input
                onChange={onChangeNick}
                defaultValue={profileNick}
                onKeyPress={onSubmitNick}
              />
              <AiFillEdit
                size={24}
                fill={red}
                onClick={() => {
                  onSubmitNick({ key: "Enter" });
                }}
                style={{
                  cursor: "pointer",
                  top: "5px",
                  right: "-30px",
                  position: "absolute",
                }}
                data-testid="nickEditBtn"
              />
            </>
          ) : (
            <>
              {
                <Nickname data-testid="profileNick">
                  {getProfileNickLoading ? nickInput : profileNick}
                </Nickname>
              }
              {Number(userId) === myId && (
                <AiFillEdit
                  size={24}
                  fill={red}
                  onClick={onClickNickname}
                  style={{
                    cursor: "pointer",
                    top: "3px",
                    position: "absolute",
                  }}
                  data-testid="nickEditBtn"
                />
              )}
            </>
          )}
        </div>
        <PostBtns>
          <MyPostsBtn
            clicked={clicked}
            onClick={() => {
              onClickPostBtn("posts");
            }}
          >
            작성한 글
          </MyPostsBtn>
          <MyPollsBtn
            clicked={clicked}
            onClick={() => {
              onClickPostBtn("polls");
            }}
          >
            참여한 글
          </MyPollsBtn>
        </PostBtns>
      </MyInfo>
      <PostsContainer>
        {getMyPostsLoading && <LoadingBubble />}
        {getMyPollsLoading && <LoadingBubble />}
        {clicked === "posts" ? (
          <MainPagination items={myPosts} />
        ) : (
          <MainPagination items={myPolls} />
        )}
      </PostsContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  padding-bottom: 40px;
  @media screen and (max-width: ${mobile}) {
    padding-bottom: 60px;
  }
`;

const MyInfo = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 840px;
  width: 100vw;
  height: 288px;
  margin: auto;
  user-select: none;

  button {
    position: absolute;
    bottom: 8.5em;
  }

  .nicknameWrapper {
    position: relative;
    top: 32px;
    height: 32px;
  }

  input {
    height: 100%;
    border-radius: 10px;
    padding-left: 10px;
  }
`;

const Nickname = styled.span`
  font-size: 24px;
  margin: 0 16px;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
  background-color: ${grayMultiply};
  margin: auto;
  padding: 54px 0 0;
`;

const PostBtns = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  bottom: -50px;
  font-size: 18px;
  font-weight: bold;
`;

const MyPostsBtn = styled.span`
  cursor: pointer;
  padding: 14px;
  border-bottom: ${props =>
    props.clicked === "posts" ? `3px solid ${blue}` : `3px solid white`};
  color: ${props => (props.clicked === "posts" ? blue : gray5)};
`;

const MyPollsBtn = styled.span`
  cursor: pointer;
  padding: 14px;
  border-bottom: ${props =>
    props.clicked === "polls" ? `3px solid ${blue}` : `3px solid white`};
  color: ${props => (props.clicked === "polls" ? blue : gray5)};
`;

export default Profile;
