const BASE_URL = "http://localhost:3000";

describe("todos feed", () => {
  it("when load, renders the page", () => {
    cy.visit(BASE_URL);
  });
  it("when create a new todo, it must appears in the screen", () => {
    // Interceptações/Interceptação
    cy.intercept("POST", `${BASE_URL}/api/todos`, (request) => {
      request.reply({
        statusCode: 201,
        body: {
          todo: {
            id: "bc80f3de-09b9-4d04-a2ae-99e2469b6300",
            date: "2023-07-27T20:29:32.566Z",
            content: "Test todo",
            done: false,
          },
        },
      });
    }).as("createTodo");
    cy.visit(BASE_URL);
    cy.get("input[name='add-todo'").type("Test todo");
    cy.get("[aria-label='Adicionar novo item']").click();

    cy.get("table > tbody").contains("Test todo");
  });
});
