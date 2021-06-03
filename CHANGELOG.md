# Changelog
-----------------------------------------

### 🛠 Breaking changes
-----------------------------------------

#### 1.4.0 — 2021-06-03
- expo permissions package removed.
- update version for some packages to stay updated.

#### 1.3.2 — 2021-04-12
- defaultTopNavigator props changed 

you now have `buttonTextStyle` and  `buttonStyle` and `midTextColor`

-buttonTextStyle - send style to design the text inside the button
-buttonStyle - send style to design the button itself
-midTextColor - send color to override middle text color


#### 1.3.1 — 2021-02-04
- add option to override selected text on default top navigator.

#### 1.3.1 — 2021-02-04
- now `options` and all fields become mandatory field.

#### 1.3.0 — 2021-02-04
- Add spinnerColor attribute

#### 1.1.0 — 2020-06-12
- Removed ['buttonBgColor','buttonTextColor','midTextColor'] props from DefaultNavigator

### 🎉 New features
-----------------------------------------

#### 1.3.1 — 2021-04-12
-  Add selectedText to default navigator

#### 1.3.0 — 2021-02-04
-  Add Resize , Compress and Base64 Support
-  Add Expo Image Manipulator
-  Add Spinner component shows while Manipulating images.

#### 1.2.0 — 2021-01-10
-  Update dependencies to support expo 40

#### 1.1.0 — 2020-06-12

-  Add Style prop to style DefaultNavigator.
-  Add onError prop will fire whenever there is error loading Assets.

#### 1.0.7 — 2020-10-25
 - You can send simple component instead of icon components ,
  to display numbers on top of the images (instead of icon)
  
for example:
  
  `const SelectedIcon = ({size,index,color}: SelectedIconProps) => <Text style={{color:color,fontSize:size}}>{index + 1}</Text>`
  
  Type should look like
  `type SelectedIconProps = {
  iconName:string,
  color:string,
  bg:string,
  size:number 
  index:number}`
  
  And just send this simple component on "selectedIcon" when using the widget
  
  `selectedIcon: {
  Component: SelectedIcon,
  iconName: '',
  color: 'white',
  bg: '#ffffff90',
  size: 22}`
  

### 🐛 Bug fixes
-----------------------------------------
#### 1.1.0 — 2020-06-12

- "after" field Parse was fixed on Expo SDK 39 , it's now working smoothly on Android and IOS.
- Fix design bug , if you had less than 4 images in total , widget center it and its looking not correct, so align-items:center removed  

#### 1.0.7 — 2020-10-25

_Request from "hypnocapybara" Was Merged ([#1](https://github.com/natysoz/expo-images-picker/pull/1))
 - Remove Immutable dependency 

#### 1.0.6 — 2020-09-27

_Update to Expo SDK 39 is now required , they fix the issue with parse error on the "after" field

_Still they have issue with an asset that is not valid "Asset",
images that users manually put on the Gallery folder may cause the app to close without any error. 

_Request from the team to help on  issue ([#10398](https://github.com/expo/expo/issues/10398))


### 🐛 Known Bugs 
-----------------------------------------
* Images and Videos that users manually put on the Gallery
can crash the app without any error especially Telegram images and videos.
Expo Media library is very buggy.

### Upcoming
-----------------------------------------
* Add the option to get images as Base64 string.
* Add the option to resize images and get their local url on a device or Base64.




