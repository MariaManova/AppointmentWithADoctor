## Mobile Client TypeScript + React Native 
Мобильное приложение для записи к врачу

### Сервер AppointmentDoctorApi .NET CORE 2.1
Находится здесь -> [AppointmentDoctorApi](https://github.com/MariaManova/AppointmentDoctorApi)

--------------
### Инструкция по развертыванию клиента React Native приведена ниже:
1. Скачиваем дистрибутивы для разработки: 
    * nodejs – https://nodejs.org/en/download/;
    * python3 – https://www.python.org/downloads/;
    * jdk8 – https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
    - Если вы уже установили Node в своей системе, убедитесь, что это Node 8.3 или новее. Если у вас уже есть JDK в вашей системе, убедитесь, что это версия 8 или новее;
2. Установите Android Studio:
    * Скачайте и установите Android Studio. Выберите «Пользовательские» настройки, когда будет предложено выбрать тип установки. Убедитесь, что установлены флажки рядом со всем следующим:
        1. Android SDK;
        2. Android SDK Platform;
        3. Performance (Intel ® HAXM);
        4. Android Virtual Device;
    Затем нажмите «Далее», чтобы установить все эти компоненты;
    * С экрана «Добро пожаловать в Android Studio». Нажмите «Настроить», затем выберите «SDK Manager». 
    * Выберите вкладку «Платформы SDK» в Диспетчере SDK, затем установите флажок рядом с «Показать сведения о пакете» в правом нижнем углу. Найдите и разверните Android 9 (Pie) запись, затем убедитесь, что проверены следующие элементы:
        1. Android SDK Platform 28
        2. Intel x86 Atom_64 System Image или же Google APIs Intel x86 Atom System Image
    * Затем выберите вкладку «Инструменты SDK» и установите флажок рядом с «Показать сведения о пакете». Найдите и разверните запись «Android SDK Build-Tools», затем убедитесь, что 28.0.3 она выбрана.
    * Наконец, нажмите «Применить», чтобы загрузить и установить Android SDK и соответствующие инструменты сборки.
3. Настройте переменную среды ANDROID_HOME:
    * откройте панель управления Windows -> раздел «Система и безопасность» -> панель «Система»;
    * затем нажмите «Изменить настройки». Откройте вкладку «Дополнительно» и нажмите « Переменные среды»;
    * Нажмите «Создать...», чтобы создать новую ANDROID_HOME переменную пользователя, которая указывает путь к вашему Android SDK.
    По умолчанию SDK устанавливается в следующем месте:
    ```bash
    c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk
    ```
    * Откройте новое окно командной строки, чтобы убедиться, что новая переменная среды загружена
4. Добавьте инструменты платформы в Path:
    * для изменения переменных среды, можно также воспользоваться поиском меню пуска, введите: «переменных среды», щелкаем по найденному пункту, тем самым попадаем в свойства системы.
    * нажмите «Переменные среды». Щелкните дважды на переменной Path. Нажмите New и добавьте путь к инструментам платформы в список.
    - Расположение по умолчанию для этой папки:  
    ```bash
    c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools
    ```
5. Скачиваем и устанавливаем Visual Studio Code;
    * Проверьте, что в «переменных среды» установился в переменную Path путь: C:\Users\USERNAME\AppData\Local\Programs\Microsoft VS Code\bin
6. Клонирование проекта из Git:
    * Клонируйте проект по ссылке: 
        ```bash
        $ git clone https://github.com/MariaManova/AppointmentWithADoctor.git
        ```
        * в консоле введите путь приложения, и клавишу Enter; 
        * после чего введите команду:  `$ npm i `	
7. Подготовка устройства Android: 
    *	Включить отладку по USB:
        1. Необходимо зайти в Настройки -> «О телефоне», затем коснитесь Build number семь раз. Затем вы вернитесь в Настройки -> Параметры разработчика, и включите «Отладку по USB»
    *	Подключите устройство через USB;
    *	В командной  строке введите:  adb devices. Чтобы убедитться, что ваше устройство правильно подключено к ADB, Android Debug Bridge;
    Вы должны иметь только одно устройство, подключенное одновременно. 
8. Запустите ваше приложение:
    * откройте проект в Visual Studio Code и откройте терминал;
    * введите в терминале следующую команду, чтобы установить и запустить приложение на устройстве:
    ```bash
    npx react-native run-android
    ```

------------------
### Для создания нового проекта, необходимо: 
1.  Выполнить в командной строке: 
```bash
$ npm i -g react-native-cli
$ react-native init AwesomeTSProject --template typescript 
$ cd AwesomeTSProject 
$ code . 
```
2. Добавить возможность навигации в приложении, следующими командами:
```bash
$ npm i --save react-navigation 
$ npm i --save react-native-gesture-handler //обработчик жестов;
$ npm i --save react-navigation-stack  //стек навигации;
$ npm i --save react-native-reanimated 
$ npm i --save react-native-screens@^1.0.0-alpha.23
$ npm i --save react-navigation-tabs  //нижняя навигация табами; 
$ npm i --save react-navigation-drawer  //боковая оконная навигация
```
3. Добавить библиотеку для иконок:
```bash
$ npm i --save react-native-svg
$ npm i --save react-native-vector-icons
$ react-native link react-native-vector-icons
```

4. Добавить библиотеку для выпадающего списка:
```bash
$ npm i --save react-native-material-dropdown
$ npm i --save @types/react-native-material-dropdown
```

5. Добавить библиотеки расширенных компонентов:
```bash
$ npm i --save react-native-elements
$ npm i --save react-native-paper
```

6. Добавить библиотеку для сохранения глобального состояния:
```bash
$ npm i --save use-global-hook-ts
```

7. Добавить компонент DateTimePicker:
```bash
npm install @react-native-community/datetimepicker --save
or
yarn add @react-native-community/datetimepicker
```

------------------
### Реализованные экраны: 
![](https://ibb.co/FhDxk9r)
![](https://ibb.co/4YvYqFh)
![](https://ibb.co/FnbZfy4)
![](https://ibb.co/C8phfD0)