import {createStackNavigator} from 'react-navigation-stack';
import {NotAuthNAVIGATION, NAVIGATIONAdmin, NAVIGATIONUser, PROFILE, AUTH, REGISTRATION, 
    DOCTORProfile, LISTDoctorsScreen} from './routes'
import {AuthScreen, RegistrationScreen, ListDoctorsScreen, DoctorProfile, ProfileScreen } from './components'
import NotAuthNavigation from './NotAuthNavigation'
import NavigationAdmin from './NavigationAdmin'
import NavigationUser from './NavigationUser'

export default createStackNavigator(
    {
        [NotAuthNAVIGATION]: NotAuthNavigation,
        [NAVIGATIONAdmin]: NavigationAdmin,
        [NAVIGATIONUser]: NavigationUser,
        [PROFILE]: ProfileScreen,
        [DOCTORProfile]: DoctorProfile,
        [AUTH]: AuthScreen,
        [REGISTRATION]: RegistrationScreen,
        [LISTDoctorsScreen]: ListDoctorsScreen,
    },
    {
        headerMode: 'none'
    }
)
