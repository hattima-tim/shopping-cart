import { render, screen } from "@testing-library/react";
import Header from "../components/header";

test("logo image is visible", () => {
  render(<Header />);
  const logo = screen.getByRole("img", { name: "one ummah logo" });
  expect(logo).toBeInTheDocument();
});
