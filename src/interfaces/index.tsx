import { ColorApp } from "../constants";

export interface User {
  id: number,
  fullName: string,
  enum_Gender: number,
  email: string,
  phone: string,
  fk_Photo: number,
  enum_Role: number,
  photo: ImageUrl,
  // createdAt: Date,
  // editedAt: Date,
  //removed: boolean,
}
export interface ImageUrl {
  id: number,
  url: string,
  createdAt: string,
  removed: boolean,
}
export interface Doctor {
  id: number,
  fk_Speciality: number,
  fk_PlaceOfWork: number,
  enum_Category: number,
  rating: number,
  fk_User: number,
  appointments: Appointment[],
  speciality: Speciality,
  placeOfWork: PlaceOfWork,
  user: User,
}

export interface Appointment {
  id: number,
  fk_Doctor: number,
  fk_Patient: number,
  dateTimeReceipt: Date,
  createdAt: Date,
  editedAt: Date,
  removed: boolean
}

export interface Speciality {
  id: number,
  nameSpeciality: string,
}
export interface PlaceOfWork {
  id: number,
  namePlace: string
}
export interface Patient {
  id: number,
  address: string,
  Fk_User: number,
  myAppointments: Appointment[],  
  user: User
}

export interface AuthData {
  token: string,
  userLogin: User,
}
export interface arrText {
  email: string,
  name: string,
  address: string,
  password: string,
  repeatPassword: string
};
export interface arrBool {
  email: boolean,
  name: boolean,
  address: boolean,
  password: boolean,
  repeatPassword: boolean
};
export interface authText {
  email: string,
  password: string,
};
export interface authBool {
  email: boolean,
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
  patient: Patient,
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
  homeData: Doctor,
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
  id: 0, fullName: '',
  photo: {
    id: 0,
    url: 'https://docplus.kg/img/noavatar.png',
    createdAt: '',
    removed: false
  },
  enum_Role: 0, fk_Photo: 0, enum_Gender: 0, phone: '', email: ''
}
/**{
    uid: '', title: '', fk_Supervisor: '', fk_Image: '', fk_Status: 0, fk_Home: '', createdAt: new Date, editedAt: new Date, removed: false
  } */
  export const initPatient: Patient = {        
    id: 0,
    address: '',
    Fk_User: 0,
    myAppointments: [],
    user: initialUser
}
export const InitSpeciality: Speciality  ={
  id: 0,
  nameSpeciality: '',
}
export const InitPlaceOfWork: PlaceOfWork  ={
  id: 0,
  namePlace: '',
}
export const InitialImage = { uid: '', url: '', removed: false, createdAt: '' }
export const InitialDoctor: Doctor = {
  id: 0, 
  fk_Speciality: 0,
  fk_PlaceOfWork: 0,
  enum_Category: 0,
  rating: 0,
  fk_User: 0,
  appointments: [],
  speciality: InitSpeciality,
  placeOfWork: InitPlaceOfWork,
  user: initialUser,
}
// export const initArrBool: arrBool = {
//   email: false,
//   name: false,
//   address: false,
//   password: false,
//   repeatPassword: false
// };
// export const initArrTxt: arrText = {
//   email: '',
//   name: '',
//   address: '',
//   password: '',
//   repeatPassword: ''
// };
// export const initArrColor: arrText = {
//   email: ColorApp,
//   name: ColorApp,
//   address: ColorApp,
//   password: ColorApp,
//   repeatPassword: ColorApp
// };

export const initAuthBool: authBool = {
  email: false,
  password: false,
};
export const initAuthTxt: authText = {
  email: '',
  password: '',
};
export const initAuthColor: authText = {
  email: ColorApp,
  password: ColorApp,
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


// export const initAdvAnswer: Answer = {
//   uid: '',
//   option: '',
//   count: 0
// };
// export const initVoted: Voted = {  
//   fk_User: '',
//   fk_Voting: ''
// }
// export const initAdvVoting: Voting = {
//   uid: '',
//   title: '',
//   options: [initAdvAnswer],
//   isMulti: false,
//   yourOption: '',
//   voteds: [initVoted],  
//   totalVotes: 0
// };
// export const initAdvText: Advert = {
//   uid: '',
//   text: '',
//   title: '',
//   category: '',
//   voting: [initAdvVoting],
// };

// export const advAnswer: Answer = {
//   uid: '', 
//   option: '',
//   count: 0
// };
// export const advVoting: Voting = {
//   uid: '', 
//   title: '',
//   options: [initAdvAnswer],
//   isMulti: false,
//   yourOption: '',
//   voteds: [initVoted],  
//   totalVotes: 0
// };
// export const advert: Advert = {
//   uid: '', 
//   text: '',
//   title: '',
//   category: '',
//   voting: [initAdvVoting],
// };