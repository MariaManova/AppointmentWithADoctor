import {createStackNavigator} from 'react-navigation-stack';
import {NotAuthNAVIGATION, NAVIGATIONAdmin, NAVIGATIONDoctor, CHAT, NAVIGATIONUser, PROFILE, AUTH, REGISTRATION, LISTDoctorsScreenTwo ,
    DOCTORProfile, LISTDoctorsScreen, DOCTORProfileTwo, LISTChatScreenPatient, CHATTWO, PATIENTCARD} from './routes'
import {AuthScreen, RegistrationScreen, ListDoctorsScreen, DoctorProfile, ProfileScreen } from './components'
import NotAuthNavigation from './NotAuthNavigation'
import NavigationDoctor from './NavigationDoctor'
import NavigationAdmin from './NavigationAdmin'
import NavigationUser from './NavigationUser'
import { DoctorProfileTwo } from './components/DoctorTab/DoctorProfileTwo'
import {Chat} from './components/OtherScreens/Chat';
import { ListChatScreenPatient } from './components/OtherScreens/ListChatScreenPatient';
import { ChatTwo } from './components/OtherScreens/ChatTwo';
import { PatientCard } from './components/OtherScreens/PatientCard';


export default createStackNavigator(
    {
        [NotAuthNAVIGATION]: NotAuthNavigation,
        [NAVIGATIONAdmin]: NavigationAdmin,
        [NAVIGATIONUser]: NavigationUser,
        [NAVIGATIONDoctor]: NavigationDoctor,
        [PROFILE]: ProfileScreen,
        [DOCTORProfile]: DoctorProfile,
        [DOCTORProfileTwo]: DoctorProfileTwo,
        [AUTH]: AuthScreen,
        [REGISTRATION]: RegistrationScreen,
        [LISTDoctorsScreen]: ListDoctorsScreen,
        [CHAT]: Chat,
        [CHATTWO]: ChatTwo,
        [LISTChatScreenPatient]: ListChatScreenPatient,
        [PATIENTCARD]: PatientCard,
       
    },
    {
        headerMode: 'none'
    }
)
