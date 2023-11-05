import React from "react";
import { connect } from "react-redux";
import Cart from "../cart";
import "./tile.scss";
import {
  useGetAuthorsQuery,
  useGetLocationsQuery,
  useGetPaintingsQuery,
} from "../../services/services";
import { actions } from "../../slice/filters";

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
}

interface Card {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}

interface Authors {
  id: number;
  name: string;
}

interface Locations {
  id: number;
  location: string;
}

function Tile({ filter: { setting } }: Props): JSX.Element {
  const {
    data: authors = [],
    isLoading: isLoadingAuthors,
    isError: isErrorAuthors,
  } = useGetAuthorsQuery(null);
  const { data = [], isLoading, isError, error } = useGetPaintingsQuery(setting);
  const {
    data: locations = [],
    isLoading: isLoadingLocations,
    isError: isErrorLocations,
  } = useGetLocationsQuery(null);

  if (isLoading && isLoadingAuthors && isLoadingLocations) {
    return <div>Загрузка...</div>;
  }

  if (isError && isErrorAuthors && isErrorLocations) {
    return <>Ошибка {error}</>;
  }

  let filterData: Card[] = [];
  if (data?.length > 12) {
    filterData = data.slice(0, 12);
  } else {
    filterData = data.slice();
  }

  const carts: JSX.Element[] = filterData?.map((item: Card) => {
    const authorName = authors?.find((item1: Authors) => {
      return item1.id === item.authorId;
    });
    const locationName = locations?.find((item1: Locations) => {
      return item1.id === item.locationId;
    });
    const cartParameter = {
      ...item,
      ...{ authorName: authorName?.name },
      ...{ locationName: locationName?.location },
    };
    return <Cart parameter={cartParameter} key={item.id} />;
  });

  return <div className="tile">{carts}</div>;
}

function mapStateToProps(props: Props) {
  return { ...props };
}

export default connect(mapStateToProps, actions)(Tile);
