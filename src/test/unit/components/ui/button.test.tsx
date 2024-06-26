import React from "react";
import { render, screen } from "@testing-library/react";
import { Button } from "@components/ui/button";

describe("Button component", () => {
  test("renders with default variant and size", () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole("button", { name: /default button/i });
    expect(button).toHaveClass(
      "bg-primary text-primary-foreground h-10 px-4 py-2",
    );
  });

  test("renders with destructive variant", () => {
    render(<Button variant="destructive">Destructive Button</Button>);
    const button = screen.getByRole("button", { name: /destructive button/i });
    expect(button).toHaveClass("bg-destructive text-destructive-foreground");
  });

  test("renders with outline variant", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass(
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    );
  });

  test("renders with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole("button", { name: /secondary button/i });
    expect(button).toHaveClass("bg-secondary text-secondary-foreground");
  });

  test("renders with ghost variant", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole("button", { name: /ghost button/i });
    expect(button).toHaveClass("hover:bg-accent hover:text-accent-foreground");
  });

  test("renders with link variant", () => {
    render(<Button variant="link">Link Button</Button>);
    const button = screen.getByRole("button", { name: /link button/i });
    expect(button).toHaveClass(
      "text-primary underline-offset-4 hover:underline",
    );
  });

  test("renders with different sizes", () => {
    render(<Button size="sm">Small Button</Button>);
    const buttonSm = screen.getByRole("button", { name: /small button/i });
    expect(buttonSm).toHaveClass("h-9 rounded-md px-3");

    render(<Button size="lg">Large Button</Button>);
    const buttonLg = screen.getByRole("button", { name: /large button/i });
    expect(buttonLg).toHaveClass("h-11 rounded-md px-8");

    render(<Button size="icon">Icon Button</Button>);
    const buttonIcon = screen.getByRole("button", { name: /icon button/i });
    expect(buttonIcon).toHaveClass("h-10 w-10");
  });

  test("renders as a different component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="#">Child Button</a>
      </Button>,
    );
    const button = screen.getByRole("link", { name: /child button/i });
    expect(button).toBeInTheDocument();
  });
});
