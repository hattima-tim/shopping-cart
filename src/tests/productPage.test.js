import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Product } from "../components/products/productPage";
import ProductPage from "../components/products/productPage";
import Header from "../components/header";

const setup = () => {
  const { container } = render(
    <MemoryRouter
      initialEntries={["/product/half-sleeve-cut-and-sew-solid-pattern-15"]}
    >
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="product" element={<Product />}>
            <Route path=":name" element={<ProductPage />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
  return { container };
};

test("Product page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});

describe("item counter", () => {
  test("increment and decrement", () => {
    setup();

    const inputField = screen.getByDisplayValue("1");
    const decrementBtn = screen.getByRole("button", { name: "-" });
    const incrementBtn = screen.getByRole("button", { name: "+" });

    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);

    userEvent.click(decrementBtn);

    expect(inputField.value).toBe("3");
  });

  test("user can type in input field", () => {
    setup();

    const inputField = screen.getByDisplayValue("1");

    userEvent.clear(inputField);
    userEvent.type(inputField, "56");
    expect(inputField.value).toBe("56");
  });
});

describe("description and additional info", () => {
  test('additional info is shown when "additional info" button is clicked', () => {
    setup();
    const additionalInfoBtn = screen.getByRole("button", {
      name: "Additional Information",
    });
    userEvent.click(additionalInfoBtn);

    const additionalInfoTables = screen.getAllByRole("table");
    expect(additionalInfoTables.length).toBe(1);

    const tableData1 = screen.getByRole("cell", { name: "0.13kg" });
    expect(tableData1).toBeInTheDocument();

    const tableData2 = screen.getByRole("cell", { name: "COMBED COTTON" });
    expect(tableData2).toBeInTheDocument();

    const tableData3 = screen.getByRole("cell", { name: "M, L, XL, XXL" });
    expect(tableData3).toBeInTheDocument();
  });

  test("description is shown when description tab is clicked", () => {
    setup();

    const additionalInfoBtn = screen.getByRole("button", {
      name: "Additional Information",
    });
    const descriptionBtn = screen.getByRole("button", {
      name: "Description",
    });

    userEvent.click(additionalInfoBtn);
    userEvent.click(descriptionBtn);

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
