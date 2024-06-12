import React from "react";
import { render } from "@testing-library/react";
import { StreamingCard } from "@components/common/StreamingCard";

test("renders StreamingCard component", () => {
  const props = {
    title: "Test Streaming",
    type: "Action",
    rate: 5,
    imageUrl: "/default-movie-portrait.jpg",
  };
  const { getByText } = render(<StreamingCard {...props} />);
  expect(getByText("Test Streaming")).toBeInTheDocument();
});
