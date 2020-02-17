import { appColor, disColor } from "../constants";

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

export interface Advert {
  uid: string,
  title: string,
  text: string,
  category: string,
  voting: Voting[]
}
export interface Voted {
  fk_User: string,
  fk_Voting: string
}
export interface Voting {
  uid: string,
  title: string,
  options: Answer[],
  isMulti: boolean,
  yourOption: string,
  voteds: Voted[],  
  totalVotes: number
}
export interface Answer {
  uid: string,
  option: string,
  count: number
}

export interface AuthData {
  token: string,
  userLogin: User,
}
export interface arrText {
  login: string,
  email: string,
  name: string,
  password: string,
  infoPassword: string,
  repeatPassword: string
};
export interface arrColor {
  login: string,
  email: string,
  name: string,
  iconPassword: string,
  password: string,
  repeatPassword: string
  button: string
};
export interface arrBool {
  login: boolean,
  email: boolean,
  name: boolean,
  surname: boolean,
  password: boolean,
  repeatPassword: boolean
};
export interface authText {
  login: string,
  password: string,
};
export interface authColor {
  login: string,
  password: string,
  button: string
};
export interface addressColor {
  homeN: string,
  appartment: string,
  button: string
};
export interface authBool {
  login: boolean,
  password: boolean,
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

export interface AdvBool {
  title: boolean,
  text: boolean,
  category: boolean,
  voting: VotingBool[]
}
export interface VotingBool {
  question: boolean,
  answer: AnswerBool[],
}
export interface AnswerBool {
  answer: boolean,
}


export const initialUser: User = {
  uid: '', fullName: '',
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
// export const initArrTxt: arrText = {
//   login: '',
//   email: '',
//   name: '',
//   password: '',
//   in
//   repeatPassword: ''
// };
// export const initArrColor: arrText = {
//   login: appColor,
//   email: appColor,
//   name: appColor,
//   password: appColor,
//   repeatPassword: appColor
// };

export const initAuthBool: authBool = {
  login: false,
  password: false,
};
export const initAuthTxt: authText = {
  login: '',
  password: '',
};

export const initAdrTxt: adrHomeText = {
  supervisor: '', city: '', street: '', homeN: '', appartments: '',
  floors: '', porches: '', year: '', status: ''
};
export const initAdrBool: adrHomeBool = {
  supervisor: false, city: false, street: false, homeN: false, appartments: false,
  floors: false, porches: false, year: false, status: false
};


export const initAdvAnswerBool: AnswerBool = {
  answer: false,
};
export const initAdvVotingBool: VotingBool = {
  question: false,
  answer: [initAdvAnswerBool],
};
export const initAdvBool: AdvBool = {
  title: false,
  text: false,
  category: false,
  voting: [initAdvVotingBool],
};


export const initAdvAnswer: Answer = {
  uid: '',
  option: '',
  count: 0
};
export const initVoted: Voted = {  
  fk_User: '',
  fk_Voting: ''
}
export const initAdvVoting: Voting = {
  uid: '',
  title: '',
  options: [initAdvAnswer],
  isMulti: false,
  yourOption: '',
  voteds: [initVoted],  
  totalVotes: 0
};
export const initAdvText: Advert = {
  uid: '',
  text: '',
  title: '',
  category: '',
  voting: [initAdvVoting],
};

export const advAnswer: Answer = {
  uid: '', 
  option: '',
  count: 0
};
export const advVoting: Voting = {
  uid: '', 
  title: '',
  options: [initAdvAnswer],
  isMulti: false,
  yourOption: '',
  voteds: [initVoted],  
  totalVotes: 0
};
export const advert: Advert = {
  uid: '', 
  text: '',
  title: '',
  category: '',
  voting: [initAdvVoting],
};