import React, { Component, JSX } from "react";

interface State {
  error: boolean;
}

interface Children {
  children: JSX.Element;
}

class ErrorBoundary extends Component<Children, State> {
  constructor(props: Children) {
    super(props);

    this.state = {
      error: false,
    };
  }

  public componentDidCatch(error: Error): void {
    this.setState({
      error: true,
    });
    // eslint-disable-next-line
    console.log(error);
  }

  render(): JSX.Element {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return <div> Ошибка! </div>;
    }

    return children;
  }
}

export default ErrorBoundary;
