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
  phone: string
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
  fk_Admin: string,
  fk_Image: string,
  fk_Status: number,
  appartaments: number,
  floors: number,
  porches: number,
  yearCommissioning: string,
  createdAt: Date,
  editedAt: Date,
  removed: boolean
  imageUrl: ImageUrl
  tenants: User[],
  localGroups: Group[]
}

export interface Group {
  uid: string,
  title: string,
  fk_Admin: string,
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
  name: string,
  surname: string,
  password: string,
  repeatPassword: string
};
export interface arrBool {
  login: boolean,
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
};
export interface adrBool {
  city: boolean,
  street: boolean,
  homeN: boolean,
  appartment: boolean,
};
export interface adrHomeText {
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
  city: boolean,
  street: boolean,
  homeN: boolean,
  appartments: boolean,
  floors: boolean, 
  porches: boolean,
  year: boolean, 
  status: boolean
};

export const initialUser: User = {
  uid: '',
  fullName: '',
  avatar: {
    uid: '',
    url: 'https://docplus.kg/img/noavatar.png',
    createdAt: '',
    removed: false
  },
  fk_Role: 0,
  fk_Home: '',
  fk_Avatar: '',
  fk_Gender: 0,
  login: '',
  appartament: '',
  myGroups: [],
  address: '',
  phone: ''
}
/**{
    uid: '',
    title: '',
    fk_Admin: '',
    fk_Image: '',
    fk_Status: 0,
    fk_Home: '',
    createdAt: new Date,
    editedAt: new Date,
    removed: false
  } */