for (let i = 0; i < 20; i++) {
  const randomNum = Math.floor(Math.random() * 21);

  describe("프로필 페이지 테스트", () => {
    beforeEach(() => {
      cy.visit("/");
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
      cy.visit("/").then(win => {
        win.location.href = `/profile/${randomNum}`;
      });
    });

    it("자신의 프로필페이지에서만 닉네임 수정 버튼 표시", () => {
      cy.get('[data-testid="headerNick"]')
        .invoke("text")
        .then(headerNick => {
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(200);
          cy.get('[data-testid="profileNick"]')
            .invoke("text")
            .then(profileNick => {
              console.log(headerNick, profileNick);
              console.log(headerNick);
              console.log(profileNick);
              // headerNick === profileNick
              //   ? cy.get('[data-testid="nickEditBtn"]').should("be.visible")
              //   : cy.get('[data-testid="nickEditBtn"]').should("not.exist");
              if (localStorage.getItem("nickname") === profileNick) {
                cy.get('[data-testid="nickEditBtn"]').should("be.visible");
              } else {
                cy.get('[data-testid="nickEditBtn"]').should("not.exist");
              }
            });
        });
    });
  });
}
