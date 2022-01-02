describe("로그인 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("로그인페이지에서 회원가입 버튼 확인", () => {
    cy.visit("/");
    cy.contains("로그인")
      .click()
      .location("pathname")
      .should("equal", "/login");
    cy.contains("회원가입")
      .click()
      .location("pathname")
      .should("equal", "/signup");
  });

  it("로그인페이지 아이디, 패스워드 입력 후 제출", () => {
    cy.contains("로그인")
      .click()
      .location("pathname")
      .should("equal", "/login");
    cy.get(".idInput").type("asd123").should("have.value", "asd123");
    cy.get(".pwInput").type("asdasd123!").should("have.value", "asdasd123!");
    cy.get('[data-testid="loginButton"]')
      .click()
      .location("pathname")
      .should("equal", "/");
    cy.get(".loginBtn").should("not.exist");
  });
});
