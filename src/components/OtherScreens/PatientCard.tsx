import React, { Component } from 'react';
import {
    StyleSheet, ScrollView, View, Text, Alert,
    ActivityIndicator, RefreshControl
} from 'react-native';
import { Header, globalStyles } from '..';
import { h, w, ColorApp, serverUrl, Background, IndicatorApp, colorError, BackgroundColor, categories } from '../../constants'
import { User, arrText, arrBool, Patient, Speciality, PlaceOfWork } from '../../interfaces'
import { actions, store } from '../../store'
import { Icon, Card, Input } from 'react-native-elements'
import { TextInput, Modal, Portal, Button, Provider, List } from 'react-native-paper';
import { Dropdown, DropDownData } from 'react-native-material-dropdown';
import { AUTH } from '../../routes';

interface Props { }
interface State {
    // data: DoctorDropDownData,
    // email: string,
    // name: string,
    // idSpeciality: string,
    // idPlaceOfWork: string,
    // idCategory: string,
    // password: string,
    // visibility: boolean,
    // width: number,
    // loadError: boolean,
    // load: boolean,
    // submit: boolean,
    // disBtn: boolean,
    // refreshing: boolean,
    // speciality: string,
    // disBtnSpec: boolean,
    // placeOfWork: string,
    // disBtnPlaceOfW: boolean,
    // badEnter: BadEnterBool,
    // errorText: ErrorText,
    // colorField: colorField
}
// interface BadEnterBool {    
//     email: boolean,
//     name: boolean,
//     idSpeciality: boolean,
//     idPlaceOfWork: boolean,
//     idCategory: boolean,
//     password: boolean,
//     speciality: boolean,
//     placeOfWork: boolean,
// }
// interface ErrorText {
//     email: string,
//     name: string,
//     idSpeciality: string,
//     idPlaceOfWork: string,
//     idCategory: string,
//     password: string,
//     speciality: string,
//     placeOfWork: string
// }
// interface colorField {
//     email: string,
//     name: string,
//     idSpeciality: string,
//     idPlaceOfWork: string,
//     idCategory: string,
//     password: string,
//     button: string,
//     speciality: string,
//     placeOfWork: string,
//     buttonS: string,
//     buttonPW: string,
// }
interface DoctorFetch {
    speciality: Speciality[],
    placeOfWork: PlaceOfWork[],
}
interface DoctorDropDownData {
    specialities: DropDownData[],
    placesW: DropDownData[],
}
var data: DoctorDropDownData = {
    specialities: [],
    placesW: []
}
var actColor = '#8b00ff'
var disColor = '#666'

class PatientCard extends Component<any, State, Props> {
    state = {
        data, diagnosis: '', recommendations: '', idSpeciality: '', idPlaceOfWork: '', idCategory: '',
        password: '', visibility: false, width: 1, loadError: false, load: false,
        submit: false, disBtn: true, refreshing: false,
        speciality: '', disBtnSpec: true, placeOfWork: '', disBtnPlaceOfW: true,
        badEnter: {
            diagnosis: false,
            recommendations: false,
            idSpeciality: false,
            idPlaceOfWork: false,
            idCategory: false,
            password: false,
            speciality: false,
            placeOfWork: false
        },
        errorText: {
            diagnosis: '',
            recommendations: '',
            idSpeciality: '',
            idPlaceOfWork: '',
            idCategory: '',
            password: '',
            speciality: '',
            placeOfWork: ''
        },
        colorField: {
            email: actColor,
            name: actColor,
            idSpeciality: actColor,
            idPlaceOfWork: actColor,
            idCategory: actColor,
            password: disColor,
            button: disColor,
            speciality: actColor,
            placeOfWork: actColor,
            buttonS: disColor,
            buttonPW: disColor,
        }
    }

