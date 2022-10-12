import { createSlice } from "@reduxjs/toolkit";

export const skillsSlice = createSlice({
  name: 'skillsSlice',
  initialState: {
    items: [],
    loading: false,
    error: null,
    search: '',
  },
  reducers: {
    searchSkillsRequest: (state, action) => {
      state.loading = true;
      state.search = action.payload;
    },
    
    searchSkillsFailure: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.error = action.payload;
    },
    
    searchSkillsSuccess: (state, action) => {
      if (state.search !== '') {
        state.items = action.payload;
      };
      state.loading = false;
      state.error = null;
    },
    
    searchSkillsClear: (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
    
    changeSearchField: (state, action) => {
      state.search = action.payload;
    },
  }
})

export const {
  searchSkillsRequest,
  searchSkillsFailure,
  searchSkillsSuccess,
  searchSkillsClear,
  changeSearchField
} = skillsSlice.actions;

export default skillsSlice.reducer;