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

describe('auto slide', () => { 
  test('after 5 seconds, the second image should be visible', async() => {
    jest.useFakeTimers();
    render(<MainBannerCarousel />);
    
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const secondImage = await screen.findByAltText('white_background');
    expect(secondImage).toBeVisible();
  });
  test('after 10 seconds, the first image should be visible', async () => {
    jest.useFakeTimers();
    render(<MainBannerCarousel />);
    
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    const firstImage = await screen.findByAltText('shop_image');
    expect(firstImage).toBeVisible();
  });
})

describe("second image in carousel", () => {

  test("clicking first dot shows first image", () => {
    render(<MainBannerCarousel />);
    const secondDot = screen.getAllByRole("listitem")[1];
    userEvent.click(secondDot);
    const firstDot = screen.getAllByRole("listitem")[0];
    userEvent.click(firstDot);
    const firstImage = screen.getByAltText("shop_image");
    expect(firstImage).toBeVisible();
  });

  test("prev button shows first image", () => {
    render(<MainBannerCarousel />);
    const secondDot = screen.getAllByRole("listitem")[1];
    userEvent.click(secondDot);
    const prevButton = screen.getByRole("button", { name: "<" });
    userEvent.click(prevButton);
    const firstImage = screen.getByAltText("shop_image");
    expect(firstImage).toBeVisible();
  });
});