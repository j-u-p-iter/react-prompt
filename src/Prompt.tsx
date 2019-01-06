import { createBrowserHistory } from "history";
import * as React from "react";

interface IPromptProps {
  children: ({ api }: any) => React.ReactNode;
}

interface IPromptState {
  showPrompt: boolean;
}

export class Prompt extends React.Component<IPromptProps, IPromptState> {
  public state: IPromptState = {
    showPrompt: false
  };

  public callback: any = null;

  public setUpCallback = (_: any, callback: any) => {
    this.callback = callback;
  };

  public history = createBrowserHistory({
    getUserConfirmation: this.setUpCallback
  });

  public togglePrompt = (show?: boolean) => {
    this.setState({ showPrompt: Boolean(show) });
  };

  public goFurther = () => {
    this.callback(true);
  };

  public blockTransition = () => {
    this.history.block("fake message");

    this.togglePrompt(true);
  };

  public render() {
    const api = {
      history: this.history,
      setUpCallback: this.setUpCallback,
      blockTransition: this.blockTransition,
      isTransitionBlocked: this.state.showPrompt,
      togglePrompt: this.togglePrompt,
      goFurther: this.goFurther
    };

    return this.props.children({ api });
  }
}
