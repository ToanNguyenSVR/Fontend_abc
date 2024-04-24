import { Company } from './../../model/company';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../model/user';

const initialState: User = {
  id: 0,
  email: '',
  avatar: '',
  fullName: '',
  phone: '',
  code: '',
  status: '',
  accountType: null,
  headhunter: null,
  token: '',
  description:'',
  company: null,
  companyStaff: null,
  candidate: null,
  wallet:null,
  avg_star:undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
      return { ...state };
    },

    setCompany: (state, action: PayloadAction<Company>) => {
      return { ...state, company: action.payload };
    },

    deleteUser: state => {
      return initialState;
    },
  },
});

export const { setUser, deleteUser, setCompany } = userSlice.actions;

export default userSlice.reducer;
