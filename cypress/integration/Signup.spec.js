describe("회원가입 페이지 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("로그인")
      .click()
      .location("pathname")
      .should("equal", "/login");
  });

  it("로그인페이지에서 회원가입 버튼 클릭", () => {
    cy.contains("회원가입")
      .click()
      .location("pathname")
      .should("equal", "/signup");
  });

  it("회원가입 페이지 각 인풋 입력 후 아이디 중복 문구 체크", () => {
    cy.contains("회원가입")
      .click()
      .location("pathname")
      .should("equal", "/signup");
    cy.get('[data-testid="idInput"]')
      .type("asd123")
      .should("have.value", "asd123");
    cy.get('[data-testid="nickInput"]').focus();
    cy.contains("이미 사용중인 아이디 입니다").should("exist");
    cy.get('[data-testid="nickInput"]')
      .type("무야호")
      .should("have.value", "무야호");
    cy.get('[data-testid="pwInput"]').focus();
    cy.contains("이미 사용중인 닉네임 입니다").should("exist");
    cy.get('[data-testid="pwInput"]')
      .type("asdasd123!")
      .should("have.value", "asdasd123!");
    cy.get('[data-testid="pwCheckInput"]')
      .type("asdasd123!")
      .should("have.value", "asdasd123!");
    cy.get('[ data-testid="ageSelect"]')
      .select("10대")
      .should("have.value", "10");
    cy.get('[ data-testid="ageSelect"]')
      .select("20대")
      .should("have.value", "20");
    cy.get('[ data-testid="ageSelect"]')
      .select("30대")
      .should("have.value", "30");
    cy.get('[ data-testid="ageSelect"]')
      .select("40대")
      .should("have.value", "40");
    cy.get('[ data-testid="ageSelect"]')
      .select("50대 이상")
      .should("have.value", "50");
    cy.get('[data-testid="signupButton"]').should("have.text", "회원가입");
  });
});
