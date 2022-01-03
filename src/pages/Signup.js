import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useInput from "../hooks/useInput";
import { signup, checkIdDup, checkNickDup } from "../redux/actions/user";
import { history } from "../redux/configureStore";

import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as Symbol } from "../images/symbolBlue.svg";
import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

const Signup = () => {
  const isLoggedIn = useSelector(state => state.user.userInfo.userId);

  const dispatch = useDispatch();

  const {
    checkIdDupResult,
    checkIdDupLoading,
    checkNickDupLoading,
    checkNickDupResult,
  } = useSelector(state => state.user);

  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useInput("");
  const [age, setAge] = useInput("");
  const [idError, setIdError] = useState(false);
  const [idNotice, setIdNotice] = useState(true);
  const [idDupCheck, setIdDupCheck] = useState(false);
  const [nickNotice, setNickNotice] = useState(true);
  const [nickDupCheck, setNickDupCheck] = useState(false);
  const [nickError, setNickError] = useState(false);
  const [nickLength, setNickLength] = useState(false);
  const [passwordError, setPasswordError] = useState(true);
  const [passwordNotice, setPasswordNotice] = useState(true);
  const [passwordEqual, setPasswordEqual] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const idRef = useRef();
  const nickRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();
  const ageRef = useRef();

  useEffect(() => {
    if (id.trim()) {
      setIdNotice(false);
    }
    setIdDupCheck(false);
  }, [id]);

  useEffect(() => {
    if (nickname.trim()) {
      setNickNotice(false);
    }
    setNickDupCheck(false);
  }, [nickname]);

  useEffect(() => {
    if (password.trim()) {
      setPasswordNotice(false);
    }
  }, [password]);

  useEffect(() => {
    setIdDupCheck(checkIdDupResult);
  }, [checkIdDupResult]);

  useEffect(() => {
    setNickDupCheck(checkNickDupResult);
  }, [checkNickDupResult]);

  const idFilter = useCallback(id => {
    const filter = /^[a-z0-9_-]{5,20}$/;
    return filter.test(id);
  }, []);

  const pwFilter = useCallback(password => {
    const filter =
      /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[a-zA-Z0-9!@#$%^&*?-]{8,16}$/;
    return filter.test(password);
  }, []);

  const idChecker = useCallback(() => {
    if (!id.trim()) {
      setIdError(true);
      setIdNotice(true);
      return false;
    }
    if (!idFilter(id)) {
      setIdError(true);
      setIdNotice(true);
      return false;
    }
    setIdError(false);
    return true;
  }, [idFilter, id]);

  const nickChecker = useCallback(() => {
    if (!nickname.trim()) {
      setNickError(true);
      setNickNotice(true);
      return false;
    }
    if (nickname.length < 2 || nickname.length > 7) {
      setNickLength(true);
      setNickNotice(false);
      setNickError(true);
      return;
    }

    setNickLength(false);
    setNickError(false);
    setNickNotice(false);
    return true;
  }, [nickname]);

  const pwChecker = useCallback(() => {
    if (!password.trim()) {
      setPasswordError(true);
      return false;
    }
    if (!pwFilter(password)) {
      setPasswordError(true);
      return false;
    }
    setPasswordError(false);
    return true;
  }, [password, pwFilter]);

  const pwEqualChecker = useCallback(() => {
    if (password !== passwordCheck) {
      setPasswordEqual(true);
      return false;
    }
    setPasswordEqual(false);
    return true;
  }, [password, passwordCheck]);

  const ageChecker = useCallback(() => {
    if (!age.trim()) {
      setAgeError(true);
      return false;
    }
    setAgeError(false);
    return true;
  }, [age]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (idError || !id.trim()) {
        idRef.current.focus();
        return;
      }
      if (nickError || !nickname.trim()) {
        nickRef.current.focus();
        return;
      }
      if (passwordError) {
        pwRef.current.focus();
        return;
      }
      if (passwordEqual) {
        pwCheckRef.current.focus();
        return;
      }
      if (!ageChecker()) {
        ageRef.current.focus();
        return;
      }

      if (!pwEqualChecker()) return;
      // if (!ageChecker()) return;
      if (!nickname.trim()) {
        return;
      }
      if (!nickDupCheck || !idDupCheck || passwordError) {
        return;
      }
      dispatch(
        signup({
          userId: id,
          nickname: nickname,
          pw: password,
          confirmPw: passwordCheck,
          ageGroup: age,
        }),
      );
      return;
    },
    [
      idDupCheck,
      nickDupCheck,
      pwEqualChecker,
      ageChecker,
      id,
      nickname,
      password,
      passwordCheck,
      age,
      dispatch,
      passwordError,
      idError,
      nickError,
      passwordEqual,
    ],
  );

  const onClickIdDup = useCallback(
    e => {
      e.preventDefault();
      if (!id.trim()) return;
      idChecker();
      dispatch(
        checkIdDup({
          userId: id,
        }),
      );
      setIdDupCheck(true);
      if (!id.trim()) {
        setIdNotice(true);
        return;
      }
      setIdNotice(false);
    },
    [dispatch, id, idChecker],
  );

  const onClickNickDup = useCallback(
    e => {
      e.preventDefault();
      if (!nickname.trim()) {
        nickChecker();
        return;
      }
      nickChecker();
      dispatch(
        checkNickDup({
          nickname,
        }),
      );
      setNickDupCheck(true);
      if (!nickname.trim()) {
        setNickNotice(true);
        return;
      }
      setNickNotice(false);
    },
    [dispatch, nickname, nickChecker],
  );

  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);

  const onBlurPw = useCallback(() => {
    setPasswordNotice(false);
    if (!pwChecker()) return;
  }, [pwChecker]);

  const onBlurPwCheck = useCallback(() => {
    if (!pwChecker()) return;
    if (!pwEqualChecker()) return;
  }, [pwChecker, pwEqualChecker]);

  return (
    <>
      <Container>
        <Form onSubmit={onSubmit}>
          <StyledSymbol />
          <Logo fill={blue} height="30px" style={{ margin: "10px 0 35" }} />
          <SelectSubject>
            <span className="selectAgeInfo">가입 하기</span>
          </SelectSubject>
          <IdPwWrapper>
            <InputContent>
              <InputWrapper>
                <input
                  ref={idRef}
                  type="id"
                  value={id}
                  onChange={onChangeId}
                  placeholder="아이디"
                  onBlur={onClickIdDup}
                  data-testid="idInput"
                />
              </InputWrapper>
              {idNotice && (
                <span style={{ color: "black" }}>
                  5~20자 영문 소문자, 숫자, 특수기호(-)를 사용하세요
                </span>
              )}
              {idError && !checkIdDupLoading && !idNotice && (
                <span>5~20자 영문 소문자, 숫자, 특수기호(-)만 가능합니다</span>
              )}
              {checkIdDupResult &&
                !idError &&
                !checkIdDupLoading &&
                !idNotice && (
                  <span style={{ color: blue }}>사용가능한 아이디 입니다</span>
                )}
              {checkIdDupResult === false &&
                !checkIdDupLoading &&
                !idNotice && <span>이미 사용중인 아이디 입니다</span>}
            </InputContent>
            <InputContent>
              <InputWrapper>
                <input
                  ref={nickRef}
                  type="text"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="닉네임"
                  onBlur={onClickNickDup}
                  data-testid="nickInput"
                />
              </InputWrapper>
              {nickNotice && (
                <span style={{ color: "black" }}>
                  2~7자의 닉네임을 사용하세요
                </span>
              )}
              {checkNickDupResult &&
                !nickError &&
                !checkNickDupLoading &&
                !nickLength &&
                !nickNotice && (
                  <span style={{ color: blue }}>사용가능한 닉네임 입니다</span>
                )}
              {nickLength && !checkNickDupLoading && !nickNotice && (
                <span>2~7자로 입력해 주세요</span>
              )}
              {checkNickDupResult === false &&
                !checkNickDupLoading &&
                !nickNotice && <span>이미 사용중인 닉네임 입니다</span>}
            </InputContent>
          </IdPwWrapper>
          <Content>
            <InputWrapper>
              <input
                ref={pwRef}
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="비밀번호"
                autocomplete="new-password"
                onBlur={onBlurPw}
                data-testid="pwInput"
              />
            </InputWrapper>
            {passwordNotice && (
              <span style={{ color: "black" }}>
                8~16자 영문, 숫자, 특수문자 조합을 사용하세요
              </span>
            )}
            {!passwordNotice && passwordError && (
              <span>8~16자 영문, 숫자, 특수문자 조합을 사용하세요</span>
            )}
            {!passwordNotice && !passwordError && (
              <span style={{ color: blue }}>사용 가능한 비밀번호입니다</span>
            )}
          </Content>
          <Content>
            <InputWrapper>
              <input
                ref={pwCheckRef}
                type="password"
                value={passwordCheck}
                onChange={setPasswordCheck}
                placeholder="비밀번호확인"
                onBlur={onBlurPwCheck}
                data-testid="pwCheckInput"
              />
            </InputWrapper>
            {passwordEqual && <span>같은 비밀번호를 입력해 주세요</span>}
          </Content>
          <Content>
            <SelectSubject>
              <span className="selectAgeInfo">연령 정보</span>
              <span className="selectAgeExp">
                아래의 정보는 이용자 통계에만 이용되며, 공개적으로 표시되지
                않습니다.
              </span>
            </SelectSubject>
            <InputWrapper>
              <select ref={ageRef} onChange={setAge} data-testid="ageSelect">
                <option value="">연령대를 선택해 주세요</option>
                <option value={10}>10대</option>
                <option value={20}>20대</option>
                <option value={30}>30대</option>
                <option value={40}>40대</option>
                <option value={50}>50대 이상</option>
              </select>
            </InputWrapper>
            {ageError && <span>연령대를 선택해 주세요</span>}
          </Content>
          <ButtonWrapper>
            <SignupButton type="submit" data-testid="signupButton">
              회원가입
            </SignupButton>
          </ButtonWrapper>
        </Form>
        <LoginWrapper>
          <span>계정이 이미 있으신가요?</span>
          <span className="goLogin" onClick={onClickLogin}>
            로그인
          </span>
        </LoginWrapper>
      </Container>
    </>
  );
};

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  user-select: none;

  .goLogin {
    color: ${red};
    margin: 0 24px;
    cursor: pointer;
  }

  @media screen and (max-width: ${mobile}) {
    flex-direction: column;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 100px auto;
  min-height: 100vh;
  padding-bottom: 40px;
  @media screen and (max-width: ${mobile}) {
    margin: auto;
    padding-bottom: 60px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 840px;
  width: 90%;
  height: 656px;
  box-sizing: border-box;
  margin: 30px auto;
  font-size: 20px;
  border: 2px solid ${blue};
  border-radius: 10px;
  padding: 2em;

  select {
    border-radius: 10px;
    border: 1px solid ${darkGray};
    padding-left: 20px;
    width: 100%;
    height: 48px;
    /* appearance: none; */
    /* background-image: url('../images/chevronDown.png'); */
  }

  input {
    border-radius: 10px;
    border: 1px solid ${gray5};
    background-color: ${grayMultiply};
    padding-left: 20px;

    ::placeholder {
      font-size: 14px;
    }
  }

  @media screen and (max-width: ${tablet}) {
    height: 730px;
  }

  @media screen and (max-width: ${mobile}) {
    height: 730px;
    width: 95%;
    padding: 0.5em;
  }
`;

const StyledSymbol = styled(Symbol)`
  user-select: none;
  height: 37px;
  fill: ${blue};
`;

const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 290px;
  max-width: 620px;
  height: 80px;
  font-size: 0.6em;
  color: ${red};
  @media screen and (max-width: ${tablet}) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 620px;
  height: 80px;
  font-size: 0.6em;
  color: ${red};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60%;

  input {
    width: 100%;
    ::placeholder {
      font-size: 12px;
    }
  }
`;

const SelectSubject = styled.div`
  display: flex;
  flex-direction: column;
  color: black;
  width: 90%;
  max-width: 620px;

  .selectAgeInfo {
    font-size: 18px;
    font-weight: bold;
  }

  .selectAgeExp {
    font-size: 12px;
    color: #495057;
    margin: 5px 0;
  }

  @media screen and (max-width: ${mobile}) {
    margin-bottom: 12px;
  }
`;

const IdPwWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 620px;
  justify-content: space-between;

  input {
    width: 290px;
    box-sizing: border-box;
  }

  @media screen and (max-width: ${tablet}) {
    flex-direction: column;

    input {
      width: 100%;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;

  button {
    width: 100%;
    height: 3em;
  }
`;

const SignupButton = styled.button`
  position: relative;
  top: 60px;
  width: 180px;
  height: 40px;
  margin: 0 0 10px;
  background-color: ${red};
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

export default Signup;