    componentDidMount = async () => {
        console.log('Props DoctorCreationScreen', this.props)
        this.setState({ loadError: false })
        var { data } = this.state
        var logAction = 'Админ страница';
        try {
            const { userLogin, patient, token } = store.state;
            if (token) {
                const response = await fetch(serverUrl + 'admin/dataDoctor',
                    {
                        method: 'GET', // *GET, POST, PUT, DELETE, etc.
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                var dataFetch: DoctorFetch = await response.json()
                if (response.status == 200) {
                    console.log('Успех fetch ' + logAction, 'idSpeciality: ' + dataFetch.speciality + ', idPlaceOfWork: ' + dataFetch.placeOfWork)
                    dataFetch.speciality.forEach((el: Speciality, id) => {
                        var initSpec: DropDownData = {
                            value: '',
                            label: ''
                        }
                        data.specialities.push(initSpec);
                        data.specialities[id].label = el.nameSpeciality
                        data.specialities[id].value = el.id
                    });
                    dataFetch.placeOfWork.forEach((el: PlaceOfWork, id) => {
                        var initPlacesW: DropDownData = {
                            value: '',
                            label: ''
                        }
                        data.placesW.push(initPlacesW);
                        data.placesW[id].label = el.namePlace
                        data.placesW[id].value = el.id
                    });
                    this.setState({ data, load: true })
                }
                else if (response.status == 404) {
                    console.log('Внимание', 'Информация не найдена');
                    this.setState({ loadError: true })
                }
            }
        } catch (error) {
            console.log('Внимание', 'Ошибка ' + logAction + ' Post fetch: ' + error);
            if (error == 'TypeError: Network request failed') {
                Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);

                this.setState({ loadError: true })
            }
            else if (error.status == 404) {
                console.log('Внимание', 'Информация не найдена: ' + error, [{ text: 'OK' }]);
            }
            else {
                Alert.alert('Внимание', 'Ошибка сервера: ' + error, [{ text: 'OK' }]);
            }
            this.setState({ loadError: true })
            return
        }
    }



    render() {
        const { navigation } = this.props
        const { indicator } = globalStyles
        const { refreshing, submit } = this.state
        return (
            <View style={{ height: h }}>
                <Header title={'Заполнение карты'}
                    leftIcon={'arrow-back'}
                    onPressLeft={() => {
                        navigation.goBack();
                    }}
                />
                <View >
                    {Background}
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={this.setClearState.bind(this)} />
                    }>
                    {this.createADoctor()}
                   

                    {submit && <Provider>
                        <Portal>
                            <Modal visible={submit} >
                                <ActivityIndicator style={indicator} size={70} color={IndicatorApp} />
                            </Modal>
                        </Portal>
                    </Provider>}
                    <View style={{ margin: 90 }}><Text> </Text></View>
                </ScrollView>

            </View>
        );
    }

    private createADoctor() {
        const { data, diagnosis, recommendations, idSpeciality, idPlaceOfWork, idCategory, password, visibility,
            badEnter, errorText, colorField, submit, width, disBtn, } = this.state
        const { fixToText, fixToTextElem, textInput, input, buttonContainer, buttonTitle,
            indicator, error, sectionContainer1, sectionTitle1 } = locStyles
        const { im, cardStyle, inputStyle, textInputPaper, inputPaper, contStyle, buttonWM,
            dropdownStyle, inputMultiline } = globalStyles

        return (<View>
            <List.Section>
                <List.Accordion
                    title={"Добавить карту"}
                    left={props => <List.Icon {...props} icon="briefcase-plus" />}
                    style={sectionContainer1}
                    titleStyle={sectionTitle1}
                >
                    <Card containerStyle={cardStyle} >
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <TextInput
                                    style={[inputPaper, inputStyle]}
                                    mode='outlined'
                                    onChangeText={this.onChangeName.bind(this)}
                                    label='Диагноз'
                                    autoCompleteType='name'
                                    value={diagnosis}
                                    onEndEditing={() => this.onCheckName(diagnosis)}
                                    disabled={submit}
                                    error={badEnter.diagnosis}
                                    theme={{ colors: { primary: colorField.name } }}
                                />
                                {badEnter.diagnosis && <Text style={error}>{errorText.diagnosis}</Text>}
                            </View>
                        </View>
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <TextInput
                                    style={[inputPaper, inputStyle]}
                                    mode='outlined'
                                    onChangeText={this.onChangeEmail.bind(this)}
                                    label='Рекомендации'
                                    underlineColorAndroid={colorField.email}
                                    autoCompleteType='name'
                                    value={recommendations}
                                    onEndEditing={() => this.onCheckEmail(recommendations)}
                                    disabled={submit}
                                    error={badEnter.recommendations}
                                    theme={{ colors: { primary: colorField.email } }}
                                />
                                {badEnter.recommendations && <Text style={error}>{errorText.recommendations}</Text>}
                            </View>
                        </View>
                       
                        <View style={{ alignItems: 'center' }}>
                            <View style={buttonWM}>
                                <Button
                                    mode="contained"
                                    uppercase={false}
                                    onPress={this.onCreationDoctor.bind(this)}
                                    disabled={disBtn}
                                    loading={submit}
                                    contentStyle={[buttonContainer, { backgroundColor: colorField.button }]}
                                    labelStyle={buttonTitle}>Сохранить</Button>
                            </View>
                        </View>
                    </Card>

                </List.Accordion>
            </List.Section>
        </View>
        )
    }

