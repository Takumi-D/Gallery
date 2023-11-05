import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Scrollbar } from "react-scrollbars-custom";
import { useGetAuthorsQuery, useGetLocationsQuery } from "../../services/services";
import { actions } from "../../slice/filters";
import "./filters.scss";

const cleaning = require("./cleaning.svg").default;
const cleaningBlack = require("./cleaningBlack.svg").default;
const arrBottom = require("./arr-bottom.svg").default;
const arrBottomBlack = require("./arrBottomBlack.svg").default;

interface Props {
  filter: {
    filters: {
      nameLocation: string;
      nameAuthors: string;
      showBlockCreate: boolean;
      showBlockLocation: boolean;
      showBlockAuthors: boolean;
    };
    setting: {
      author: string;
      locations: string;
      q: string;
      page: string;
      from: string;
      before: string;
      limit: string;
    };
    blackTheme: boolean;
    activePage: number;
  };
  initAuthors: (numOfPages: string) => any;
  initLocations: (idLocation: string) => any;
  changePage: (arg: string) => any;
  initName: (name: string) => any;
  initFrom: (from: string) => any;
  initBefore: (from: string) => any;
  changeOfTopic: () => any;
  setLocationName: (name: string) => any;
  setShowBlockLocation: (show: boolean) => any;
  setShowBlockCreate: (show: boolean) => any;
  setShowBlockAuthors: (show: boolean) => any;
  setShowBlockAll: (show: boolean) => any;
  setAuthorsName: (name: string) => any;
}

interface Authors {
  id: number;
  name: string;
}

interface Locations {
  id: number;
  location: string;
}

