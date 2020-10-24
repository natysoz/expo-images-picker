# Changelog
-----------------------------------------

### 🛠 Breaking changes
-----------------------------------------

### 🎉 New features
-----------------------------------------

#### 1.0.7 — 2020-10-25
 - Now , you can send now simple component instead of icon components ,
  to display numbers on top of the images (instead of icon)
  for example create simple component like :
  
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

#### 1.0.7 — 2020-10-25

_Request from "hypnocapybara" Was Merged ([#1](https://github.com/natysoz/expo-images-picker/pull/1))
 - Remove Immutable dependency 

#### 1.0.6 — 2020-09-27

_Update to Expo SDK 39 is now require , they fix the issue with parse error on the "after" field

_Still they have issue with asset that is not valid "Asset",
images that users manually put on the Gallery folder may cause the app to close without any error. 

_Request from the team to help on  issue ([#10398](https://github.com/expo/expo/issues/10398))


### 🐛 Known Bugs 
-----------------------------------------
* Images and Videos that users manually put on the Gallery
can crash the app without any error especially Telegram images and videos.
Expo Media library is very buggy.


