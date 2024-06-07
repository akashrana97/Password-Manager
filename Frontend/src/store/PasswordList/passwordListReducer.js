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

export const FetchSinglePassword = createAsyncThunk(
  "PasswordList/fetchSinglePassword",
  async ({ id, fillPassword }, { rejectWithValue }) => {
    try {
      let list = await authFetch.get(`/passwords/${id}/`);
      fillPassword(list.data);
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
      toast.success(newData.data.Success, { autoClose: 3000 });
      return newData.data;
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

export const UpdatePasswordList = createAsyncThunk(
  "PasswordList/UpdatePasswordList",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      let newData = await authFetch.put(`/passwords/${id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(newData.data.Success, { autoClose: 3000 });
      return newData.data;
    } catch (error) {
      return rejectWithValue(error.response.data.Error);
    }
  }
);

export const DeletePassword = createAsyncThunk(
  "PasswordList/DeletePassword",
  async (id, { rejectWithValue }) => {
    console.log("id", id);
    try {
      let newData = await authFetch.delete(`/passwords/${id}/`);
      console.log("Deleted :", newData);
      toast.success(newData.data.Success, { autoClose: 3000 });
      return { id: newData.data.id, warning: newData.data.Success };
    } catch (error) {
      alert(error);
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
  single_data: null,
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
        console.log(action.payload);
        state.data.push(action.payload);
      })
      .addCase(FetchSinglePassword.fulfilled, (state, action) => {
        console.log(action.payload);
        state.single_data = action.payload;
      })
      .addCase(UpdatePasswordList.fulfilled, (state, action) => {
        let { payload } = action;
        state.data = state.data.map((oldCity) =>
          oldCity.id !== payload.id ? oldCity : payload
        );
      })
      .addCase(DeletePassword.fulfilled, (state, action) => {
        let { payload } = action;

        state.data = state.data.filter((City) => City.id !== payload.id);
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
