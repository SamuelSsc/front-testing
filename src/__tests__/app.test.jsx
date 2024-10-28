import React from "react";

import { render, screen } from "@testing-library/react";
import App from "../App";

describe("renders hello world text", () => {
  it("should render hello world", () => {
    render(<App />);

    const textElement = screen.getByText(/Hello World/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should pass", () => {
    render(<App />);
    expect(1).toBe(1);
  });
});
