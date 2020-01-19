import {createStackNavigator} from 'react-navigation-stack';
import {NotAuthNAVIGATION, NAVIGATIONAdmin, NAVIGATIONUser, PROFILE, AUTH, REGISTRATION, 
    DOCTORProfile, LISTDoctorsScreen} from './routes'
import {AuthScreen, RegistrationScreen, ListDoctorsScreen, DoctorProfile } from './components'
import NotAuthNavigation from './NotAuthNavigation'

export default createStackNavigator(
    {
        [NotAuthNAVIGATION]: NotAuthNavigation,
        [DOCTORProfile]: DoctorProfile,
        [AUTH]: AuthScreen,
        [REGISTRATION]: RegistrationScreen,
        [LISTDoctorsScreen]: ListDoctorsScreen,
    },
    {
        headerMode: 'none'
    }
)