    private checkFields() {
        const { recommendations, diagnosis, badEnter, colorField } = this.state
        if (recommendations && diagnosis  &&
            !badEnter.recommendations && !badEnter.diagnosis ) {
            colorField.button = ColorApp;
            this.setState({ disBtn: false, colorField })
        }
        else {
            colorField.button = disColor;
            this.setState({ disBtn: true, colorField })
        }
    }

    private onChangeEmail(recommendations: string) {
        var { badEnter, errorText, colorField } = this.state
        if (recommendations == ' ') { return }
        if (!recommendations) {
            badEnter.recommendations= true;
            errorText.recommendations = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ errorText, disBtn: true, colorField });
            return;
        }
        else if (recommendations.trim().length > 5 && recommendations.trim().length < 100) {
            badEnter.recommendations = false;
            colorField.name = 'green'
        }
        this.setState({ recommendations, badEnter });
        this.checkFields()
       
    }
    private onCheckEmail(recommendations: string) {
        var { badEnter, errorText, colorField } = this.state
        if (!recommendations) {
            badEnter.recommendations = true;
            errorText.recommendations = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, recommendations, disBtn: true, colorField });
            return;
        }
        else if (recommendations.trim().length > 5 && recommendations.trim().length < 100) {
            badEnter.recommendations = false;
            colorField.name = 'green'
        }
       
    }
    private onChangeName(diagnosis: string) {
        var { badEnter, errorText, colorField } = this.state
        if (diagnosis == ' ') { return }
        if (!diagnosis) {
            badEnter.diagnosis = true;
            errorText.diagnosis = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ errorText, disBtn: true, colorField });
            return;
        }
        else if (diagnosis.trim().length > 5 && diagnosis.trim().length < 100) {
            badEnter.diagnosis = false;
            colorField.name = 'green'
        }
        this.setState({ diagnosis, badEnter });
        this.checkFields()
    }
    private onCheckName(diagnosis: string) {
        var { badEnter, errorText, colorField } = this.state
        if (diagnosis.trim().length < 6 || diagnosis.trim().length > 100) {
            badEnter.diagnosis = true;
            errorText.diagnosis = ' Слишком короткий диагноз' 
            colorField.button = disColor;
            this.setState({ badEnter, errorText, diagnosis, disBtn: true, colorField })
            return;
        }
        else {
            this.setState({ diagnosis: diagnosis.trim() });
        }
    }
   
   

    private onCreationDoctor() {
        const { recommendations, diagnosis, idSpeciality, idPlaceOfWork, idCategory, badEnter, password } = this.state
        const { navigation } = this.props
        var $this = this;
        var obj, url, log: string;
const idpatient: number = this.props.navigation.state.params
        const { userLogin, patient, token } = store.state;
        obj = {
            Diagnosis: diagnosis,
            Recommendations: recommendations,
            Fk_Doctor: userLogin.id,
            Fk_Patient: idpatient,
        }
        url = serverUrl + 'patientCard/creationCard/';
        log = 'Добавление карты'

        console.log('email: ' + recommendations + ', ФИО: ' + diagnosis + ', idSpeciality: ' + idSpeciality
            + ', idPlaceOfWork: ' + idPlaceOfWork + ', idCategory: ' + idCategory)
        console.log('badEnter.email: ' + badEnter.recommendations + ' badEnter.name: ' + badEnter.diagnosis +
            ' badEnter.idSpeciality: ' + badEnter.idSpeciality + ' badEnter.idPlaceOfWork: ' + badEnter.idPlaceOfWork)

        this.setState({ submit: true, disBtn: true })
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj),
        })
            .then(function (response) {
                if (response.status == 200 || response.status == 201) {
                    console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
                    console.log(response);
                    Alert.alert('Успех', 'Карта заполнена',// 'Сообщите ему его пароль: '+password,
                        [{ text: 'OK' }]);
                    $this.setState({ submit: false, disBtn: false });
                    $this.setClearState();
                    //return response.json();
                }
                else if (response.status == 500) {
                    console.log('Server Error', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                else if (response.status == 400) {
                    console.log('Bad Request', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'Пользователь с таким email уже существует',
                        [{ text: 'OK' }]);
                }
                else {
                    console.log(response.statusText, "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false });
                return response.status
            })
            // .then(function (data: AuthData) {
            //     console.log('data: ', data);
            //     if (data) {
            //         $this.setClearState();
            //         navigation.navigate(AUTH, data);
            //     }
            // })
            .catch(error => {
                console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
                if (error == 'TypeError: Network request failed') {
                    Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
                }
                else {
                    Alert.alert('Внимание', 'Ошибка входа. ' + error, [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false })
                return
            });
    }

    private createASpeciality() {
        const { speciality, badEnter, errorText, colorField, submit, disBtnSpec } = this.state
        const { fixToText, buttonContainer, buttonTitle,
            indicator, error, sectionContainer1, sectionTitle1 } = locStyles
        const { cardStyle, inputStyle, textInputPaper, inputPaper, buttonWM } = globalStyles

        return (<View>
            <List.Section>
                <List.Accordion
                    title={"Добавить должность"}
                    left={props => <List.Icon {...props} icon="tooltip-plus" />}
                    style={sectionContainer1}
                    titleStyle={sectionTitle1}
                >
                    <Card containerStyle={cardStyle} >
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <TextInput
                                    style={[inputPaper, inputStyle]}
                                    mode='outlined'
                                    onChangeText={this.onChangeSpeciality.bind(this)}
                                    label='Должность'
                                    value={speciality}
                                    disabled={submit}
                                    error={badEnter.speciality}
                                    theme={{ colors: { primary: colorField.speciality } }}
                                />
                                {badEnter.speciality && <Text style={error}>{errorText.speciality}</Text>}
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={buttonWM}>
                                <Button
                                    mode="contained"
                                    uppercase={false}
                                    onPress={this.onCreationSpeciality.bind(this)}
                                    disabled={disBtnSpec}
                                    loading={submit}
                                    contentStyle={[buttonContainer, { backgroundColor: colorField.buttonS }]}
                                    labelStyle={buttonTitle}>Сохранить</Button>
                            </View>
                        </View>
                    </Card>

                </List.Accordion>
            </List.Section>
        </View>
        )
    }

    private onChangeSpeciality(speciality: string) {
        var { badEnter, errorText, colorField } = this.state
        if (speciality == ' ') { return }
        if (!speciality) {
            badEnter.speciality = true;
            errorText.speciality = 'Поле не заполнено!'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, disBtnSpec: true, colorField });
            return;
        }
        else {
            badEnter.speciality = false;
            colorField.speciality = 'green'
            colorField.buttonS = ColorApp;
            this.setState({ speciality, colorField, badEnter, disBtnSpec: false, });
        }
    }

    private onCreationSpeciality() {
        const { speciality, badEnter } = this.state
        var $this = this;
        var obj, url, log: string;

        const { token } = store.state;
        obj = {
            NameSpeciality: speciality
        }
        url = serverUrl + 'admin/creationSpeciality/';
        log = 'Добавление должности'

        console.log('speciality: ' + speciality)
        console.log('badEnter.speciality: ' + badEnter.speciality)

        this.setState({ submit: true, disBtn: true })
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj),
        })
            .then(function (response) {
                if (response.status == 200 || response.status == 201) {
                    console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
                    console.log(response);
                    Alert.alert('Успех', 'Должность создана',
                        [{ text: 'OK' }]);
                    $this.setState({ submit: false, disBtn: false });
                    $this.setClearState();
                }
                else if (response.status == 500) {
                    console.log('Server Error', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                else if (response.status == 400) {
                    console.log('Bad Request', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'неверный запрос - 400',
                        [{ text: 'OK' }]);
                }
                else {
                    console.log(response.statusText, "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false });
                return response.status
            })
            .catch(error => {
                console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
                if (error == 'TypeError: Network request failed') {
                    Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
                }
                else {
                    Alert.alert('Внимание', 'Ошибка: ' + error, [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false })
                return
            });
    }

    private createAPlaceOfWork() {
        const { placeOfWork, badEnter, errorText, colorField, submit, disBtnPlaceOfW, } = this.state
        const { fixToText, buttonContainer, buttonTitle,
            indicator, error, sectionContainer1, sectionTitle1 } = locStyles
        const { cardStyle, inputStyle, textInputPaper, inputPaper, buttonWM } = globalStyles

        return (<View>
            <List.Section>
                <List.Accordion
                    title={"Добавить место работы"}
                    left={props => <List.Icon {...props} icon="book-multiple-plus" />}
                    style={sectionContainer1}
                    titleStyle={sectionTitle1}
                >
                    <Card containerStyle={cardStyle} >
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <TextInput
                                    style={[inputPaper, inputStyle]}
                                    mode='outlined'
                                    onChangeText={this.onChangePlaceOfWork.bind(this)}
                                    label='Место работы'
                                    value={placeOfWork}
                                    disabled={submit}
                                    error={badEnter.placeOfWork}
                                    theme={{ colors: { primary: colorField.placeOfWork } }}
                                />
                                {badEnter.placeOfWork && <Text style={error}>{errorText.placeOfWork}</Text>}
                            </View>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <View style={buttonWM}>
                                <Button
                                    mode="contained"
                                    uppercase={false}
                                    onPress={this.onCreationPlaceOfWork.bind(this)}
                                    disabled={disBtnPlaceOfW}
                                    loading={submit}
                                    contentStyle={[buttonContainer, { backgroundColor: colorField.buttonPW }]}
                                    labelStyle={buttonTitle}>Сохранить</Button>
                            </View>
                        </View>
                    </Card>

                </List.Accordion>
            </List.Section>
        </View>
        )
    }
    private onChangePlaceOfWork(placeOfWork: string) {
        var { badEnter, errorText, colorField } = this.state
        if (placeOfWork == ' ') { return }
        if (!placeOfWork) {
            badEnter.placeOfWork = true;
            colorField.placeOfWork = 'red'
            errorText.placeOfWork = 'Поле не заполнено!'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, disBtnPlaceOfW: true, colorField });
            return;
        }
        else {
            badEnter.idPlaceOfWork = false;
            colorField.idPlaceOfWork = 'green'
            colorField.buttonPW = ColorApp;
            this.setState({ placeOfWork, colorField, badEnter, disBtnPlaceOfW: false });
        }
    }

    private onCreationPlaceOfWork() {
        const { placeOfWork, badEnter } = this.state
        var $this = this;
        var obj, url, log: string;

        const { token } = store.state;
        obj = {
            NamePlace: placeOfWork
        }
        url = serverUrl + 'admin/creationPlaceOfWork/';
        log = 'Добавление должности'

        console.log('placeOfWork: ' + placeOfWork)
        console.log('badEnter.placeOfWork: ' + badEnter.placeOfWork)

        this.setState({ submit: true, disBtnPlaceOfW: true })
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(obj),
        })
            .then(function (response) {
                if (response.status == 200 || response.status == 201) {
                    console.log('Успех ' + log + ' Post статус: ' + response.status + ' ok: ' + response.ok);
                    console.log(response);
                    Alert.alert('Успех', 'Место работы создано',
                        [{ text: 'OK' }]);
                    $this.setState({ submit: false, disBtnPlaceOfW: false });
                    $this.setClearState();
                }
                else if (response.status == 500) {
                    console.log('Server Error', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'Ошибка сервера. Status: ' + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                else if (response.status == 400) {
                    console.log('Bad Request', "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', 'неверный запрос - 400',
                        [{ text: 'OK' }]);
                }
                else {
                    console.log(response.statusText, "Status: " + response.status + ' ' + response)
                    Alert.alert('Внимание', response.statusText + " Status: " + response.status + ' ' + response,
                        [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false });
                return response.status
            })
            .catch(error => {
                console.log('Внимание', 'Ошибка ' + log + ' Post fetch: ' + error);
                if (error == 'TypeError: Network request failed') {
                    Alert.alert('Внимание', 'Сервер не доступен, попробуйте позже', [{ text: 'OK' }]);
                }
                else {
                    Alert.alert('Внимание', 'Ошибка: ' + error, [{ text: 'OK' }]);
                }
                $this.setState({ submit: false, disBtn: false })
                return
            });
    }


    private setClearState() {
        var data: DoctorDropDownData = {
            specialities: [],
            placesW: []
        }
        this.setState({
            data, email: '', name: '', idSpeciality: '', idPlaceOfWork: '', idCategory: '',
            password: '', visibility: false, width: 1,
            submit: false, disBtn: true, refreshing: false,
            speciality: '', disBtnSpec: true, placeOfWork: '', disBtnPlaceOfW: true,
            badEnter: {
                email: false,
                name: false,
                idSpeciality: false,
                idPlaceOfWork: false,
                idCategory: false,
                password: false,
                speciality: false,
                placeOfWork: false
            },
            errorText: {
                email: '',
                name: '',
                idSpeciality: '',
                idPlaceOfWork: '',
                idCategory: '',
                password: '',
                speciality: '',
                placeOfWork: ''
            },
            colorField: {
                email: actColor,
                name: actColor,
                idSpeciality: actColor,
                idPlaceOfWork: actColor,
                idCategory: actColor,
                password: disColor,
                button: disColor,
                speciality: actColor,
                placeOfWork: actColor,
                buttonS: disColor,
                buttonPW: disColor,
            }
        })
        this.componentDidMount()
    }
}

const locStyles = StyleSheet.create({
    textInput: {
        width: w * 0.9,
    },
    input: {
        borderRadius: 3,
        padding: 10,
        height: 42,
    },
    inputMultiline: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignContent: 'center',
    },
    flex: {
        margin: 120,
        textAlign: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 200,
    },
    fixToText: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fixToTextElem: {
        marginTop: 20,
        marginBottom: 3,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonContainer: {
        backgroundColor: ColorApp,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    buttonTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'normal'
    },
    error: {
        marginTop: 5,
        color: colorError,
        marginHorizontal: 10,
    },
    sectionContainer1: {
        height: 50,
        borderRadius: 7,
        marginTop: 15,
        width: w,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#00B2D4',
    },
    sectionTitle1: {
        fontSize: 18,
        textAlign: 'left',
        color: '#fff'
    },
    indicator: {
        marginTop: h * 0.4,
        position: 'absolute',
        alignSelf: 'center',
    },
})

export {PatientCard };