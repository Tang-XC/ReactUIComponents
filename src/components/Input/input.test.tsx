import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Input } from "./index";

describe("Input Component", () => {
  it("should render without crashing", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  describe("Disabled prop of Input", () => {
    it("wehn the disabled prop is set to true", () => {
      render(<Input disabled />);
      const container = screen.getByRole("textbox").closest(".form-control");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("pointer-events-none");
      expect(container).toHaveClass("opacity-50");
      expect(container).toHaveClass("bg-disabled");
    });
  });
  describe("Size prop of Input", () => {
    const sizeClasses = {
      small: "py-0 text-sm",
      default: "py-1 text-md",
      large: "py-1.5 text-lg",
    };
    it.each([
      ["small", sizeClasses.small],
      ["default", sizeClasses.default],
      ["large", sizeClasses.large],
    ])('when the size prop is set to "%s"', (size, expectedClass) => {
      render(<Input size={size as any} />);
      const container = screen.getByRole("textbox").closest(".form-control");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(expectedClass);
    });
  });
  describe("clearable prop of Input", () => {
    it("should render a clear button", () => {
      const { container } = render(<Input clearable value={"test"} />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
    it("should clear the input value when the clear button is clicked", async () => {
      const { container } = render(<Input defaultValue="000" clearable />);
      const clearBtn = container.querySelector("svg")?.parentElement;
      expect(clearBtn).toBeInTheDocument();
      await userEvent.click(clearBtn as HTMLElement);
      expect(screen.getByRole("textbox")).toHaveValue("");
    });
  });
});
