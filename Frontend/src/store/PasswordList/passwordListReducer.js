import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../helpers/api_helper";
import { toast } from "react-toastify";

// fetch functions
export const GetPasswordList = createAsyncThunk(
  "PasswordList/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      let list = await authFetch.get(`/passwords/`);
      return list.data;
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

export const AddPasswordList = createAsyncThunk(
  "PasswordList/AddPasswordList",
  async (data, { rejectWithValue }) => {
    try {
      let newData = await authFetch.post(`/passwords/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toggle();
      toast.success(newData.data.Success, { autoClose: 3000 });
      return newData.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

export const UpdateCityMaster = createAsyncThunk(
  "CityMaster/UpdateCityMaster",
  async ({ data, toggle }, { rejectWithValue }) => {
    try {
      let newData = await authFetch.put(`/utilities/city/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toggle();
      toast.success(newData.data.Success, { autoClose: 3000 });
      return newData.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

export const deleteCityMaster = createAsyncThunk(
  "CityMaster/deleteCityMaster",
  async (data, { rejectWithValue }) => {
    try {
      let newData = await authFetch.delete(`/utilities/city/`, {
        data,
      });
      toast.success(newData.data.Success, { autoClose: 3000 });
      return { id: newData.data.id, warning: newData.data.Success };
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

function matchActionType(action, name, type) {
  if (action.type.includes(name) && action.type.includes(type)) return true;
  else return false;
}

// reducer
let initialState = {
  loading: false,
  data: [],
  country_states: [],
  error: null,
  warningMsg: "",
};

export const PasswordList = createSlice({
  name: "PasswordList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetPasswordList.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(AddPasswordList.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.data.push(action.payload);
      })
      .addCase(UpdateCityMaster.fulfilled, (state, action) => {
        let { payload } = action;
        state.data = state.data.map((oldCity) =>
          oldCity.city_id !== payload.city_id ? oldCity : payload
        );
      })
      .addCase(deleteCityMaster.fulfilled, (state, action) => {
        let { payload } = action;
        if (!payload.delete_confirmation) {
          state.warningMsg = payload.warning;
        }
        state.data = state.data.filter((City) => City.city_id !== payload.id);
      });

    // ERROR
    builder.addMatcher(
      (action) => matchActionType(action, "CityMaster", "/rejected"),
      (state, action) => {
        toast.error(action.payload);
        state.loading = false;
      }
    );
    // PENDDING
    builder.addMatcher(
      (action) => matchActionType(action, "CityMaster", "/pending"),
      (state, action) => {
        state.warningMsg = "";
        state.loading = true;
      }
    );
    builder.addMatcher(
      (action) => matchActionType(action, "CityMaster", "/fulfilled"),
      (state, action) => {
        state.loading = false;
      }
    );
  },
});
