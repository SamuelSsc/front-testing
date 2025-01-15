// describe("Visual regression testing", () => {
//     beforeEach(() => {
//       cy.viewport("macbook-15"); // Ajuste o tamanho da tela, se necessário.
//       cy.visit("http://localhost:5173/");
//     });
  
//     it("should match the home page layout snapshot", () => {
//       cy.document().toMatchImageSnapshot(); // Captura a página inteira.
//     });
  
//     it("should match the header snapshot", () => {
//       cy.get("header").toMatchImageSnapshot(); // Captura apenas o cabeçalho.
//     });
  
//     it("should match the task list snapshot", () => {
//       // Adiciona uma tarefa para garantir que o estado seja consistente.
//       cy.get('input[placeholder="Descreva sua tarefa"]').type("Nova tarefa visual");
//       cy.contains("Adicionar").click();
//       cy.wait(500);
  
//       // Captura o estado da lista de tarefas.
//       cy.get(".todo-list").toMatchImageSnapshot();
//     });
//   });
  