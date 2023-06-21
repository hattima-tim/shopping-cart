import { render,screen } from "@testing-library/react";
import HalfSleeveHomePage from "../../components/products/halfSleeveTShirts/main";
import {MemoryRouter} from "react-router-dom";

test("renders with correct texts", () => {
    const {container} = render(<HalfSleeveHomePage />, { wrapper: MemoryRouter });
    expect(container).toMatchSnapshot();
});

test('images are rendered', () => {
    render(<HalfSleeveHomePage />, {wrapper: MemoryRouter});
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(6);
    for (let i = 0; i < images.length; i++){
        expect(images[i]).toBeVisible();
    }
})