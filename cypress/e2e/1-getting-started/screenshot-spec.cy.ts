const fs = require('fs-extra');
const path = require('path');

/// <reference types="cypress" />
const screenSizes = ['macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6+', 'iphone-se2'];

describe(`Home Page e2e tests snapshots`, () => {
  //toDo: implements after each clear storage sreenshots
  
  screenSizes.forEach((size) => {
    it(`should render correctly on ${size}`, () => {
      cy.viewport(size as any);
      cy.visit('http://localhost:5173/');
      cy.screenshot(`home-page-${size}`);
    });
  });
})