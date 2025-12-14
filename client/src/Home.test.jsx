import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import About from "./about";

describe("About Component", () => {


    test("renders heading with 'About Me' text", () => {
        render(<About />);
        const typographyElement = screen.getByText("About Me");
        expect(typographyElement).toBeInTheDocument();
    });

  test("renders image with alt text 'Headshot'", () => {
    render(<About />);
    const img = screen.getByAltText("Headshot");
    expect(img).toBeInTheDocument();
  });


  test("renders the user's name", () => {
    render(<About />);
    const nameEl = screen.getByText("Alex Joseph");
    expect(nameEl).toBeInTheDocument();
  });
});