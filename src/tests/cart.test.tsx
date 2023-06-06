import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "../components/ProductPage";
import Cart from "../components/cart";
import getHalfSleeveCutTShirt from "../components/products/halfSleeveTShirts/productsData";
import { Provider } from "react-redux";
import store from "../app/store";

const setupRoute = () => {
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          "/half-sleeve-cut-and-sew-solid/product/half-sleeve-cut-and-sew-solid-pattern-15",
        ]}
      >
        <Header />
        <Routes>
          <Route
            path="/half-sleeve-cut-and-sew-solid/product/:name"
            element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
          />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

window.scrollTo = jest.fn();

describe("product table", () => {
  beforeEach(async () => {
    const user = userEvent.setup();

    setupRoute();

    // we are on product page now
    const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
    await act(async () => {
      await user.click(fabricBtn);
    });

    const sizeBtn = screen.getByRole("button", { name: "M" });
    await act(async () => {
      await user.click(sizeBtn);
    });

    const quantityBtn = screen.getByRole("button", { name: "+" });
    await act(async () => {
      await user.click(quantityBtn);
    });

    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await act(async () => {
      await user.click(addToCartBtn);
    });

    const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
    await act(async () => {
      await user.click(viewCartBtn);
    });
    // we are on cart page now
  });

  afterEach(async () => {
    const user = userEvent.setup();
    const removeProductBtns = screen.queryAllByTestId(
      "productTableRemoveProductBtn"
    );
    for (let i = 0; i < removeProductBtns.length; i++) {
      await act(async () => {
        await user.click(removeProductBtns[i]);
      });
    }
    // this operation is necessary to remove product from local storage
  });

  afterAll(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("table header is in the document", async () => {
    const productTableHeaders = screen.getAllByRole("columnheader");
    const headersValueList = ["Product", "Price", "Quantity", "Subtotal"];

    productTableHeaders.forEach((header, index) => {
      expect(header).toBeInTheDocument();
      expect(header.textContent).toEqual(headersValueList[index]);
    });
  });

  test("product image is available", async () => {
    const productImage = screen.getByTestId("productTableProductImage");
    expect(productImage).toBeInTheDocument();
  });

  test("clicking product remove button shows a success banner", async () => {
    const user = userEvent.setup();

    const successBannerBeforeBtnClick = screen.queryByText(
      "Half Sleeve Cut and Sew Solid(pattern 15) removed."
    );
    expect(successBannerBeforeBtnClick).not.toBeInTheDocument();

    const removeProductBtn = screen.getByTestId("productTableRemoveProductBtn");
    await act(async () => {
      await user.click(removeProductBtn);
    });

    const successBannerAfterBtnClick = screen.getByText(
      "Half Sleeve Cut and Sew Solid(pattern 15) removed."
    );
    expect(successBannerAfterBtnClick).toBeInTheDocument();
  });

  test("clicking undo button returns removed product", async () => {
    const user = userEvent.setup();

    const undoBtnBeforeRemoveBtnClick = screen.queryByText("Undo?");
    expect(undoBtnBeforeRemoveBtnClick).not.toBeInTheDocument();

    const productNameBeforeRemoveBtnClick = screen.getByRole("link", {
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
    });
    expect(productNameBeforeRemoveBtnClick).toBeInTheDocument();

    const removeProductBtn = screen.getByTestId("productTableRemoveProductBtn");
    await act(async () => {
      await user.click(removeProductBtn);
    });

    const productNameAfterRemoveBtnClick = screen.queryByRole("link", {
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
    });
    expect(productNameAfterRemoveBtnClick).not.toBeInTheDocument();

    const undoBtn = screen.getByText("Undo?");
    await act(async () => {
      await user.click(undoBtn);
    });

    const productNameAfterUndoClick = screen.getByRole("link", {
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
    });
    expect(productNameAfterUndoClick).toBeInTheDocument();
  });

  describe("variation", () => {
    test("fabric data is available", async () => {
      const dataTermsInTable = screen.getAllByRole("term");
      const fabricTerm = dataTermsInTable[0];
      expect(fabricTerm.textContent).toBe("FABRIC: ");

      const dataDefinitionsInTable = screen.getAllByRole("definition");
      const fabricDefinition = dataDefinitionsInTable[0];
      expect(fabricDefinition.textContent).toBe("COMBED COTTON");
    });

    test("size data is available", async () => {
      const dataTermsInTable = screen.getAllByRole("term");
      const sizeTerm = dataTermsInTable[1];
      expect(sizeTerm.textContent).toBe("SIZE: ");

      const dataDefinitionsInTable = screen.getAllByRole("definition");
      const sizeDefinition = dataDefinitionsInTable[1];
      expect(sizeDefinition.textContent).toBe("M");
    });

    test("quantity x price is available on small screens", async () => {
      const dataDefinitionsInTable = screen.getAllByRole("definition");
      const quantityXpriceDefinition = dataDefinitionsInTable[2];

      expect(quantityXpriceDefinition.textContent).toBe("2x৳450.00");
      expect(quantityXpriceDefinition).toHaveClass("md:hidden");
    });
  });

  test("product price column is available on large screens", () => {
    const productPriceColumn = screen.getByRole("columnheader", {
      name: "Price",
    });
    expect(productPriceColumn).toHaveClass("hidden md:table-cell");
  });

  test("product price cell is available on large screens", () => {
    const productPriceCell = screen.getByRole("cell", { name: "৳450.00" });
    expect(productPriceCell).toHaveClass("hidden md:table-cell");
  });
  // above I am not using toBeVisible for testing because
  // it is not working for unknown reason
  // I tried many things to get it working
  // but it is not working, so I decided to move on without it

  describe("update cart button", () => {
    afterEach(async () => {
      const user = userEvent.setup();
      const removeProductBtns = screen.getAllByTestId(
        "productTableRemoveProductBtn"
      );
      for (let i = 0; i < removeProductBtns.length; i++) {
        await act(async () => {
          await user.click(removeProductBtns[i]);
        });
      }
      // this operation is necessary to remove product from local storage
    });

    test("product quantity change, changes Subtotal price on update cart btn click", async () => {
      const user = userEvent.setup();

      // beforeEach function puts a product
      // in the cart with a quantity of 2 . So subTotal
      // for that product is ৳450 + ৳450 =৳900
      const subtotalPrice = screen.getByRole("cell", { name: "৳900" });
      expect(subtotalPrice).toBeInTheDocument();

      const quantityBtn = screen.getByRole("button", { name: "+" });
      await act(async () => {
        await user.click(quantityBtn); // increase quantity to 3
      });

      const updateCartBtn = screen.getByRole("button", { name: "Update Cart" });
      await act(async () => {
        await user.click(updateCartBtn);
      });

      const updatedSubtotalPrice = screen.getByRole("cell", { name: "৳1350" });

      expect(updatedSubtotalPrice).toBeInTheDocument();
      expect(subtotalPrice).not.toBeInTheDocument();
    });

    test("main price remains same on quantity change", async () => {
      const user = userEvent.setup();

      // right now only one cell has value ৳450, which is main price
      // so...
      const mainPrice = screen.getByRole("cell", { name: "৳450.00" });
      expect(mainPrice).toBeInTheDocument();

      const quantityBtn = screen.getByRole("button", { name: "+" });
      await act(async () => {
        await user.click(quantityBtn);
      });

      const updateCartBtn = screen.getByRole("button", { name: "Update Cart" });
      await act(async () => {
        await user.click(updateCartBtn);
      });

      const updatedMainPrice = screen.getByRole("cell", { name: "৳450.00" });

      expect(updatedMainPrice).toBeInTheDocument();
      // not asserting about main price because it is not
      // available. Maybe because of rerender caused by state update
    });

    test("changed quantity remains changed after updateBtn click", async () => {
      const user = userEvent.setup();

      const quantityBtn = screen.getByRole("button", { name: "+" });
      await act(async () => {
        await user.click(quantityBtn); // quantity 3, beforeEach adds 2
      });

      const updateCartBtn = screen.getByRole("button", { name: "Update Cart" });
      await act(async () => {
        await user.click(updateCartBtn);
      });

      const inputField = screen.getByRole("spinbutton") as HTMLInputElement;
      expect(inputField.value).toBe("3");
    });

    test("different product's subTotal price can be different", async () => {
      const user = userEvent.setup();

      const productNameBeforeRemoveBtnClick = screen.getByRole("link", {
        name: "Half Sleeve Cut and Sew Solid(pattern 15)",
      });
      await act(async () => {
        await user.click(productNameBeforeRemoveBtnClick);
      });
      // we are on product page now

      const sizeBtn = screen.getByRole("button", { name: "M" });
      await act(async () => {
        await user.click(sizeBtn);
      });

      const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
      await act(async () => {
        await user.click(fabricBtn);
      });

      const quantityBtn = screen.getByRole("button", { name: "+" });
      await act(async () => {
        await user.click(quantityBtn); // quantity 2
      });
      await act(async () => {
        await user.click(quantityBtn); // quantity 3
      });

      const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
      await act(async () => {
        await user.click(addToCartBtn);
      });

      const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
      await act(async () => {
        await user.click(viewCartBtn);
      });
      // we are on cart page now

      const firstProductSubtotalPrice = screen.getByRole("cell", {
        name: "৳900",
      });
      expect(firstProductSubtotalPrice).toBeInTheDocument();

      const secondProductSubtotalPrice = screen.getByRole("cell", {
        name: "৳1350",
      });
      expect(secondProductSubtotalPrice).toBeInTheDocument();
    });

    test("clicking update button shows a success banner", async () => {
      const user = userEvent.setup();

      const successBannerBeforeBtnClick = screen.queryByText(
        "Cart has been updated."
      );
      expect(successBannerBeforeBtnClick).not.toBeInTheDocument();

      const updateBtn = screen.getByRole("button", { name: "Update Cart" });
      await act(async () => {
        await user.click(updateBtn);
      });

      const successBannerAfterBtnClick = screen.getByText(
        "Cart has been updated."
      );
      expect(successBannerAfterBtnClick).toBeInTheDocument();
    });
  });
});

describe("checkout section", () => {
  beforeEach(async () => {
    const user = userEvent.setup();

    setupRoute();
    // we are on product page now
    const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
    await act(async () => {
      await user.click(fabricBtn);
    });

    const sizeBtn = screen.getByRole("button", { name: "M" });
    await act(async () => {
      await user.click(sizeBtn);
    });

    const quantityBtn = screen.getByRole("button", { name: "+" });
    await act(async () => {
      await user.click(quantityBtn); // quantity 2
    });

    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await act(async () => {
      await user.click(addToCartBtn);
    });
    // only one product is added to cart with a quantity 2.
    //So subTotal for that product is ৳450+৳450=৳900

    const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
    await act(async () => {
      await user.click(viewCartBtn);
    });
  });

  afterEach(async () => {
    const user = userEvent.setup();
    const removeProductBtns = screen.getAllByTestId(
      "productTableRemoveProductBtn"
    );
    for (let i = 0; i < removeProductBtns.length; i++) {
      await act(async () => {
        await user.click(removeProductBtns[i]);
      });
    }
    // this operation is necessary to remove product from local storage
  });

  test("shipping method change,changes Total price", async () => {
    const user = userEvent.setup();

    const defaultTotalPriceWithRedXCourier = screen.getByText("৳945"); // redX has price ৳ 45.00.
    expect(defaultTotalPriceWithRedXCourier).toBeInTheDocument();

    const sundarbanCourier = screen.getByRole("radio", {
      name: "Sundarban Courier: ৳ 130.00",
    });
    await act(async () => {
      await user.click(sundarbanCourier);
    });

    const totalPrice = screen.getByText("৳1030"); // product subTotal ৳900 + courier ৳130 = ৳1030
    const prevTotalPrice = screen.queryByText("৳945");

    expect(totalPrice).toBeInTheDocument();
    expect(prevTotalPrice).not.toBeInTheDocument();
  });

  test("shipping method change does not effect main price and subTotal", async () => {
    const user = userEvent.setup();
    const sundarbanCourier = screen.getByRole("radio", {
      name: "Sundarban Courier: ৳ 130.00",
    });
    await act(async () => {
      await user.click(sundarbanCourier);
    });

    const totalPrice = screen.getByText("৳1030"); // product subTotal ৳900 + courier ৳130 = ৳1030
    expect(totalPrice).toBeInTheDocument();

    const mainPrice = screen.getByRole("cell", { name: "৳450.00" });
    expect(mainPrice).toBeInTheDocument();

    const subTotalPrice = screen.getByRole("cell", { name: "৳900" });
    expect(subTotalPrice).toBeInTheDocument();
  });
});
