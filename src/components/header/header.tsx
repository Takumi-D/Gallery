import React from "react";
import { connect } from "react-redux";
import { actions } from "../../slice/filters";
import "./header.scss";

interface Props {
  filter: {
    filters: {
      nameLocation: string;
      nameAuthors: string;
      showBlockCreate: boolean;
      showBlockLocation: boolean;
      showBlockAuthors: boolean;
    };
    blackTheme: boolean;
  };
  changeOfTopic: () => any;
}

const logo = require("./logo.svg").default;
const sunBlack = require("./sun-black.svg").default;
const sunWhite = require("./sun-white.svg").default;

function Header({ filter: { blackTheme }, changeOfTopic }: Props) {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="logo" />
      <button className="btn-sun" type="button" onClick={() => changeOfTopic()}>
        <img src={blackTheme ? sunWhite : sunBlack} alt="sun" className="img-sun" />
      </button>
    </div>
  );
}

function mapStateToProps(props: Props) {
  return { ...props };
}

export default connect(mapStateToProps, actions)(Header);