function Filters({
  initAuthors,
  initLocations,
  initName,
  initFrom,
  initBefore,
  setShowBlockLocation,
  setShowBlockCreate,
  setLocationName,
  setShowBlockAuthors,
  setShowBlockAll,
  setAuthorsName,
  filter: {
    filters: { showBlockCreate, showBlockLocation, nameLocation, showBlockAuthors, nameAuthors },
    setting: { locations: settingLocation, author: settingAuthor },
    blackTheme,
  },
}: Props): JSX.Element {
  const { data: authors = [], isLoading: isLoadingAuthors } = useGetAuthorsQuery(null);
  const { data: locations = [], isLoading: isLoadingLocations } = useGetLocationsQuery(null);

  const [widthCreated, setWidthCreated] = useState(null);
  const [widthLocation, setWidthLocation] = useState(null);
  const [widthAuthors, setWidthAuthors] = useState(null);

  const createdFilterEl: any = useRef(null);
  const authorsFilterEl: any = useRef(null);
  const locationFilterEl: any = useRef(null);

  const handClick = (event: MouseEvent | TouchEvent): void => {
    if (
      !createdFilterEl?.current.contains(event.target) &&
      !authorsFilterEl?.current.contains(event.target) &&
      !locationFilterEl?.current.contains(event.target)
    ) {
      if (!showBlockCreate || !showBlockLocation || !showBlockAuthors) {
        setShowBlockAll(true);
      }
    }
  };

  const determiningFilterWidth = (): void => {
    setWidthAuthors(authorsFilterEl?.current?.offsetWidth);
    setWidthLocation(locationFilterEl?.current?.offsetWidth);
    setWidthCreated(createdFilterEl?.current?.offsetWidth);
  };

  useEffect(() => {
    determiningFilterWidth();
    window.addEventListener("resize", determiningFilterWidth);
    document.addEventListener("mousedown", handClick);
    return () => {
      document.removeEventListener("mousedown", handClick);
      window.removeEventListener("resize", determiningFilterWidth);
    };
  });

  if (isLoadingAuthors && isLoadingLocations) {
    return <div>Загрузка...</div>;
  }

  const authorsEl: JSX.Element[] = authors.map((item: Authors) => {
    const { id } = item;
    const prevId = Number(settingLocation.split("&authorId=")[1]);
    return (
      <div
        aria-hidden="true"
        onClick={($event) => {
          $event.stopPropagation();
          if (!($event.target instanceof HTMLDivElement)) return;
          if (nameAuthors === "" || prevId !== id) {
            setAuthorsName(item.name);
            initAuthors(String(id));
          }
        }}
        className="filter-item"
        data-id={id}
        key={id}
      >
        {item.name}
      </div>
    );
  });

  const locationsEl: JSX.Element[] = locations.map((item: Locations) => {
    const { id } = item;
    const prevId = Number(settingLocation.split("&locationId=")[1]);
    return (
      <div
        aria-hidden="true"
        onClick={($event) => {
          $event.stopPropagation();
          if (!($event.target instanceof HTMLDivElement)) return;
          if (nameLocation === "" || prevId !== id) {
            setLocationName(item.location);
            initLocations(String(id));
          }
        }}
        className="filter-item"
        data-id={id}
        key={id}
      >
        {item.location}
      </div>
    );
  });

  return (
    <div className="wrapper-filters">
      <input
        placeholder="Name"
        className="filter"
        type="text"
        onChange={(event) => initName(event.target.value)}
      />

      <div
        aria-hidden="true"
        onClick={() => setShowBlockAuthors(!showBlockAuthors)}
        className={`filter filter-created ${!showBlockAuthors ? "opening" : ""}`}
        data-id=""
        ref={authorsFilterEl}
      >
        <div className="filter-created-text">{nameAuthors === "" ? "Authors" : nameAuthors}</div>
        <div
          aria-hidden="true"
          onClick={($event) => {
            $event.stopPropagation();
            if (settingAuthor === "") return;
            setAuthorsName("");
            initAuthors("");
          }}
          className={`cleaning ${settingAuthor === "" ? "d-none" : ""}`}
        >
          <img
            className="cleaning-img"
            src={blackTheme ? cleaningBlack : cleaning}
            alt="cleaning"
          />
        </div>
        <div className="arr-filter">
          <img src={blackTheme ? arrBottomBlack : arrBottom} alt="arr" />
        </div>
        <Scrollbar
          className={`${showBlockAuthors ? "d-none" : ""}`}
          trackYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <span
                  {...restProps}
                  ref={elementRef}
                  style={{
                    ...restProps.style,
                    right: "8px",
                    width: "9px",
                    background: "initial",
                    height: "100%",
                    top: "0",
                  }}
                />
              );
            },
          }}
          thumbYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  style={{
                    ...restProps.style,
                    background: "#7B7B7B",
                  }}
                />
              );
            },
          }}
          style={{
            width: `${widthAuthors}px`,
            height: 300,
            position: "absolute",
            zIndex: 999,
            background: "var(--var-bgColor-input)",
            left: "-1px",
          }}
        >
          {authorsEl}
        </Scrollbar>
      </div>

      <div
        aria-hidden="true"
        onClick={() => setShowBlockLocation(!showBlockLocation)}
        className={`filter filter-created ${!showBlockLocation ? "opening" : ""}`}
        data-id=""
        ref={locationFilterEl}
      >
        <div className="filter-created-text">{nameLocation === "" ? "Location" : nameLocation}</div>
        <div
          aria-hidden="true"
          onClick={($event) => {
            $event.stopPropagation();
            if (settingLocation === "") return;
            setLocationName("");
            initLocations("");
          }}
          className={`cleaning ${settingLocation === "" ? "d-none" : ""}`}
        >
          <img
            className="cleaning-img"
            src={blackTheme ? cleaningBlack : cleaning}
            alt="cleaning"
          />
        </div>
        <div className="arr-filter">
          <img src={blackTheme ? arrBottomBlack : arrBottom} alt="arr" />
        </div>
        <Scrollbar
          className={`${showBlockLocation ? "d-none" : ""}`}
          trackYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <span
                  {...restProps}
                  ref={elementRef}
                  style={{
                    ...restProps.style,
                    right: "8px",
                    width: "9px",
                    background: "initial",
                    height: "100%",
                    top: "0",
                  }}
                />
              );
            },
          }}
          thumbYProps={{
            renderer: (props) => {
              const { elementRef, ...restProps } = props;
              return (
                <div
                  {...restProps}
                  ref={elementRef}
                  style={{
                    ...restProps.style,
                    background: "#7B7B7B",
                  }}
                />
              );
            },
          }}
          style={{
            width: `${widthLocation}px`,
            height: 300,
            position: "absolute",
            zIndex: 99,
            background: "var(--var-bgColor-input)",
            left: "-1px",
          }}
        >
          {locationsEl}
        </Scrollbar>
      </div>

      <div
        aria-hidden="true"
        onClick={() => setShowBlockCreate(!showBlockCreate)}
        className={`filter filter-created ${!showBlockCreate ? "opening" : ""}`}
        ref={createdFilterEl}
      >
        <div className="arr-filter">
          <img src={blackTheme ? arrBottomBlack : arrBottom} alt="arr" />
        </div>
        <div className="filter-created-text">Created</div>
        <div
          aria-hidden="true"
          onClick={($event) => {
            $event.stopPropagation();
          }}
          style={{ width: `${widthCreated}px` }}
          className={`wrapper-form ${showBlockCreate ? "d-none" : ""}`}
        >
          <input
            className="input-created"
            onChange={(event) => initFrom(event.target.value)}
            type="text"
            placeholder="from"
          />
          <div className="arr" />
          <input
            className="input-created"
            onChange={(event) => initBefore(event.target.value)}
            type="text"
            placeholder="before"
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(props: Props) {
  return { ...props };
}

export default connect(mapStateToProps, actions)(Filters);
