# react-native-screens-swiper
The very simple screens swiper lib. with scrollable or static tab navigation. Fully supported on ios and android just take a look.

# Installation

``
npm i react-native-screens-swiper
``

## Example

The swiper have a two types of navigation. First one the scrollable pills navigation and the second one is static tab navigation.
Yo can change the functionality by using just only one prop. For all additional info. just scroll down.

![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/47904385/112822780-a9950600-9088-11eb-91db-3b713a59128b.gif) ![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/47904385/112823107-21fbc700-9089-11eb-9cb9-a869e31f453a.gif)

## Basic usage
```JS
import Swiper from "react-native-screens-swiper/Swiper";

export const YourComponent = () => {
    // create the array of screens with your screen component and tab label
    const data = [
        {
            component: <FirstScreen/>,
            tabLabel: 'First Screen'
        },
        {
            component: <SecondScreen/>,
            tabLabel: 'Second Screen'
        },
        {
            component: <ThirdScreen/>,
            tabLabel: 'Third Screen'
        },
    ];

    return (
        // then just put it inside a data prop in swiper 
        // and that's all ! Very simple 
        <Swiper data={data}/>
    );
}
```

## Scrollable buttons & Static buttons

If you want to use the buttons on top like this...
Just make isStaticPills prop. true :) And that's all

| Code | Video |
| ------------- | ------------- |
| ```JS
    return (
        <Swiper 
            data={data}
            // That's only one line :)
            isStaticPills={true}    
        />
    );
```  | ![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/47904385/112823107-21fbc700-9089-11eb-9cb9-a869e31f453a.gif) |

The scrollable buttons enabled b default! 
But if you need to change something more than type of nav. Lets take a look on styling :)

## Custom styling


## Props
Below are the props you can pass to the React Component.

| Prop  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| data  | array | | [{component: 'your first screen component', tabLabel: 'first screen tabLabel'}, {component: 'your second screen component', tabLabel: 'second screen tabLabel'}] | Put array of screens with tab labels for displaying inside the component |
| isStaticPills | boolean | false | isStaticPills={true} | When you need static navigation without scroll |
| screenIndex | int | | screenIndex={0} | 
|

## ToDo


If you have something interesting ! Just write to us :)
