import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import Ex13, { CountdownTimer, UserPosts, ValidatedInput, WindowSize } from "./components/Ex13";
import Ex14 from "./components/Ex14";
import Ex15 from "./components/Ex15";

const originalFetch = global.fetch;
const posts = [{ id: 1, title: "First user post", body: "Post content" }];
const responseWith = (data) => ({ ok: true, json: async () => data });

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue(responseWith(posts));
});

afterEach(() => {
  cleanup();
  global.fetch = originalFetch;
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test("renders all four exercises on the same page in StrictMode", async () => {
  render(<StrictMode><App /></StrictMode>);

  for (const heading of ["Ex12 - useState", "Ex13 - useEffect", "Ex14 - useContext", "Ex15 - useReducer"]) {
    expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
  }
  expect(await screen.findByText("First user post")).toBeInTheDocument();
});

test("fetches new posts when the selected user changes", async () => {
  render(<Ex13 />);
  expect(await screen.findByText("First user post")).toBeInTheDocument();

  global.fetch.mockResolvedValueOnce(responseWith([{ id: 2, title: "Second user post", body: "Another post" }]));
  fireEvent.change(screen.getByLabelText("User ID"), { target: { value: "2" } });

  expect(await screen.findByText("Second user post")).toBeInTheDocument();
  expect(screen.queryByText("First user post")).not.toBeInTheDocument();
  expect(global.fetch).toHaveBeenLastCalledWith(
    "https://jsonplaceholder.typicode.com/posts?userId=2",
    expect.objectContaining({ signal: expect.anything() })
  );
});

test("cancels obsolete requests and ignores their results", async () => {
  let resolveOldRequest;
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => { resolveOldRequest = resolve; }));
  const { rerender, unmount } = render(<UserPosts userId={1} />);
  const oldSignal = global.fetch.mock.calls[0][1].signal;

  global.fetch.mockResolvedValueOnce(responseWith([{ id: 2, title: "Latest post", body: "Latest content" }]));
  rerender(<UserPosts userId={2} />);
  expect(oldSignal.aborted).toBe(true);
  expect(await screen.findByText("Latest post")).toBeInTheDocument();

  await act(async () => { resolveOldRequest(responseWith(posts)); });
  expect(screen.queryByText("First user post")).not.toBeInTheDocument();
  expect(screen.getByText("Latest post")).toBeInTheDocument();

  const currentSignal = global.fetch.mock.calls[1][1].signal;
  unmount();
  expect(currentSignal.aborted).toBe(true);
});

test("displays a fetch failure and recovers for another user with no posts", async () => {
  global.fetch.mockResolvedValueOnce({ ok: false });
  const { rerender } = render(<UserPosts userId={1} />);
  expect(await screen.findByRole("alert")).toHaveTextContent("Unable to load posts");

  global.fetch.mockResolvedValueOnce(responseWith([]));
  rerender(<UserPosts userId={2} />);
  expect(await screen.findByText("No posts found for this user.")).toBeInTheDocument();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("counts down each second, stops at zero and cleans up on unmount", () => {
  jest.useFakeTimers();
  const timer = render(<CountdownTimer initialValue={2} />);
  expect(screen.getByText("Time Remaining: 2")).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("Time Remaining: 1")).toBeInTheDocument();
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("Time Remaining: 0")).toBeInTheDocument();
  expect(jest.getTimerCount()).toBe(0);
  timer.unmount();

  const runningTimer = render(<CountdownTimer initialValue={10} />);
  expect(jest.getTimerCount()).toBe(1);
  runningTimer.unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test("updates the window size and removes the resize listener", () => {
  const originalWidth = window.innerWidth;
  const originalHeight = window.innerHeight;
  const addListener = jest.spyOn(window, "addEventListener");
  const removeListener = jest.spyOn(window, "removeEventListener");
  const { unmount } = render(<WindowSize />);
  const resizeHandler = addListener.mock.calls.find(([event]) => event === "resize")[1];

  try {
    window.innerWidth = 900;
    window.innerHeight = 600;
    fireEvent(window, new Event("resize"));
    expect(screen.getByText("Window size: 900 x 600")).toBeInTheDocument();
    unmount();
    expect(removeListener).toHaveBeenCalledWith("resize", resizeHandler);
  } finally {
    window.innerWidth = originalWidth;
    window.innerHeight = originalHeight;
  }
});

test("validates input when its value or validation function changes", () => {
  const { rerender } = render(
    <ValidatedInput validationFunction={(value) => value.length >= 3} errorMessage="Invalid input" />
  );
  const input = screen.getByRole("textbox");
  expect(screen.getByRole("alert")).toHaveTextContent("Invalid input");
  fireEvent.change(input, { target: { value: "abc" } });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();

  rerender(<ValidatedInput validationFunction={(value) => value.length >= 5} errorMessage="Too short" />);
  expect(screen.getByRole("alert")).toHaveTextContent("Too short");
  fireEvent.change(input, { target: { value: "abcde" } });
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("toggles the theme through context", () => {
  render(<Ex14 />);
  const toggle = screen.getByRole("button", { name: "Toggle Theme" });
  expect(screen.getByText("Current theme: light")).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(screen.getByText("Current theme: dark")).toBeInTheDocument();
  expect(toggle).toHaveStyle({ backgroundColor: "#61dafb" });
  fireEvent.click(toggle);
  expect(screen.getByText("Current theme: light")).toBeInTheDocument();
});

test("updates both cart views when adding, removing and clearing dishes", () => {
  render(<Ex14 />);
  const addPizza = screen.getByRole("button", { name: "Add Uthappizza to cart" });
  fireEvent.click(addPizza);
  fireEvent.click(addPizza);
  fireEvent.click(screen.getByRole("button", { name: "Add Vadonut to cart" }));

  expect(screen.getByText("Cart: 3 items | $11.97")).toBeInTheDocument();
  expect(screen.getByText("Total items: 3")).toBeInTheDocument();
  expect(screen.getByText("Total value: $11.97")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Remove Uthappizza from cart" }));
  expect(screen.getByText("Cart: 1 items | $1.99")).toBeInTheDocument();
  expect(screen.getByText("Total value: $1.99")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }));
  expect(screen.getByText("Cart: 0 items | $0.00")).toBeInTheDocument();
  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Clear Cart" })).toBeDisabled();
});

test("handles increment, decrement and reset through the counter reducer", () => {
  render(<Ex15 />);
  fireEvent.click(screen.getByRole("button", { name: "+" }));
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "-" }));
  fireEvent.click(screen.getByRole("button", { name: "-" }));
  expect(screen.getByText("Count: -1")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Reset" }));
  expect(screen.getByText("Count: 0")).toBeInTheDocument();
});

test.each([["Canberra", "Mars", 2], ["Sydney", "Mars", 1]])(
  "scores answers %s / %s correctly and restarts the quiz",
  (firstAnswer, secondAnswer, score) => {
    render(<Ex15 />);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: firstAnswer }));
    expect(screen.getByRole("button", { name: firstAnswer })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: secondAnswer }));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText(`Your Score: ${score}/2`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Restart Quiz" }));
    expect(screen.getByText("Question 1 of 2")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  }
);

test("the color select in Ex12 still works on the combined page", async () => {
  const { container } = render(<App />);
  await waitFor(() => expect(screen.getByText("First user post")).toBeInTheDocument());
  const colorSelect = container.querySelector("#ex12 select");
  fireEvent.change(colorSelect, { target: { value: "yellow" } });
  expect(colorSelect.nextElementSibling).toHaveStyle({ backgroundColor: "yellow" });
});
