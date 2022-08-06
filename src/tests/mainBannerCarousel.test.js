import { render, screen } from "@testing-library/react";
import MainBannerCarousel from "../components/mainBannerCarousel";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("first image in carousel", () => {
  test("image should be visible", () => {
    render(<MainBannerCarousel />);
    const image = screen.getByAltText("shop_image");
    expect(image).toBeVisible();
  });

  test("image have text,dots,buttons", () => {
    const { container } = render(<MainBannerCarousel />);
    expect(container).toMatchSnapshot();
  });

  test("clicking second dot shows second image", () => {
    render(<MainBannerCarousel />);
    const secondDot = screen.getAllByRole("listitem")[1];
    userEvent.click(secondDot);
    const secondImage = screen.getByAltText("white_background");
    expect(secondImage).toBeVisible();
  });

  test("next button shows second image", () => {
    render(<MainBannerCarousel />);
    const nextButton = screen.getByRole("button", { name: ">" });
    userEvent.click(nextButton);
    const secondImage = screen.getByAltText("white_background");
    expect(secondImage).toBeVisible();
  });
});