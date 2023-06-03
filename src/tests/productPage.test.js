import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Product } from "../components/ProductPage";
import ProductPage from "../components/ProductPage";
import Header from "../components/header";
import getHalfSleeveCutTShirt from "../components/products/halfSleeveTShirts/productsData";
import { act } from "react-dom/test-utils";

const setup = () => {
  const { container } = render(
    <MemoryRouter
      initialEntries={[
        "/half-sleeve-cut-and-sew-solid/product/half-sleeve-cut-and-sew-solid-pattern-15",
      ]}
    >
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
            </div>
          }
        >
          <Route
            path="/half-sleeve-cut-and-sew-solid/product"
            element={<Product />}
          >
            <Route
              path=":name"
              element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
            />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
  return { container };
};

window.scrollTo = jest.fn();

test("Product page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});

describe("item counter", () => {
  test("increment and decrement", async () => {
    setup();

    const inputField = screen.getByDisplayValue("1");
    const decrementBtn = screen.getByRole("button", { name: "-" });
    const incrementBtn = screen.getByRole("button", { name: "+" });

    const user = userEvent.setup();
    
    await act(async () => {
      await user.click(incrementBtn);
    });
    await act(async () => {
      await user.click(incrementBtn);
    });
    await act(async () => {
      await user.click(incrementBtn);
    });
    await act(async () => {
      await user.click(decrementBtn);
    });

    expect(inputField.value).toBe("3");
  });
});

describe("product option buttons", () => {
  test("clicking product option buttons make them active", async () => {
    setup();
    const user = userEvent.setup();

    const cleanFabricBtn = screen.getByRole("button", {
      name: "COMBED COTTON",
    });
    await act(async () => {
      await user.click(cleanFabricBtn);
    });

    const cleanSizeBtn = screen.getByRole("button", {
      name: "M",
    });
    await act(async () => {
      await user.click(cleanSizeBtn);
    });

    const clickedFabricBtn = screen.getByRole("button", {
      name: "COMBED COTTON",
    });
    const clickedSizeBtn = screen.getByRole("button", {
      name: "M",
    });

    expect(clickedFabricBtn).toHaveClass("active");
    expect(clickedSizeBtn).toHaveClass("active");
  });

  test("double clicking fabric button makes it deactive", async () => {
    setup();
    const user = userEvent.setup();

    const cleanFabricBtn = screen.getByRole("button", {
      name: "COMBED COTTON",
    });
    await act(async () => {
      await user.click(cleanFabricBtn);
    });
    const clickedFabricBtn = screen.getByRole("button", {
      name: "COMBED COTTON",
    });
    await act(async () => {
      await user.click(clickedFabricBtn);
    });

    const cleanSizeBtn = screen.getByRole("button", {
      name: "M",
    });
    await act(async () => {
      await user.click(cleanSizeBtn);
    });
    const clickedSizeBtn = screen.getByRole("button", {
      name: "M",
    });
    await act(async () => {
      await user.click(clickedSizeBtn);
    });

    const doubleClickedFabricBtn = screen.getByRole("button", {
      name: "COMBED COTTON",
    });
    const doubleClickedSizeBtn = screen.getByRole("button", {
      name: "M",
    });

    expect(doubleClickedFabricBtn).not.toHaveClass("active");
    expect(doubleClickedSizeBtn).not.toHaveClass("active");
  });

  test("clicking a size button makes it active and other size buttons deactive", async () => {
    setup();
    const user = userEvent.setup();

    const sizeBtn1 = screen.getByRole("button", { name: "M" });
    await act(async () => {
      await user.click(sizeBtn1);
    });

    const sizeBtn2 = screen.getByRole("button", { name: "M" });
    await act(async () => {
      await user.click(sizeBtn2);
    });

    expect(sizeBtn1).not.toHaveClass("active");
    expect(sizeBtn2).toHaveClass("active");
  });

  describe('clicking "add to cart" button', () => {
    beforeEach(() => {
      window.alert = jest.fn();
      setup();
    });

    test("not selecting size gives alert message", async () => {
      const user = userEvent.setup();

      const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
      await act(async () => {
        await user.click(fabricBtn);
      });
      const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
      await user.click(addToCartBtn);

      expect(window.alert).toHaveBeenCalledTimes(1);
    });

    test("not selecting fabric gives alert message", async () => {
      const user = userEvent.setup();

      const sizeBtn = screen.getByRole("button", { name: "M" });
      await act(async () => {
        await user.click(sizeBtn);
      });
      const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
      await user.click(addToCartBtn);

      expect(window.alert).toHaveBeenCalledTimes(1);
    });
  });
});

describe("description and additional info", () => {
  test('additional info is shown when "additional info" button is clicked', async () => {
    setup();
    const user = userEvent.setup();

    const additionalInfoBtn = screen.getByRole("button", {
      name: "Additional Information",
    });
    await act(async () => {
      await user.click(additionalInfoBtn);
    });

    const additionalInfoTables = screen.getAllByRole("table");
    expect(additionalInfoTables.length).toBe(1);

    const tableData1 = screen.getByRole("cell", { name: "0.13kg" });
    expect(tableData1).toBeInTheDocument();

    const tableData2 = screen.getByRole("cell", { name: "COMBED COTTON" });
    expect(tableData2).toBeInTheDocument();

    const tableData3 = screen.getByRole("cell", { name: "M, L, XL, XXL" });
    expect(tableData3).toBeInTheDocument();
  });

  test("description is shown when description tab is clicked", async () => {
    setup();

    const additionalInfoBtn = screen.getByRole("button", {
      name: "Additional Information",
    });
    const descriptionBtn = screen.getByRole("button", {
      name: "Description",
    });

    const user = userEvent.setup();
    await act(async () => {
      await user.click(additionalInfoBtn);
      await user.click(descriptionBtn);
    });

    const para = screen.getByText("Size Measurement (in inch/centimeter):");

    expect(para).toBeInTheDocument();

    const listItem1 = screen.getByText(
      "M(Medium): Chest 39.37″ inch/ 100 cm, Height 27.55″ inch/ 70 cm"
    );
    const listItem2 = screen.getByText(
      "L(large) : Chest 40.94″inch/ 104 cm, Height 28.34″inch/ 72 cm"
    );
    const listItem3 = screen.getByText(
      "XL(Extra large): Chest 42.51″ inch/ 108 cm, Height 29.13″ inch/ 74 cm"
    );
    const listItem4 = screen.getByText(
      "XXL(Extra large) : Chest 44.09″ inch/ 112 cm, Height 29.92″ inch/ 76 cm"
    );

    expect(listItem1).toBeInTheDocument();
    expect(listItem2).toBeInTheDocument();
    expect(listItem3).toBeInTheDocument();
    expect(listItem4).toBeInTheDocument();
  });
});
