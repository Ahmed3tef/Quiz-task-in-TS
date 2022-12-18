import axios from 'axios';
import { APIBase } from './api';

export const loadData = async (thunkAPI: any, path: string) => {
  return axios
    .get(`${APIBase}${path}`, thunkAPI)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return thunkAPI.rejectWithValue({ error: error.data });
    });
};

export const loadDataWithBody = async (
  thunkAPI: any,
  path: string,
  data: { score?: number }
) => {
  return axios
    .post(`${APIBase}${path}`, data, thunkAPI)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return thunkAPI.rejectWithValue({ error: error.data });
    });
};
