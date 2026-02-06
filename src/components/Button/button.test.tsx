import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./index";

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeDefined();
    expect(button.tagName).toBe("BUTTON");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole("button");
    expect(button.className).toContain("bg-primary-500");

    rerender(<Button variant="success">Success</Button>);
    button = screen.getByRole("button");
    expect(button.className).toContain("bg-success-500");

    rerender(<Button variant="danger">Danger</Button>);
    button = screen.getByRole("button");
    expect(button.className).toContain("bg-danger-500");

    // Note: Using 'warning' to match the type definition in types.ts
    rerender(<Button variant="warning">Warning</Button>);
    button = screen.getByRole("button");
    expect(button.className).toContain("bg-warning-500");
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByRole("button");
    expect(button.className).toContain("px-4");
    expect(button.className).toContain("py-2");

    rerender(<Button size="medium">Medium</Button>);
    button = screen.getByRole("button");
    expect(button.className).toContain("px-6");
    expect(button.className).toContain("py-3");

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole("button");
    expect(button.className).toContain("px-8");
    expect(button.className).toContain("py-4");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    const button = screen.getByRole("button") as HTMLButtonElement;
    expect(button.disabled).toBe(true);

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("merges custom className", () => {
    render(<Button className="custom-test-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("custom-test-class");
  });
});
