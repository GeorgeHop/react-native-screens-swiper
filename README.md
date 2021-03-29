# react-native-screens-swiper
The very simple screens swiper lib. with scrollable or static tab navigation. Fully supported on ios and android just take a look.

# Installation

``
npm i react-native-screens-swiper
``

## Example


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

## Custom styling

## Scrollable buttons & Static buttons

## Props
Below are the props you can pass to the React Component.

| Prop  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| data  | array | | [{component: 'your first screen component', tabLabel: 'first screen tabLabel'}, {component: 'your second screen component', tabLabel: 'second screen tabLabel'}] | Put array of screens with tab labels for displaying inside the component |

## ToDo


If you have something interesting ! Just write to us :)
