/// <reference types="cypress" />
const sizes = ['macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6+', 'iphone-se2'];


sizes.forEach((size) => {
  describe(`Home Page e2e tests on ${size}`, () => {
  
  beforeEach(() => {
    cy.viewport(size as any);
    cy.visit("http://localhost:5173/");
  });

  it("should added a new task", () => {
    const newTask = "Nova tarefa";

    cy.get(`input[placeholder="Descreva sua tarefa"]`).type(newTask);
    cy.contains("Adicionar").click();
    cy.get("input[placeholder='Descreva sua tarefa']").should("be.empty");
    cy.wait(500);

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("contain.text", newTask);
  });

  it("should have no tasks", () => {
    cy.contains("Nenhuma tarefa adicionada ainda!").should("be.visible");
  });

  it("should mark a task as completed and reorder", () => {
    const task1 = "Tarefa para ser concluída";
    const task2 = "Outra Tarefa 1";
    const task3 = "Outra Tarefa 2";

    [task2, task3, task1].forEach((task) => {
      cy.get('input[placeholder="Descreva sua tarefa"]').type(task);
      cy.contains("Adicionar").click();
      cy.get("input[placeholder='Descreva sua tarefa']").should("be.empty");
      cy.wait(500);
    });

    cy.contains(task1).parent().find('input[type="checkbox"]').check();
    cy.wait(500);

    cy.get(".todo-list li").then((items) => {
      const texts = [...items].map((item) => item.innerText.trim());
      console.log("Textos capturados:", texts);
      expect(texts).to.deep.equal([task3, task2, task1]);
    });

    cy.contains(task1)
      .should("have.class", "line-through")
      .and("have.css", "text-decoration-line", "line-through");

    cy.contains(task2)
      .should("not.have.class", "line-through")
      .and("have.css", "text-decoration-line", "none");

    cy.contains(task3)
      .should("not.have.class", "line-through")
      .and("have.css", "text-decoration-line", "none");
  });

  it("should remove a unique task", () => {
    const task = "Tarefa errada";

    cy.get('input[placeholder="Descreva sua tarefa"]').type(task);
    cy.contains("Adicionar").click();
    cy.get("input[placeholder='Descreva sua tarefa']").should("be.empty");
    cy.wait(500);

    cy.contains(task)
      .parent()
      .parent()
      .find('[aria-label="Deletar Tarefa"]')
      .click();

    cy.contains(task).should("not.exist");
    cy.wait(500);
    cy.contains("Nenhuma tarefa adicionada ainda!").should("be.visible");
  });

  it("should remove task and keep others", () => {
    const taskWrong = "Tarefa errada";
    const taskCorrect = "Tarefa correta";

    [taskCorrect, taskWrong].forEach((task) => {
      cy.get('input[placeholder="Descreva sua tarefa"]').type(task);
      cy.contains("Adicionar").click();
      cy.get("input[placeholder='Descreva sua tarefa']").should("be.empty");
      cy.wait(500);
    });

    cy.contains(taskWrong)
      .parent()
      .parent()
      .find('[aria-label="Deletar Tarefa"]')
      .click();

    cy.contains(taskWrong).should("not.exist");
    cy.wait(500);

    cy.get(".todo-list li")
      .should("have.length", 1)
      .first()
      .should("contain.text", taskCorrect);
  });

  it("Should keep tasks after reload", () => {
    const task = "Aprender Cypress";

    cy.get('input[placeholder="Descreva sua tarefa"]').type(task);
    cy.contains("Adicionar").click();
    cy.wait(500);

    cy.reload();
    cy.wait(500);

    cy.contains(task).should("exist");
  });
});
});
