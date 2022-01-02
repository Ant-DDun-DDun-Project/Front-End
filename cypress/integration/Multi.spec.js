import { first } from "lodash";

describe("Multi test", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  it("비로그인 상태에서 작성하기 후 로그인", () => {
    cy.visit("/multi");
    cy.contains("로그인").click();
    cy.get(".idInput").type("pineapple").should("have.value", "pineapple");
    cy.get(".pwInput").type("test111!").should("have.value", "test111!");
    cy.waitForReact();
    cy.get('[data-testid="loginButton"]')
      .click()
      .location("pathname")
      .should("equal", "/");
    // cy.visit("/multi");
    // cy.contains("질문하기").click();
  });
  it("질문하기", () => {
    cy.visit("/multi");
    cy.contains("질문하기").click();
  });
  // it("객관식 라디오 선택", () => {
  //   cy.contains("객관식").click();
  // });
  it("작성 취소하기", () => {
    cy.contains("취소").click().location("pathname").should("equal", "/multi");
  });
  it("진행중 탭 클릭", () => {
    cy.contains("진행중").click();
  });
  it("종료됨 탭 클릭", () => {
    cy.contains("종료됨").click({ force: true });
  });
  it("전체 탭 클릭", () => {
    cy.contains("전체").click({ force: true });
  });
  it("리스트 뷰 보기", () => {
    cy.get('[data-testid="listView"]').click({ force: true });
  });
  it("상세보기", () => {
    cy.contains("상세보기").click({ force: true });
  });
  it("선택없이 완료하기", () => {
    cy.contains("완료하고 결과보기").click({ force: true });
  });
  it("첫번째 항목 선택하기", () => {
    cy.get('[id="A"]').click({ force: true });
  });
  it("두번째 항목 선택하기", () => {
    cy.get('[id="B"]').click({ force: true });
  });
  it("스크롤 내리기", () => {
    cy.scrollTo(0, 500);
  });
  it("대댓글 달기", () => {
    cy.contains("답글 달기").click({ force: true });
  });
  it("대댓글 입력", () => {
    cy.get('[data-testid="childCommentInput"]')
      .type("cypress testing now")
      .should("have.value", "cypress testing now");
  });
  it("대댓글 달기 취소", () => {
    cy.contains("취소").click({ force: true });
  });
  // it("댓글 수정", () => {
  //   cy.contains("수정").click({ force: true });
  // });
  // it("댓글 수정 취소", () => {
  //   cy.contains("취소").click({ force: true });
  // });
  // it("댓글 삭제", () => {
  //   cy.contains("삭제").click({ force: true });
  // });
  it("TOP 버튼", () => {
    cy.contains("TOP").click();
  });
  it("뒤로가기", () => {
    cy.get('[data-testid="backBtn"]')
      .click()
      .location("pathname")
      .should("equal", "/multi");
  });
  it("내 작성글 보기", () => {
    cy.visit("/multi/152");
  });
  it("메뉴 열기", () => {
    cy.get('[data-testid="menuBtn"]').click();
  });
  it("수정하기", () => {
    cy.contains("수정하기").click();
  });
  it("스크롤 내리기(댓글수정)", () => {
    cy.scrollTo(0, 500);
  });
  it("댓글 작성", () => {
    cy.get('[data-testid="commentInput"]')
      .first()
      .focus()
      .type("cypress testing now")
      .should("have.value", "cypress testing now");
    cy.contains("작성").click({ force: true });
  });
  it("댓글 수정하기", () => {
    cy.contains("수정").click({ force: true });
  });
  it("댓글 수정 취소하기", () => {
    cy.contains("취소").click({ force: true });
  });
  it("댓글 삭제하기", () => {
    cy.contains("삭제").first().click({ force: true });
  });
  it("메인으로 돌아가기", () => {
    cy.visit("/");
  });
  // it("질문하기", () => {
  //   cy.contains("객관식").click();
  // });
});
