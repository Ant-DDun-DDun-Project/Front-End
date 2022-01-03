import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { AiOutlineSearch } from "react-icons/ai";

import { history } from "../redux/configureStore";
import { SetParams } from "../redux/reducers/paramsSlice";
import { loginCheck, logoutUser } from "../redux/reducers/userSlice";
import useOnScreen from "../hooks/useOnScreen";

import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Symbol } from "../images/symbolRed.svg";
import { ReactComponent as chevronDown } from "../images/chevronDown.svg";
import { ReactComponent as CommonIcon } from "../images/CommonIcon.svg";
import { red, mobile, tablet } from "../shared/style";

const Header = () => {
  const dispatch = useDispatch();

  const { nickname = "GUEST", userId = "" } = useSelector(
    state => state.user.userInfo,
  );

  const [search, setSearch] = useState("");
  const scrollRef = useRef();

  const onScreen = useOnScreen(scrollRef, 0.6);

  useEffect(() => {
    dispatch(loginCheck());
  }, [dispatch]);

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  const onClickSimbol = useCallback(() => {
    history.push("/");
  }, []);

  const onClickLogout = useCallback(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  const onChangeSearch = useCallback(e => {
    setSearch(e.target.value);
  }, []);

  const submitSearch = useCallback(
    e => {
      if (e.key === "Enter" || e.type === "click") {
        if (!search.trim()) {
          alert("검색어를 입력해 주세요");
          return;
        }
        history.push(`/search?search=${search}`);
        setSearch("");
      }
    },
    [search],
  );

  const onClickNickname = useCallback(() => {
    history.push(`/profile/${userId}`);
  }, [userId]);

  const onClickEither = useCallback(() => {
    dispatch(SetParams("all"));
    history.push(`/either`);
  }, [dispatch]);

  const onClickMulti = useCallback(() => {
    dispatch(SetParams("all"));
    history.push(`/multi`);
  }, [dispatch]);

  return (
    <Container ref={scrollRef}>
      <Top topOnScreen={onScreen}>
        <Logo
          height="26px"
          fill="white"
          onClick={onClickSimbol}
          cursor="pointer"
        />
      </Top>
      <BottomWrapper topOnScreen={onScreen}>
        <Bottom>
          <MenuWrapper>
            <StyledSymbol onClick={onClickSimbol} />
            <span onClick={onClickEither}>찬반투표</span>
            <span onClick={onClickMulti}>객관식투표</span>
          </MenuWrapper>
          <Wrapper>
            <StyledSearch onClick={submitSearch} />
            <input
              placeholder="검색..."
              onKeyPress={submitSearch}
              onChange={onChangeSearch}
              value={search}
              data-testid="searchInput"
            />
          </Wrapper>
          <IconWrapper loggedIn={nickname !== "GUEST"}>
            {nickname === "GUEST" && (
              <span onClick={onClickLogin} className="loginBtn">
                로그인
              </span>
            )}
            {nickname !== "GUEST" && (
              <>
                <Menu
                  menuButton={
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <StyledCommonIcon />
                      <span data-testid="headerNick">{nickname}</span>
                      <StyledDown />
                    </div>
                  }
                >
                  <MenuItem onClick={onClickNickname}>프로필 페이지</MenuItem>
                  <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
                </Menu>
              </>
            )}
          </IconWrapper>
        </Bottom>
        <BottomMobile>
          <div className="voteBtns">
            <span onClick={onClickEither}>찬반투표</span>
            <span onClick={onClickMulti}>객관식투표</span>
          </div>
          <IconWrapperMobile loggedIn={nickname !== "GUEST"}>
            {nickname === "GUEST" && (
              <span onClick={onClickLogin} className="loginBtn">
                로그인
              </span>
            )}
            {nickname !== "GUEST" && (
              <>
                <Menu
                  menuButton={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <StyledCommonIcon />
                      <span data-testid="headerNick">{nickname}</span>
                      <StyledDown />
                    </div>
                  }
                >
                  <MenuItem onClick={onClickNickname}>프로필 페이지</MenuItem>
                  <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
                </Menu>
              </>
            )}
          </IconWrapperMobile>
        </BottomMobile>
        <SearchMobile>
          <StyledSearch onClick={submitSearch} data-testid="searchSubmit" />
          <input
            placeholder="검색..."
            onKeyPress={submitSearch}
            onChange={onChangeSearch}
            value={search}
          />
        </SearchMobile>
      </BottomWrapper>
    </Container>
  );
};
const BottomMobile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 86%;
  height: 70px;
  justify-content: space-between;
  color: ${red};
  font-weight: bold;

  .voteBtns {
    width: 160px;
    display: flex;
    justify-content: space-between;
  }

  @media screen and (min-width: ${mobile}) {
    display: none;
  }
`;

const IconWrapperMobile = styled.div`
  .loginBtn {
    color: white;
    position: relative;
    background-color: #e25b45;
    padding: 5px;
    border-radius: 7px;
    box-sizing: border-box;
  }
  div {
    width: 30%;
  }
`;

const SearchMobile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  max-width: 1280px;
  width: 75%;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    height: 32px;
    padding-left: 32px;
    border: 1px solid #e25b45;
    border-radius: 9px;
  }
  @media screen and (min-width: ${mobile}) {
    display: none;
  }

  @media screen and (max-width: ${mobile}) {
    width: 86%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  span {
    cursor: pointer;
    user-select: none;
  }
`;

const Top = styled.div`
  display: flex;
  width: 100%;
  height: ${props => (props.topOnScreen ? "56px" : "110px")};
  background-color: #00397c;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${mobile}) {
    height: ${props => (props.topOnScreen ? "56px" : "150px")};
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: ${props => (props.topOnScreen ? "relative" : "fixed")};
  width: 100%;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid ${red};
  box-sizing: border-box;
  z-index: 99999;
  transition: all 550ms cubic-bezier(0.19, 0.855, 0.265, 0.985);

  @media screen and (max-width: ${mobile}) {
    flex-direction: column;
    align-items: center;
    height: 90px;
    padding: 0 0 5px;
    border-bottom: 0;
  }
`;

const Bottom = styled.div`
  display: flex;
  max-width: 1280px;
  width: 90%;
  height: 100%;
  background-color: white;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  input {
    width: 400px;
    height: 32px;
    padding-left: 32px;
    border: 1px solid #e25b45;
    border-radius: 9px;
  }

  @media screen and (max-width: ${tablet}) {
    width: 100%;
  }

  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 30%;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const StyledSearch = styled(AiOutlineSearch)`
  position: absolute;
  left: 11px;
  min-width: 20px;
  min-height: 20px;
  color: #e25b45;
  cursor: pointer;
`;

const StyledSymbol = styled(Symbol)`
  cursor: pointer;
  user-select: none;
  height: 37px;
  margin-right: 30px;

  @media screen and (max-width: ${mobile}) {
    display: none;
  }
`;

const StyledDown = styled(chevronDown)`
  position: relative;
  top: 1px;
  width: 24px;
  height: 20px;
  cursor: pointer;
`;

const StyledCommonIcon = styled(CommonIcon)`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  cursor: pointer;

  @media screen and (max-width: ${mobile}) {
    display: none;
    /* width: 30px;
    height: 30px;
    margin-right: 0;

    span {
      margin: 0;
    } */
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  height: 100%;

  span {
    margin: 0 30px;
    color: #e25b45;
    text-align: center;
  }

  @media screen and (max-width: 1540px) {
    width: 35%;
  }

  @media screen and (max-width: ${tablet}) {
    width: 40%;
    span {
      margin: 0 10px;
    }
  }

  @media screen and (max-width: ${mobile}) {
    width: 60%;
    justify-content: space-around;

    span {
      margin: 0;
    }
  }
`;

const IconWrapper = styled.div`
  position: relative;
  right: ${props => (props.loggedIn ? 0 : "45px")};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  width: 30%;
  height: 100%;

  span {
    margin: 0;
    color: #e25b45;
    text-align: center;
  }

  .loginBtn {
    color: white;
    position: relative;
    left: 40px;
    width: 70px;
    background-color: #e25b45;
    padding: 5px;
    border-radius: 7px;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${mobile}) {
    position: relative;
    font-size: 14px;
    justify-content: center;
  }
`;

export default Header;
