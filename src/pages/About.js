import React from "react";
import styled from "styled-components";

import {
  blue,
  red,
  mobile,
  tablet,
  gray5,
  grayMultiply,
  darkGray,
} from "../shared/style";

const About = () => {
  return (
    <Container>
      <Subject>ABOUT</Subject>
      <Content>
        <strong>개미들의 곡소리</strong>는 주식에 대해 가볍게 이야기하고, 투자와
        관련된 고민들을 보다 쉽고 간단하게 해결할 수 있는 공간이 되고자 합니다.
        투자에 대한 개미 투자자들의 관심이 높아짐에 따라, 주식 투자에 대한
        고민들을 양자택일 또는 다자택일의 투표 형식으로 게재하며 짧은 시간에도
        캐주얼하고 편리하게 의견을 나눌 수 있는 커뮤니티를 만들고자 했습니다.
        <br />
        사이트에 대한 피드백은 하단의 <strong>설문조사</strong>나 우측의{" "}
        <strong>버튼</strong>을 통해 받고 있습니다.
      </Content>
      <Subject>TERMS OF USE</Subject>
      {/* prettier-ignore */}
      <Content>
        1. 개인정보<br/>
        - 회원은 회원가입 시 아이디, 비밀번호, 연령대를 필수적으로 입력해야 합니다.<br/>
        - 가입 시 입력된 회원의 개인정보는 회원 식별 및 등록과 관리, 통계 및 분석을 위한 목적으로만 수집, 이용됩니다.<br/>
        - 회원의 관리소홀로 인한 회원 ID 및 패스워드 노출과 이에 따른 피해는 전적으로 회원이 책임지도록 합니다.<br/>
        <br/>
        2. 이용 시 주의사항<br/>
        - 글 작성 시, 사이트의 이용목적에 부합하도록 유의하고 다른 이용자들에게 불쾌감을 줄 수 있는 욕설 또는 비하 표현들은 지양 바랍니다. <br/>
        - 댓글 작성 시, 본 커뮤니티의 건전한 토론 분위기를 조성하기 위해 다른 이용자들에게 불쾌감을 줄 수 있는 욕설 또는 비하 표현들은 지양 바랍니다. <br/>
        - 관리자의 판단에 따라 본 사이트의 이용 수칙을 지키지 않은 게시글, 댓글 등은 삭제될 수 있습니다. 투자자 본인에게 있음을 명심 바랍니다.<br />
        - 주식 투자에 따른 수익과 손실은 투자자 본인에게 귀속되므로, 본 커뮤니티에서 제공되는 정보에 따른 투자 판단에 대한 최종적인 책임은 투자자 본인에게 있음을 명심 바랍니다.
      </Content>
    </Container>
  );
};

const Container = styled.div`
  width: 67%;
  /* min-height: 927px; */
  min-height: 100vh;
  margin: 0 auto;
  padding: 96px 0 0;
  line-height: 30px;
  box-sizing: border-box;

  @media screen and (max-width: ${mobile}) {
    width: 90%;
  }
`;

const Subject = styled.div`
  margin: 0 0 32px;
  font-size: 32px;
  color: ${blue};
`;

const Content = styled.div`
  margin: 0 0 142px;
  font-size: 16px;
  word-spacing: -1px;
  color: ${darkGray};
`;

export default About;
