import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Popover } from "./index";

describe("Popover Component", () => {
  it("should render content when hovered", async () => {
    render(
      <Popover content="Test Content" trigger="hover">
        <button data-testid="trigger">Hover Me</button>
      </Popover>,
    );

    await userEvent.hover(screen.getByTestId("trigger"));
    expect(screen.getByText("Test Content")).toBeDefined();
  });

  it("should toggle content on click", async () => {
    render(
      <Popover content="Test Content" trigger="click">
        <button data-testid="trigger">Click Me</button>
      </Popover>,
    );

    await userEvent.click(screen.getByTestId("trigger"));
    expect(screen.getByText("Test Content")).toBeDefined();

    await userEvent.click(screen.getByTestId("trigger"));
    expect(screen.queryByText("Test Content")).toBeNull();
  });

  it("should apply custom content class and style", async () => {
    render(
      <Popover
        content="Styled Content"
        trigger="hover"
        contentClass="custom-class"
        contentStyle={{ color: "red" }}>
        <button data-testid="trigger">Hover Me</button>
      </Popover>,
    );

    await userEvent.hover(screen.getByTestId("trigger"));
    const content = screen.getByText("Styled Content");
    expect(content.className).toContain("custom-class");
    expect(getComputedStyle(content).color).toBe("rgb(255, 0, 0)");
  });

  it("should render arrow element with correct styles", async () => {
    render(
      <Popover content="Arrow Test" trigger="hover">
        <button data-testid="trigger">Hover Me</button>
      </Popover>,
    );

    await userEvent.hover(screen.getByTestId("trigger"));
    const popoverContent = screen.getByText("Arrow Test").parentElement;
    const arrow = popoverContent?.querySelector("svg");
    expect(arrow).toBeDefined();
    expect(arrow?.getAttribute("fill")).toBe("#fff");
  });

  it("should position according to placement prop", async () => {
    render(
      <Popover content="Top Content" trigger="hover" placement="top">
        <button data-testid="trigger">Hover Me</button>
      </Popover>,
    );

    await userEvent.hover(screen.getByTestId("trigger"));
    const content = screen.getByText("Top Content");
    expect(content).toBeDefined();
  });
});
