import React, { JSX } from "react";
import { connect } from "react-redux";
import Tile from "../ tile";
import Filters from "../filters";
import Pagination from "../pagination";
import Header from "../header";
import "./app.scss";

interface Props {
  filter: {
    blackTheme: boolean;
  };
}

function App({ filter: { blackTheme } }: Props): JSX.Element {
  return (
    <div className="wrapper" {...(blackTheme ? { "data-dark": true } : "")}>
      <div className="app">
        <Header />
        <Filters />
        <Tile />
        <Pagination />
      </div>
    </div>
  );
}

function mapStateToProps(props: Props) {
  return { ...props };
}

export default connect(mapStateToProps, null)(App);
