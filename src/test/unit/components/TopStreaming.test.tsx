import React from "react";
import { fireEvent, waitFor, render, act } from "@testing-library/react";
import { TopStreaming } from "@components/common/TopStreaming";

// Mock do componente Image do Next.js
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ ...props }: any) => {
    // Remova propriedades não DOM diretamente se necessário
    const { blurDataURL, placeholder, fetchPriority, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...rest} />;
  },
}));

describe("TopStreaming Component", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("renders TopStreaming component", () => {
    const { getByText } = render(<TopStreaming />);
    expect(getByText("Series")).toBeInTheDocument();
    expect(getByText("Filmes")).toBeInTheDocument();
    expect(getByText("Animes")).toBeInTheDocument();
  });

  test("shows skeletons array during loading", () => {
    const { getByTestId } = render(<TopStreaming />);
    expect(getByTestId("skeletons-array")).toBeInTheDocument();
  });

  test("changes typeStreaming when buttons are clicked", async () => {
    const { getByText, getAllByText } = render(<TopStreaming />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    fireEvent.click(getByText("Filmes"));
    await waitFor(() =>
      expect(getAllByText("Random Title").length).toBeGreaterThan(0),
    );
    fireEvent.click(getByText("Animes"));
    await waitFor(() =>
      expect(getAllByText("Random Title").length).toBeGreaterThan(0),
    );
    fireEvent.click(getByText("Series"));
    await waitFor(() =>
      expect(getAllByText("Random Title").length).toBeGreaterThan(0),
    );
  });

  test("renders random image and title after loading", async () => {
    const { getAllByText, getAllByAltText } = render(<TopStreaming />);
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await waitFor(() =>
      expect(
        getAllByAltText("Capa do filme Random Title").length,
      ).toBeGreaterThan(0),
    );
    expect(getAllByText("Random Title").length).toBeGreaterThan(0);
  });
  test("renders the correct type of streaming on button click", async () => {
    const { getByText } = render(<TopStreaming />);

    const seriesButton = getByText("Series");
    const moviesButton = getByText("Filmes");
    const animesButton = getByText("Animes");

    // Verifica o botão ativo inicialmente (series)
    expect(seriesButton).toHaveClass("font-bold");
    expect(moviesButton).not.toHaveClass("font-bold");
    expect(animesButton).not.toHaveClass("font-bold");

    // Clica no botão de Filmes e verifica a mudança
    fireEvent.click(moviesButton);
    await waitFor(() => expect(moviesButton).toHaveClass("font-bold"));

    // Clica no botão de Animes e verifica a mudança
    fireEvent.click(animesButton);
    await waitFor(() => expect(animesButton).toHaveClass("font-bold"));
  });
});
