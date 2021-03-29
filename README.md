# react-native-screens-swiper
The very simple screens swiper lib. with scrollable or static tab navigation. Fully supported on ios and android just take a look.

# Installation

``
npm i react-native-screens-swiper
``

## Example

The swiper have a two types of navigation. First one the scrollable pills navigation and the second one is static tab navigation.
Yo can change the functionality by using just only one prop. For all additional info. just scroll down.

| Scrollable Pills | Static Pills |
| ---------------- | ---------------- |
|![ezgif com-gif-maker (7)](https://user-images.githubusercontent.com/47904385/112822780-a9950600-9088-11eb-91db-3b713a59128b.gif) | ![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/47904385/112823107-21fbc700-9089-11eb-9cb9-a869e31f453a.gif) |

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
 ```JS
    return (
        <Swiper 
            data={data}
            // That's only one line :)
            isStaticPills={true}    
        />
    );
```
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/47904385/112823107-21fbc700-9089-11eb-9cb9-a869e31f453a.gif) 

The scrollable buttons enabled by default! 
But if you need to change something more than type of nav. Lets take a look on styling :)

## Custom styling

If you need to change the styles of the pills don't worry ! You can customize everything how you want.
But please be careful ! Because this is the first version of the lib. And we think that in lib. can have some issues with the styling.
If you have any problems ! Just write to us :)

Example for scrollable pills

 ```JS
 export default function App() {
    return (
        <Swiper 
            data={data}
            // Using this prop. you can change all components how you need.
            style={styles}
        />
    );
}

// Your styles here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // if you need to change some container things
    pillContainer: {
        height: 90,
    },
    // if you want to change the active border in static pills
    borderActive: {
        borderColor: 'red'
    },
    // if you need to change pill label color
    pillLabel: {
        color: 'gray'
    },
    // the same for active label
    activeLabel: {
        color: 'white'
    },
    // if you want to change pill button styles
    pillButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    // pill active for active button styles
    pillActive: {
        backgroundColor: '#ffb74d',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
});
```

Example for static pills

 ```JS
 export default function App() {
    return (
        <Swiper 
            data={data}
            // Using this prop. you can change all components how you need.
            style={styles}
        />
    );
}

// Your styles here
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pillContainer: {
        height: 90,
    },
    // bottom border for active pill
    borderActive: {
        borderColor: '#f06292'
    },
    // styles for label 
    pillLabel: {
        color: 'gray'
    },
    // styles for active label
    activeLabel: {
        color: '#ba2d65'
    },
});
```

And its look's like... 
| Scrollable Pills | Static Pills |
| ---------------- | ---------------- |
| ![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/47904385/112870894-fdbadd00-90be-11eb-8b7a-322a913af2d1.gif) | ![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/47904385/112871240-5b4f2980-90bf-11eb-9f15-d9673f247ad6.gif) |

Styling props.
Below are the styling props. which you can use.

| Prop  | Component |
| ------------- | ------------- |
| pillContainer | Will change the pills container |
| pillLabel | Set the default pill label styles |
| activeLabel | Set styles for the active label |
| pillActive | Styles for active button |
| pillButton | Set the default pill styles |
| borderActive | Set the border active color for static pills |


## Props
Below are the props you can pass to the React Component.

| Prop  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| data  | array | | [{component: 'your first screen component', tabLabel: 'first screen tabLabel'}, {component: 'your second screen component', tabLabel: 'second screen tabLabel'}] | Put array of screens with tab labels for displaying inside the component |
| isStaticPills | boolean | false | isStaticPills={true} | When you need static navigation without scroll |
| screenIndex | int | | screenIndex={0} | The specific screen which you want to show like initial. |
| style | object | | {pillContainer: {backgroundColor: 'black', height: 50}} | The styles object for styling the swiper details. More about styling in Custom styling step.|

## ToDo


If you have something interesting ! Just write to us :)
