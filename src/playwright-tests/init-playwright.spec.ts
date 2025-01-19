import { test, expect } from '@playwright/test';

test.describe('Home Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
  });

  test('should add a new task', async ({ page }) => {
    const newTask = 'Nova tarefa';

    await page.fill('input[placeholder="Descreva sua tarefa"]', newTask);
    await page.click('text=Adicionar');

    await expect(page.locator('input[placeholder="Descreva sua tarefa"]')).toHaveValue('');
    await page.waitForTimeout(500);

    const tasks = page.locator('.todo-list li');
    await expect(tasks).toHaveCount(1);
    await expect(tasks.first()).toHaveText(newTask);
  });

  test('should have no tasks', async ({ page }) => {
    const noTasksMessage = page.locator('text=Nenhuma tarefa adicionada ainda!');
    await expect(noTasksMessage).toBeVisible();
  });

  test('should mark a task as completed and reorder', async ({ page }) => {
    const task1 = 'Tarefa para ser concluída';
    const task2 = 'Outra Tarefa 1';
    const task3 = 'Outra Tarefa 2';

    for (const task of [task2, task3, task1]) {
      await page.fill('input[placeholder="Descreva sua tarefa"]', task);
      await page.click('text=Adicionar');
      await expect(page.locator('input[placeholder="Descreva sua tarefa"]')).toHaveValue('');
      await page.waitForTimeout(500);
    }

    const task1Checkbox = page.locator(`.todo-list li:has-text("${task1}") input[type="checkbox"]`);

    await task1Checkbox.waitFor({ state: 'attached' });
    await task1Checkbox.check();
    await page.waitForTimeout(500);

    const tasks = page.locator('.todo-list li');
    const taskTexts = await tasks.allTextContents();
    expect(taskTexts).toEqual([task3, task2, task1]);

    await expect(page.locator(`text=${task1}`)).toHaveClass(/line-through/);
    await expect(page.locator(`text=${task2}`)).not.toHaveClass(/line-through/);
    await expect(page.locator(`text=${task3}`)).not.toHaveClass(/line-through/);
  });

  test('should remove a unique task', async ({ page }) => {
    const task = 'Tarefa errada';

    await page.fill('input[placeholder="Descreva sua tarefa"]', task);
    await page.click('text=Adicionar');
    await expect(page.locator('input[placeholder="Descreva sua tarefa"]')).toHaveValue('');
    await page.waitForTimeout(500);

    await page.locator(`.todo-list li:has-text("${task}")`).locator('[aria-label="Deletar Tarefa"]').click();

    await expect(page.locator(`text=${task}`)).not.toBeVisible();
    await page.waitForTimeout(500);

    const noTasksMessage = page.locator('text=Nenhuma tarefa adicionada ainda!');
    await expect(noTasksMessage).toBeVisible();
  });

  test('should remove task and keep others', async ({ page }) => {
    const taskWrong = 'Tarefa errada';
    const taskCorrect = 'Tarefa correta';

    for (const task of [taskCorrect, taskWrong]) {
      await page.fill('input[placeholder="Descreva sua tarefa"]', task);
      await page.click('text=Adicionar');
      await expect(page.locator('input[placeholder="Descreva sua tarefa"]')).toHaveValue('');
      await page.waitForTimeout(500);
    }

    await page.locator(`.todo-list li:has-text("${taskWrong}")`).locator('[aria-label="Deletar Tarefa"]').click();

    await expect(page.locator(`.todo-list li:has-text("${taskWrong}")`)).not.toBeVisible();
    await page.waitForTimeout(500);

    const tasks = page.locator('.todo-list li');
    await expect(tasks).toHaveCount(1);
    await expect(tasks.first()).toHaveText(taskCorrect);
  });

  test('should keep tasks after reload', async ({ page }) => {
    const task = 'Aprender Cypress';

    await page.fill('input[placeholder="Descreva sua tarefa"]', task);
    await page.click('text=Adicionar');
    await page.waitForTimeout(500);

    await page.reload();
    await page.waitForTimeout(500);

    await expect(page.locator(`text=${task}`)).toBeVisible();
  });
});
