import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { StreamingCard } from "@components/common/StreamingCard";

// Mock do componente Image do Next.js
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ ...props }: any) => {
    // Remova propriedades não DOM diretamente se necessário
    const { blurDataURL, placeholder, fetchPriority, ...rest } = props;
    return <img {...rest} />;
  },
}));

describe("StreamingCard component", () => {
  test("renders with minimal props", () => {
    const props = {
      title: "Test Streaming",
      type: "Action",
      rate: 5,
      imageUrl: "/default-movie-portrait.jpg",
    };
    const { getByText } = render(<StreamingCard {...props} />);
    expect(getByText("Test Streaming")).toBeInTheDocument();
    expect(getByText("Action")).toBeInTheDocument();
  });

  test("renders with low rate", () => {
    const props = {
      title: "Low Rate Movie",
      type: "Drama",
      rate: 2,
      imageUrl: "/default-movie-portrait.jpg",
    };
    const { getByText, getAllByTestId } = render(<StreamingCard {...props} />);
    expect(getByText("Low Rate Movie")).toBeInTheDocument();
    expect(getByText("Drama")).toBeInTheDocument();
    const stars = getAllByTestId("star");
    expect(stars.length).toBe(5);
    expect(stars[0]).toHaveClass("text-yellow");
    expect(stars[1]).toHaveClass("text-yellow");
    expect(stars[2]).not.toHaveClass("text-yellow");
    expect(stars[3]).not.toHaveClass("text-yellow");
    expect(stars[4]).not.toHaveClass("text-yellow");
  });

  test("renders with high rate", () => {
    const props = {
      title: "High Rate Movie",
      type: "Comedy",
      rate: 4,
      imageUrl: "/default-movie-portrait.jpg",
    };
    const { getByText, getAllByTestId } = render(<StreamingCard {...props} />);
    expect(getByText("High Rate Movie")).toBeInTheDocument();
    expect(getByText("Comedy")).toBeInTheDocument();
    const stars = getAllByTestId("star");
    expect(stars.length).toBe(5);
    expect(stars[0]).toHaveClass("text-yellow");
    expect(stars[1]).toHaveClass("text-yellow");
    expect(stars[2]).toHaveClass("text-yellow");
    expect(stars[3]).toHaveClass("text-yellow");
    expect(stars[4]).not.toHaveClass("text-yellow");
  });

  test("renders the skeleton when no imageUrl is provided", () => {
    const props = {
      title: "Test Movie",
      type: "Action",
      rate: 3,
      imageUrl: "",
    };

    const { getByTestId } = render(<StreamingCard {...props} />);

    const skeleton = getByTestId("progress_bar");
    expect(skeleton).toBeInTheDocument();
  });

  test("renders the image correctly", () => {
    const props = {
      title: "Test Movie",
      type: "Action",
      rate: 3,
      imageUrl: "/test-image.jpg",
    };

    const { getByTestId } = render(<StreamingCard {...props} />);

    const image = getByTestId("image_movie");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", props.imageUrl);
  });

  test("loads fallback image on error", () => {
    const props = {
      title: "Invalid Image Movie",
      type: "Horror",
      rate: 1,
      imageUrl: "/invalid-image.jpg",
    };

    const { getByTestId } = render(<StreamingCard {...props} />);

    const image = getByTestId("image_movie");
    expect(image).toBeInTheDocument();

    // Simulando erro na carga da imagem
    fireEvent.error(image);
    expect(image).toHaveAttribute("src", "/default-movie-portrait.jpg");
  });
});
