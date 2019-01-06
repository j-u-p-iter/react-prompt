import * as React from "react";
import { fireEvent, render } from "react-testing-library";

import { Prompt } from ".";

describe("Prompt", () => {
  let history: any;
  let setUpCallback: any;
  let getByText: any;
  let goFurther: any;

  beforeAll(() => {
    let isTransitionBlocked: boolean;
    let togglePrompt: any;
    let blockTransition: any;

    const WithPrompt = () => (
      <Prompt>
        {({ api }: any) => {
          ({
            history,
            setUpCallback,
            blockTransition,
            isTransitionBlocked,
            togglePrompt,
            goFurther
          } = api);

          return (
            <div>
              <button onClick={togglePrompt}>Toggle Prompt</button>
              <button onClick={blockTransition}>Block transition</button>
              {isTransitionBlocked ? (
                <div>Prompt Modal</div>
              ) : (
                <div>No Prompt Modal</div>
              )}
            </div>
          );
        }}
      </Prompt>
    );

    ({ getByText } = render(<WithPrompt />));
  });

  it("exposes correct API", () => {
    // history object
    expect(typeof history.length).toBe("number");
    expect(typeof history.location).toBe("object");
    expect(typeof history.action).toBe("string");
    expect(typeof history.listen).toBe("function");
    expect(typeof history.block).toBe("function");

    // setUpCallback
    expect(typeof setUpCallback).toBe("function");
    expect(setUpCallback("some-message", () => {})).toBeUndefined();

    // blockTransition
    const blockTransitionButton = getByText("Block transition");
    const noPromptModal = getByText("No Prompt Modal");
    const historyBlockSpy = jest.spyOn(history, "block");

    expect(historyBlockSpy).not.toHaveBeenCalled();
    expect(noPromptModal).toBeDefined();

    fireEvent.click(blockTransitionButton);

    const promptModal = getByText("Prompt Modal");

    expect(historyBlockSpy).toHaveBeenCalledTimes(1);
    expect(promptModal).toBeDefined();

    // togglePrompt
    const togglePromptButton = getByText("Toggle Prompt");

    fireEvent.click(togglePromptButton);

    expect(noPromptModal).toBeDefined();

    // goFurther
    expect(typeof goFurther).toBe("function");
    expect(goFurther()).toBeUndefined();
  });
});
