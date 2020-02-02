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

class DoctorCreationScreen extends Component<any, State, Props> {
    state = {
        data, email: '', name: '', idSpeciality: '', idPlaceOfWork: '', idCategory: '',
        password: '', visibility: false, width: 1, loadError: false, load: false,
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
                <Header title={'Админ страница'}
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
                    {this.createASpeciality()}
                    {this.createAPlaceOfWork()}

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
        const { data, email, name, idSpeciality, idPlaceOfWork, idCategory, password, visibility,
            badEnter, errorText, colorField, submit, width, disBtn, } = this.state
        const { fixToText, fixToTextElem, textInput, input, buttonContainer, buttonTitle,
            indicator, error, sectionContainer1, sectionTitle1 } = locStyles
        const { im, cardStyle, inputStyle, textInputPaper, inputPaper, contStyle, buttonWM,
            dropdownStyle, inputMultiline } = globalStyles

        return (<View>
            <List.Section>
                <List.Accordion
                    title={"Добавить доктора"}
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
                                    label='ФИО'
                                    autoCompleteType='name'
                                    value={name}
                                    onEndEditing={() => this.onCheckName(name)}
                                    disabled={submit}
                                    error={badEnter.name}
                                    theme={{ colors: { primary: colorField.name } }}
                                />
                                {badEnter.name && <Text style={error}>{errorText.name}</Text>}
                            </View>
                        </View>
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <Dropdown
                                    data={data.specialities}
                                    onChangeText={this.onChangeSpecialityOp.bind(this)}
                                    value={idSpeciality}
                                    containerStyle={[contStyle]}
                                    pickerStyle={[dropdownStyle, inputMultiline, { marginLeft: w * 0.08, height: 300, width: w * 0.8 }]}
                                    dropdownPosition={0}
                                    disabled={submit}
                                    label='Специальность'
                                />
                                {badEnter.idSpeciality && <Text style={error}>{errorText.idSpeciality}</Text>}
                            </View>
                        </View>
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <Dropdown
                                    data={data.placesW}
                                    onChangeText={this.onChangePlaceOfWorkOp.bind(this)}
                                    value={idPlaceOfWork}
                                    containerStyle={[contStyle]}
                                    pickerStyle={[dropdownStyle, inputMultiline, { marginLeft: w * 0.05, height: 300, width: w * 0.9 }]}
                                    itemTextStyle={{ backfaceVisibility: 'visible' }}
                                    dropdownPosition={0}
                                    disabled={submit}
                                    label='Место работы'
                                />
                                {badEnter.idPlaceOfWork && <Text style={error}>{errorText.idPlaceOfWork}</Text>}
                            </View>
                        </View>
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <Dropdown
                                    data={categories}
                                    onChangeText={this.onChangeCategory.bind(this)}
                                    value={idCategory}
                                    containerStyle={[contStyle]}
                                    pickerStyle={[dropdownStyle, inputMultiline, { marginLeft: w * 0.08, height: 150, width: w * 0.8 }]}
                                    dropdownPosition={0}
                                    disabled={submit}
                                    animationDuration={8}
                                    label='Категория'
                                />
                                {badEnter.idCategory && <Text style={error}>{errorText.idCategory}</Text>}
                            </View>
                        </View>
                        <View style={fixToText}>
                            <View style={textInputPaper}>
                                <TextInput
                                    style={[inputPaper, inputStyle]}
                                    mode='outlined'
                                    onChangeText={this.onChangeEmail.bind(this)}
                                    label='Email'
                                    underlineColorAndroid={colorField.email}
                                    autoCompleteType='email'
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    value={email}
                                    onEndEditing={() => this.onCheckEmail(email)}
                                    disabled={submit}
                                    error={badEnter.email}
                                    theme={{ colors: { primary: colorField.email } }}
                                />
                                {badEnter.email && <Text style={error}>{errorText.email}</Text>}
                            </View>
                        </View>
                        <View style={fixToTextElem}>
                            <View style={textInput}>
                                <Input
                                    inputContainerStyle={[input, {
                                        borderColor: colorField.password, borderWidth: width,
                                        borderBottomWidth: width
                                    }]}
                                    inputStyle={inputStyle}
                                    onChangeText={this.onChangePassword.bind(this)}
                                    placeholder='Пароль'
                                    secureTextEntry={!visibility}
                                    onTouchStart={this.activePass.bind(this)}
                                    value={password}
                                    onEndEditing={() => this.onCheckPass(password)}
                                    disabled={submit}
                                    rightIcon={visibility ? <Icon name='visibility' onPress={this.onVisibilityPassword.bind(this)} />
                                        : <Icon name='visibility-off' onPress={this.onVisibilityPassword.bind(this)} color='grey' />}
                                />
                                {badEnter.password && <Text style={error}>{errorText.password}</Text>}
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
        const { email, name, idSpeciality, idPlaceOfWork, idCategory, badEnter, colorField, password } = this.state
        if (email && name && idSpeciality && idPlaceOfWork && idCategory && password &&
            !badEnter.email && !badEnter.name && !badEnter.idSpeciality && !badEnter.idPlaceOfWork &&
            !badEnter.idCategory && !badEnter.password) {
            colorField.button = ColorApp;
            this.setState({ disBtn: false, colorField })
        }
        else {
            colorField.button = disColor;
            this.setState({ disBtn: true, colorField })
        }
    }

    private onChangeEmail(email: string) {
        var { badEnter, errorText, colorField } = this.state
        if (email == ' ') { return }
        if (!email) {
            badEnter.email = true;
            errorText.email = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, colorField, email, disBtn: true });
            return;
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.trim()) == false) {
            badEnter.email = true;
            errorText.email = 'Введите корректный e-mail'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, email, disBtn: true, colorField });
            return;
        }
        else {
            colorField.email = 'green'
            badEnter.email = false;
            this.setState({ email, badEnter });
            this.checkFields()
        }
    }
    private onCheckEmail(email: string) {
        var { badEnter, errorText, colorField } = this.state
        if (!email) {
            badEnter.email = true;
            errorText.email = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, email, disBtn: true, colorField });
            return;
        }
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email.trim()) == false) {
            badEnter.email = true;
            errorText.email = 'Введите корректный e-mail'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, email, disBtn: true, colorField });
            return;
        }
        else {
            badEnter.email = false;
            colorField.email = 'green'
            this.setState({ email: email.trim(), badEnter });
            this.checkFields()
        }
    }
    private onChangeName(name: string) {
        var { badEnter, errorText, colorField } = this.state
        if (name == ' ') { return }
        if (!name) {
            badEnter.name = true;
            errorText.name = 'Поле не заполнено'
            colorField.button = disColor;
            this.setState({ errorText, disBtn: true, colorField });
            return;
        }
        else if (name.trim().length > 5 && name.trim().length < 100) {
            badEnter.name = false;
            colorField.name = 'green'
        }
        this.setState({ name, badEnter });
        this.checkFields()
    }
    private onCheckName(name: string) {
        var { badEnter, errorText, colorField } = this.state
        if (name.trim().length < 6 || name.trim().length > 100) {
            badEnter.name = true;
            errorText.name = 'ФИО должно быть больше 5 символов и меньше 100'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, name, disBtn: true, colorField })
            return;
        }
        else {
            this.setState({ name: name.trim() });
        }
    }
    private onChangeSpecialityOp(idSpeciality: string) {
        var { badEnter, errorText, colorField } = this.state
        if (idSpeciality == ' ') { return }
        if (!idSpeciality) {
            badEnter.idSpeciality = true;
            colorField.idSpeciality = 'red'
            errorText.idSpeciality = 'Поле не заполнено!'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, disBtn: true, colorField });
            return;
        }
        else {
            badEnter.idSpeciality = false;
            colorField.idSpeciality = 'green'
            this.setState({ idSpeciality, colorField, badEnter });
            this.checkFields()
        }
    }
    private onChangePlaceOfWorkOp(idPlaceOfWork: string) {
        var { badEnter, errorText, colorField } = this.state
        if (idPlaceOfWork == ' ') { return }
        if (!idPlaceOfWork) {
            badEnter.idPlaceOfWork = true;
            colorField.idPlaceOfWork = 'red'
            errorText.idPlaceOfWork = 'Поле не заполнено!'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, disBtn: true, colorField });
            return;
        }
        else {
            badEnter.idPlaceOfWork = false;
            colorField.idPlaceOfWork = 'green'
            this.setState({ idPlaceOfWork, colorField, badEnter });
            this.checkFields()
        }
    }
    private onChangeCategory(idCategory: string) {
        var { badEnter, errorText, colorField } = this.state
        if (idCategory == ' ') { return }
        if (!idCategory) {
            badEnter.idCategory = true;
            colorField.idCategory = 'red'
            errorText.idCategory = 'Поле не заполнено!'
            colorField.button = disColor;
            this.setState({ badEnter, errorText, idCategory, disBtn: true, colorField });
            return;
        }
        else {
            badEnter.idCategory = false;
            colorField.idCategory = 'green'
            this.setState({ idCategory, colorField, badEnter });
            this.checkFields()
        }
    }
    private activePass() {
        var { colorField } = this.state
        colorField.idPlaceOfWork = actColor
        this.setState({ colorField, width: 2 });
    }
    private onChangePassword(password: string) {
        var { badEnter, errorText, colorField } = this.state
        if (password == ' ') { return }
        if (password.trim().length >= 8) {
            badEnter.password = false
            colorField.password = 'green'
            colorField.button = disColor;
            this.setState({ disBtn: true });
        }
        else {
            colorField.password = actColor
        }
        this.setState({ password: password.trim(), colorField });
        this.checkFields()
    }
    private onCheckPass(pass: string) {
        var { badEnter, errorText, colorField } = this.state
        if (pass.trim().length < 8) {
            badEnter.password = true;
            errorText.password = 'Пароль должен иметь длину не менее 8 знаков'
            colorField.password = colorError
            colorField.button = disColor;
            this.setState({ badEnter, errorText, colorField, disBtn: true, width: 2 });
            return;
        }
    }

    private onVisibilityPassword() {
        var { visibility } = this.state
        this.setState({ visibility: !visibility })
    }

    private onCreationDoctor() {
        const { email, name, idSpeciality, idPlaceOfWork, idCategory, badEnter, password } = this.state
        const { navigation } = this.props
        var $this = this;
        var obj, url, log: string;

        const { userLogin, patient, token } = store.state;
        obj = {
            Email: email,
            FullName: name,
            Fk_Speciality: idSpeciality,
            Fk_PlaceOfWork: idPlaceOfWork,
            Enum_Category: idCategory,
            Password: password,
        }
        url = serverUrl + 'admin/creationDoctor/';
        log = 'Добавление доктора'

        console.log('email: ' + email + ', ФИО: ' + name + ', idSpeciality: ' + idSpeciality
            + ', idPlaceOfWork: ' + idPlaceOfWork + ', idCategory: ' + idCategory)
        console.log('badEnter.email: ' + badEnter.email + ' badEnter.name: ' + badEnter.name +
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
                    Alert.alert('Успех', 'Врач создан',// 'Сообщите ему его пароль: '+password,
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

export { DoctorCreationScreen };