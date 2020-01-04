import { ColorApp } from "../constants";

export interface User {
  uid: string,
  fullName: string,
  avatar: ImageUrl,
  fk_Role: number,
  fk_Home: string,
  fk_Avatar: string,
  login: string,
  fk_Gender: number,
  appartament: string,
  myGroups: Group[],
  address: string,
  phone: string,
  isApprovedHome: boolean,
  // createdAt: Date,
  // editedAt: Date,
  //removed: boolean,
}
export interface ImageUrl {
  uid: string,
  url: string,
  createdAt: string,
  removed: boolean,
}
export interface Home {
  uid: string,
  city: string,
  street: string,
  homeNumber: string,
  fk_Manager: string,
  fk_Image: string,
  fk_Status: number,
  appartaments: number,
  floors: number,
  porches: number,
  yearCommissioning: string,
  createdAt: Date,
  editedAt: Date,
  removed: boolean,
  imageUrl: ImageUrl,
  tenants: User[],
  localGroups: Group[],
  manager: User,
}

export interface Group {
  uid: string,
  title: string,
  fk_Supervisor: string,
  fk_Image: string,
  fk_Status: number,
  fk_Home: string,
  createdAt: Date,
  editedAt: Date,
  removed: boolean
}
export interface AuthData {
  token: string,
  userLogin: User,
}
export interface arrText {
  login: string,
  email: string,
  name: string,
  surname: string,
  password: string,
  repeatPassword: string
};
export interface arrBool {
  login: boolean,
  email: boolean,
  name: boolean,
  surname: boolean,
  password: boolean,
  repeatPassword: boolean
};
export interface adrText {
  city: string,
  street: string,
  homeN: string,
  appartment: string,
  home: string
};
export interface AuthData {
  token: string,
  userLogin: User,
}
export interface adrBool {
  city: boolean,
  street: boolean,
  homeN: boolean,
  appartment: boolean,
  home: boolean
};
export interface adrHomeText {
  supervisor: string,
  city: string,
  street: string,
  homeN: string,
  appartments: string,
  floors: string, 
  porches: string,
  year: string, 
  status: string
};
export interface adrHomeBool {
  supervisor: boolean,
  city: boolean,
  street: boolean,
  homeN: boolean,
  appartments: boolean,
  floors: boolean, 
  porches: boolean,
  year: boolean, 
  status: boolean
};

export interface HomeData {
  homeData: Home,
  tantains: User[],
  newTantains: User[],
}

export const initialUser: User = {
  uid: '',  fullName: '',
  avatar: {
    uid: '',
    url: 'https://docplus.kg/img/noavatar.png',
    createdAt: '',
    removed: false
  },
  fk_Role: 0, fk_Home: '', fk_Avatar: '', fk_Gender: 0, login: '', appartament: '', myGroups: [], address: '', phone: '',
  isApprovedHome: false
}
/**{
    uid: '', title: '', fk_Supervisor: '', fk_Image: '', fk_Status: 0, fk_Home: '', createdAt: new Date, editedAt: new Date, removed: false
  } */

export const InitialImage = { uid: '', url: '', removed: false, createdAt: '' }
export const InitialHome: Home = {
      uid: '', city: '', street: '', homeNumber: '', fk_Manager: '', fk_Image: '',
      fk_Status: 0, appartaments: 0, floors: 0, porches: 0, yearCommissioning: '',
      imageUrl: InitialImage, createdAt: new Date, editedAt: new Date, removed: false, tenants: [],
      localGroups: [], manager: initialUser
    }
export const initArrBool: arrBool = {
  login: false,
  email: false,
  name: false,
  surname: false,
  password: false,
  repeatPassword: false
};
export const initArrTxt: arrText = {
  login: '',
  email: '',
  name: '',
  surname: '',
  password: '',
  repeatPassword: ''
};
export const initArrColor: arrText = {
  login: ColorApp,
  email: ColorApp,
  name: ColorApp,
  surname: ColorApp,
  password: ColorApp,
  repeatPassword: ColorApp
};

export const initAdrTxt: adrHomeText = {
  supervisor: '', city: '', street: '', homeN: '', appartments: '',
  floors: '', porches: '', year: '', status: ''
};
export const initAdrBool: adrHomeBool = {
  supervisor: false, city: false, street: false, homeN: false, appartments: false,
  floors: false, porches: false, year: false, status: false
};