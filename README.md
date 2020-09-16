# expo-images-picker

Multiple Asset Photos | Videos selecting package for Expo SDK 38+


[MediaLibrary](https://docs.expo.io/versions/latest/sdk/media-library).

[Permissions](https://docs.expo.io/versions/latest/sdk/permissions)

[styled-components](https://github.com/styled-components)

[immutable](https://www.npmjs.com/package/immutable)


## Best Practice 
- For users who use React + Styled Components Flow.

## Features
-   Permission requests built in.
-   Getting Multi Assets from the device.
-   Support Both landscape and portrait.
-   Simple Indicator for the selected Assets.
-   Custom Indicator for the selected Assets.
-   Using custom navbar components.
-   Allow selecting multiply Photos or Videos and sound Assets.
-   Super optimized , using react hooks , memo and callback to fully optimize performances.

![Sample](https://media3.giphy.com/media/ZFWKKTlEwqSQ6Fpyhb/giphy.gif)     ![Sample](https://media0.giphy.com/media/lp7uTaAD6uHRiSp5XR/giphy.gif)

## Usage

1. Install with
    ```bash
    $ npm install --save expo-images-picker
    ```
    or
    ```bash
    $ yarn add expo-images-picker
    ```
2. import to the top of your file like
    ```js
    import { AssetsSelector } from 'expo-images-picker'
    ```
   
3. install @expo-vectors package and send icons as props to the widget
    ```js
    import {Ionicons} from '@expo/vector-icons'
    ```
     
4. Use the imported as Following =>
    ```js
            <AssetsSelector
                options={{
                    assetsType: ['photo', 'video'],
                    noAssetsText: 'No media found.',
                    maxSelections: 5,
                    margin: 3,
                    portraitCols: 4,
                    landscapeCols: 5,
                    widgetWidth: 100,
                    widgetBgColor: theme.bg,
                    selectedBgColor: theme.main,
                    videoIcon: {
                        Component: Ionicons,
                        iconName: 'ios-videocam',
                        color: 'white',
                        size: 20,
                    },
                    selectedIcon: {
                        Component: Ionicons,
                        iconName: 'ios-checkmark-circle-outline',
                        color: theme.polar_text_1,
                        bg: theme.mainWithOpacity,
                        size: theme.XL,
                    },
                    defaultTopNavigator: {
                        continueText: 'Finish',
                        goBackText: 'Back',
                        buttonBgColor: theme.main,
                        buttonTextColor: theme.solid_button_text,
                        midTextColor: theme.polar_text_2,
                        backFunction: goBack,
                        doneFunction: data => onDone(data),
                    },
                    noAssets:{
                        Component:CustomNoAssetsComponent
                    },
                }}
            />
    ```

##[📚 Params]

### Options:

-   `assetsType`: Could be 'video' , 'photo' or an array with both ['photo','video'].

-   `noAssetsText`: Text to display when there are no assets at all.

-   `maxSelections`: Maximum number of assets selection.

-   `margin`: Margin the Grid items by Pxs.

-   `portraitCols`: Number of columns in portrait Mode.by default `4`.

-   `landscapeCols`: Number of columns in landscape Mode, by default `6`.

-   `widgetWidth`: Widget container width , by default `100`.

-   `widgetBgColor`: Widget background color expect to get Hex color.

-----------------------

 `selectedIcon`:
-  `Component`:    Send in the Library you wanna use ,Like `Ionicons`.
-  `iconName` :    Send in the name property for the icon, Like `'ios-checkmark-circle-outline'`.
-  `color` :       Send in the color property for the icon,Like `white`.
-  `bg` :          The Fill color of selected component, Like `#ffffff50`.
-  `size` :        Send in the size property for the icon, Like `22`.


-----------------------

- Not sending "defaultTopNavigator" will hide the default top nav bar.
- You can control the colors , texts of the default nav with the following:

 `defaultTopNavigator`:
-  `continueText`:      Text for next Button , by default `Continue`.
-  `goBackText`:        Text for Back Button , by default `Back`.
-  `buttonBgColor`:     Color Of the Buttons, by default `black`.
-  `buttonTextColor`:   Color of Buttons Text,  `#ffffff50`.
-  `midTextColor` :     Color Of the counter text, by default `black`.
-  `backFunction` :     Send in a function to go back to your screen.
-  `doneFunction` :     Send in a function to go back and send the returned data.

-----------------------

 `noAssets`:
-  `Component`:      Send your custom No assets Component.

-----------------------


- Sending "CustomTopNavigator" will display your Custom component and hide the defaults.

 `CustomTopNavigator`:
 
-  `Component`:    Send in your Custom nav bar.
-  `props` : Send any props your Custom Component needs.

* usage With Custom Component 

```js
        <AssetsSelector
                options={{
                    ...otherProps,
                    CustomTopNavigator: {
                        Component: CustomNavImageSelection,
                        props: {
                            backFunction: true,
                            text: translator(T.PICK_IMAGES),
                            doneFunction: (data: Asset[]) => onDone(data),
                        },
                    }
                }}
        />
```




