import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as getDataMock } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api")

const initialData = {
  next: "http:/foo.com",
  previous: "http:/foo.com",
  results: [
    {
      name: "INITIAL_NAME",
      url: "INITIAL_URL"
    }
  ]
};

const nextData = {
  next: "http:/foo.com",
  previous: "http:/foo.com",
  results: [
    {
      name: "NEXT_NAME",
      url: "NEXT_URL"
    }
  ]
};

const prevData = {
  next: "http:/foo.com",
  previous: "http:/foo.com",
  results: [
    {
      name: "PREVIOUS_NAME",
      url: "PREVIOUS_URL"
    }
  ]
};

test("StarWarsCharacters Renders", async () => {
  getDataMock.mockResolvedValue(initialData);
  
  render(<StarWarsCharacters />);

  await wait();
});

test("Next Renders New Data", async () => {
  getDataMock.mockResolvedValue(initialData);
  
  const { getByText } = render(<StarWarsCharacters />);
  const nextButton = getByText(/Next/i);

  getDataMock.mockResolvedValue(nextData);

  await wait(() => fireEvent.click(nextButton));
  await wait(() => expect(getByText("NEXT_NAME")));
});

test("Previous Renders New Data", async () => {
  getDataMock.mockResolvedValue(initialData);
  
  const { getByText } = render(<StarWarsCharacters />);
  const previousButton = getByText(/Previous/i);

  getDataMock.mockResolvedValue(prevData);

  await wait(() => fireEvent.click(previousButton));
  await wait(() => expect(getByText("PREVIOUS_NAME")));
});

