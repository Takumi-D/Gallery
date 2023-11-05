import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  setting: {
    author: string;
    locations: string;
    q: string;
    page: string;
    from: string;
    before: string;
    limit: string;
  };
  filters: {
    nameLocation: string;
    nameAuthors: string;
    showBlockCreate: boolean;
    showBlockLocation: boolean;
    showBlockAuthors: boolean;
  };
  blackTheme: boolean;
  activePage: number;
}

const initialState: InitialState = {
  setting: {
    author: "",
    locations: "",
    q: "",
    page: `_page=${1}`,
    from: "",
    before: "",
    limit: `&_limit=${12}`,
  },
  filters: {
    nameLocation: "",
    nameAuthors: "",
    showBlockCreate: true,
    showBlockLocation: true,
    showBlockAuthors: true,
  },
  blackTheme: false,
  activePage: 1,
};

function settingPage(action: string): string {
  if (action !== "") return "";
  return `_page=${1}`;
}

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    initAuthors: (state, action) => {
      state.setting.author = action.payload === "" ? "" : `&authorId=${action.payload}`;
      state.setting.page = settingPage(action.payload);
    },
    initLocations: (state, action) => {
      state.setting.locations = action.payload === "" ? "" : `&locationId=${action.payload}`;
      state.setting.page = settingPage(action.payload);
    },
    initName: (state, action) => {
      state.setting.q = action.payload === "" ? "" : `q=${action.payload}&`;
      state.setting.page = settingPage(action.payload);
    },
    changePage: (state, action) => {
      state.setting.page = action.payload === "" ? "" : `_page=${action.payload}`;
    },
    initFrom: (state, action) => {
      state.setting.from = action.payload === "" ? "" : `&created_gte=${action.payload}`;
      state.setting.page = settingPage(action.payload);
    },
    initBefore: (state, action) => {
      state.setting.before = action.payload === "" ? "" : `&created_lte=${action.payload}`;
      state.setting.page = settingPage(action.payload);
    },
    changeOfTopic: (state) => {
      state.blackTheme = !state.blackTheme;
    },
    setLocationName: (state, actions) => {
      state.filters.nameLocation = actions.payload;
    },
    setAuthorsName: (state, actions) => {
      state.filters.nameAuthors = actions.payload;
    },
    setShowBlockCreate: (state, actions) => {
      state.filters.showBlockCreate = actions.payload;
    },
    setShowBlockLocation: (state, actions) => {
      state.filters.showBlockLocation = actions.payload;
    },
    setShowBlockAuthors: (state, actions) => {
      state.filters.showBlockAuthors = actions.payload;
    },
    setShowBlockAll: (state, actions) => {
      state.filters.showBlockAuthors = actions.payload;
      state.filters.showBlockLocation = actions.payload;
      state.filters.showBlockCreate = actions.payload;
    },
  },
});

const { reducer, actions } = filterSlice;

export default reducer;

export { actions };
