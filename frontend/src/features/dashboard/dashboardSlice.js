import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// async thunks
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/patient/dashboard"); // protected - needs auth
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

// For public access (no auth) you might want endpoints:
// api.get('/publications'), api.get('/trials'), api.get('/experts')

export const fetchPublications = createAsyncThunk(
  "dashboard/fetchPubs",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/publications");
      return res.data.data || res.data; // controller responded { success: true, data: [...] } earlier
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

export const fetchTrials = createAsyncThunk(
  "dashboard/fetchTrials",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/trials");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

export const fetchExperts = createAsyncThunk(
  "dashboard/fetchExperts",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/experts"); // ensure backend route exists
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: err.message }
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    error: null,
    trials: [],
    publications: [],
    experts: [],
    patientDashboard: null, // if fetching protected /patient/dashboard
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.patientDashboard = action.payload;
        state.trials = action.payload.trials || [];
        state.publications = action.payload.publications || [];
        state.experts = action.payload.experts || [];
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      .addCase(fetchPublications.fulfilled, (state, action) => {
        state.publications = action.payload;
      })
      .addCase(fetchTrials.fulfilled, (state, action) => {
        state.trials = action.payload;
      })
      .addCase(fetchExperts.fulfilled, (state, action) => {
        state.experts = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
