// describe("비로그인 상태", () => {
//   it("찬반페이지 메인뷰 보기", () => {
//     cy.visit("/");
//     cy.contains("찬반").click();
//     cy.url().should("include", "either");
//   });

//   it("다음 카드 보기", () => {
//     cy.get('[data-testId="nextArrow"]')
//       .click({ force: true })
//       .click({ force: true });
//   });

//   it("이전 카드 보기", () => {
//     cy.get('[data-testId="prevArrow"]')
//       .click({ force: true })
//       .click({ force: true });
//   });

//   it("진행중보기", () => {
//     cy.contains("진행중").click({ force: true });
//   });

//   it("종료됨보기", () => {
//     cy.contains("종료됨").click({ force: true });
//   });

//   it("전체보기", () => {
//     cy.contains("전체").click({ force: true });
//   });

//   it("작성하기", () => {
//     const stub = cy.stub();
//     cy.visit("/");
//     cy.contains("찬반").click().url().should("include", "either");
//     cy.contains("질문하기").click();
//     cy.on("window:alert", stub);
//   });

//   it("로그인하기", () => {
//     cy.visit("/");
//     cy.contains("로그인").click();
//     cy.get(".idInput").type("rlarkqals").should("have.value", "rlarkqals");
//     cy.get(".pwInput").type("qwer1234@").should("have.value", "qwer1234@");
//     cy.get('[data-testid="loginButton"]')
//       .click()
//       .location("pathname")
//       .should("equal", "/");
//     cy.get('[data-testid="menuButton"]').click({ force: true });
//     cy.get('[data-testid="logOutButton"]').click();
//   });
// });

describe("로그인 상태", () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it("로그인하기", () => {
    cy.visit("/");
    cy.contains("로그인").click();
    cy.get(".idInput").type("rlarkqals").should("have.value", "rlarkqals");
    cy.get(".pwInput").type("qwer1234@").should("have.value", "qwer1234@");
    cy.get('[data-testid="loginButton"]')
      .click()
      .location("pathname")
      .should("equal", "/");
  });
  // it("찬반페이지 메인뷰 보기", () => {
  //   cy.contains("찬반").click();
  //   cy.url().should("include", "either");
  // });

  // it("다음 카드 보기", () => {
  //   cy.get('[data-testId="nextArrow"]')
  //     .click({ force: true })
  //     .click({ force: true });
  // });

  // it("이전 카드 보기", () => {
  //   cy.get('[data-testId="prevArrow"]')
  //     .click({ force: true })
  //     .click({ force: true });
  // });

  // it("전체,진행중,종료됨 보기", () => {
  //   cy.contains("진행중").click({ force: true });
  //   cy.contains("종료됨").click({ force: true });
  //   cy.contains("전체").click({ force: true })
  // });

  // it("작성하기", () => {
  //   cy.contains("찬반").click().url().should("include", "either");
  //   cy.contains("질문하기").click();
  //   cy.get('[data-testid="radioBtn"]').click();
  //   cy.get('[data-testid="titleInput"]')
  //     .type("테스트입니다.")
  //     .should("have.value", "테스트입니다.");
  //   cy.get('[data-testid="contentA"]')
  //     .type("컨텐트A 테스트입니다.")
  //     .should("have.value", "컨텐트A 테스트입니다.");
  //   cy.get('[data-testid="contentB"]')
  //     .type("컨텐트B 테스트입니다.")
  //     .should("have.value", "컨텐트B 테스트입니다.");
  //   cy.contains("완료").click().location("pathname").should("equal", "/either");
  // });

  it("A 투표하기", eitherId => {
    cy.contains("찬반").click().url().should("include", "either");
    cy.contains("진행중").click({ force: true });
    cy.get("button").filter(".buttonA").first().click();
    // .should("have.css", "background-color");
  });
  it("B 투표하기", () => {
    cy.contains("찬반").click().url().should("include", "either");
    cy.contains("진행중").click({ force: true });
    cy.get("button").filter(".buttonB").first().click();
    // .should("have.css", "background-color");
  });

  // it("투표수정하기", () => {
  //   // cy.get('[data-testId="nextArrow"]').click({ force: true });
  //   cy.contains("찬반").click().url().should("include", "either");
  //   cy.get("button").get('[data-testid="menuImage"]').first().click();
  //   cy.get('[data-testid="menuModify"]').click();
  //   cy.get('[data-testId="editTitle"]')
  //     .clear()
  //     .type("수정된 제목입니다.")
  //     .should("have.value", "수정된 제목입니다.");
  //   cy.get('[data-testId="editContentA"]')
  //     .clear()
  //     .type("수정된 컨텐츠A 입니다.")
  //     .should("have.value", "수정된 컨텐츠A 입니다.");
  //   cy.get('[data-testId="editContentB"]')
  //     .clear()
  //     .type("수정된 컨텐츠B 입니다.")
  //     .should("have.value", "수정된 컨텐츠B 입니다.");
  //   cy.contains("완료").click().location("pathname").should("equal", "/either");
  // });

  // it("완료하기", () => {
  //   const stub = cy.stub();
  //   cy.contains("찬반").click().url().should("include", "either");
  //   cy.get("button").get('[data-testid="menuImage"]').first().click();
  //   cy.get('[data-testid="menuComplete"]').click();
  //   cy.on("window:alert", stub).location("pathname").should("equal", "/either");
  // });

  // it("삭제하기", () => {
  //   const stub = cy.stub();
  //   cy.contains("찬반").click().url().should("include", "either");
  //   cy.contains("종료됨").click({ force: true });
  //   cy.get("button").get('[data-testid="compeleteMenuImage"]').first().click();
  //   cy.get('[data-testid="menuDelete"]').click();
  //   cy.on("window:alert", stub).location("pathname").should("equal", "/either");
  // });

  // it("로그아웃하기", () => {
  //   cy.get('[data-testid="headerNick"]').click({ force: true });
  //   cy.get('[data-testid="logOutButton"]').click();
  // });
});
