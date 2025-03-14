import { render, screen, waitFor } from "@testing-library/react";
import Home from "@app/(home)/page";
import React from "react";

let mockedRecommendedList: jest.Mock = jest.fn();
// Definindo os mocks dos componentes antes dos testes
jest.mock("@components/Recommended/RecommendedList", () => ({
  Recommended: () => mockedRecommendedList(),
}));

jest.mock("@components/common/Categories", () => ({
  Categories: () => <div>Mocked Categories</div>,
}));

jest.mock("@components/common/TopStreaming", () => ({
  TopStreaming: () => <div>Mocked Top Streaming</div>,
}));

jest.mock("@components/common/SkeletonsArray", () => ({
  SkeletonsArray: () => <div>Loading...</div>,
}));

describe("Home component", () => {
  beforeEach(() => {
    mockedRecommendedList.mockImplementation(() => (
      <div>Mocked Recommended List</div>
    ));
  });

  it("Should render the main sections", async () => {
    render(<Home />);

    // Verificar se o TopStreaming foi renderizado imediatamente
    expect(screen.getByText("Mocked Top Streaming")).toBeInTheDocument();
    // Esperar que os componentes suspensos (Recommended e Categories) sejam carregados
    await waitFor(() => {
      expect(screen.getByText("Mocked Recommended List")).toBeInTheDocument();
      expect(screen.getByText("Mocked Categories")).toBeInTheDocument();
    });

    // Verificar se os títulos "Recomendados para..." e "Categorias" estão presentes
    expect(
      screen.getByText("Recomendados para", { exact: false }),
    ).toBeInTheDocument();
    expect(screen.getByText("Categorias")).toBeInTheDocument();
  });
});
