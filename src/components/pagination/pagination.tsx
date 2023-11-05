import React from "react";
import { connect } from "react-redux";
import { useGetPaintingsQuery } from "../../services/services";
import { actions } from "../../slice/filters";
import "./pagination.scss";

interface Props {
  filter: {
    setting: {
      author: string;
      locations: string;
      q: string;
      page: string;
      from: string;
      before: string;
      limit: string;
    };
  };
  changePage: (arg: string) => any;
}

function Pagination({ filter: { setting }, changePage }: Props): JSX.Element {
  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetPaintingsQuery({ ...setting, page: "", limit: "" });

  const lengthData: number = Math.ceil(data.length / 12);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (isError) {
    return <>Ошибка {error}</>;
  }
  const arr: JSX.Element[] = [];
  let numberPage: number = 1;
  for (let i = 1; i <= lengthData; i += 1) {
    if (setting.page !== "") numberPage = Number(setting.page.split("_page=")[1]);
    arr.push(
      <button
        className={`button-pagination ${numberPage === i ? "select" : ""}`}
        type="button"
        onClick={() => changePage(`${i}`)}
        key={i}
      >
        {i}
      </button>,
    );
  }

  return (
    <div className="wrapper-pagination">
      <span
        aria-hidden="true"
        className={`button-pagination ${numberPage === 1 ? "not-active" : ""}`}
        onClick={numberPage === 1 ? undefined : () => changePage(`${1}`)}
      >
        {"<<"}
      </span>
      <span
        aria-hidden="true"
        className={`button-pagination ${numberPage === 1 ? "not-active" : ""}`}
        onClick={numberPage === 1 ? undefined : () => changePage(`${numberPage - 1}`)}
      >
        {"<"}
      </span>
      {arr}
      <span
        aria-hidden="true"
        className={`button-pagination ${
          numberPage === lengthData || lengthData === 0 ? "not-active" : ""
        }`}
        onClick={
          numberPage === lengthData || lengthData === 0
            ? undefined
            : () => changePage(`${numberPage + 1}`)
        }
      >
        {">"}
      </span>
      <span
        aria-hidden="true"
        className={`button-pagination ${
          numberPage === lengthData || lengthData === 0 ? "not-active" : ""
        }`}
        onClick={
          numberPage === lengthData || lengthData === 0
            ? undefined
            : () => changePage(`${lengthData}`)
        }
      >
        {">>"}
      </span>
    </div>
  );
}

function mapStateToProps(props: Props) {
  return { ...props };
}

export default connect(mapStateToProps, actions)(Pagination);
