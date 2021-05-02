# react-native-screens-swiper
Simple screens' swiper library with scrollable or static tab navigation. Fully supported on iOS and Android.

<table>
<tr>
<td align="center">Scrollable Pills</td>
<td align="center">Static Pills</td>
</tr>
<tr>
<td>
<img src="https://user-images.githubusercontent.com/47904385/112822780-a9950600-9088-11eb-91db-3b713a59128b.gif" alt="drawing" height="500"/>
</td>
<td>
<img src="https://user-images.githubusercontent.com/47904385/112823107-21fbc700-9089-11eb-9cb9-a869e31f453a.gif" alt="drawing" height="500"/>
</td>
</tr>
</table>

# Installation
expo: `expo install react-native-screens-swiper`  
npm: `npm i react-native-screens-swiper`  
yarn: `yarn add react-native-screens-swiper`

## Basic usage
```JS
import Swiper from "react-native-screens-swiper";
import FirstScreen from "./FirstScreen";
import SecondScreen from "./SecondScreen";

export default function YourComponent() {
    /**
     * Create an array with your screens' data - title, component and additional props.
     * Title is a string to be put inside of pill.
     * Props is an object with additional data for a particular screen.
     * Component can be either React component, render function or JSX element.
     * If it is a component or function, it will receive above-mentioned props and additional 'index' props
     */
    const data = [
        {
            tabLabel: 'Valid component in form of JSX element',
            component: <FirstScreen/>,
        },
        {
            tabLabel: 'Valid component in form of React component',
            component: SecondScreen,
            props: {}, // (optional) additional props
        },
        {
            tabLabel: 'Valid component in form of render function',
            component: ({index, ...props}) => {
                return null;
            },
            props: {}, // (optional) additional props
        },
    ];

    return (
        <Swiper
            data={data}
            isStaticPills={true}
            style={styles}
            // FlatList props
        />
    );
}

// more about styling below
const styles = {};
```

## Custom styling
```JS
export default function App() {
    return (
        <Swiper 
            data={data}
            style={styles}
        />
    );
}

const styles = {
    // [View] Pills container
    pillContainer: {},

    // [View] Button
    pillButton: {},

    // [View] Active button
    pillActive: {},
    
    // [Text] Button's text
    pillLabel: {},
    
    // [Text] Active button's text
    activeLabel: {},
    
    // [View] Border of active pill (:warning: opacity will override animation's opacity)
    borderActive: {},
};
```

### Example for scrollable pills
<table>
<tr>
<td>

```JS
const styles = {
    pillButton: {
        backgroundColor: 'white',
    },
    pillActive: {
        backgroundColor: 'yellow',
    },
    pillLabel: {
        color: 'gray',
    },
    activeLabel: {
        color: 'white',
    },
};
```

</td>
<td>
<img src="https://user-images.githubusercontent.com/47904385/112870894-fdbadd00-90be-11eb-8b7a-322a913af2d1.gif" alt="drawing" height="500"/>
</td>
</tr>
</table>

### Example for static pills
<table>
<tr>
<td>

```JS
const styles = {
    borderActive: {
        borderColor: 'pink',
    },
    pillLabel: {
        color: 'gray',
    },
    activeLabel: {
        color: '#ba2d65',
    },
};
```

</td>
<td>
<img src="https://user-images.githubusercontent.com/47904385/112871240-5b4f2980-90bf-11eb-9f15-d9673f247ad6.gif" alt="drawing" height="500"/>
</td>
</tr>
</table>

## Props
Below are the props you can pass to the React Component.

| Prop  | Type | Default | Example | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| data  | array | | [{component: 'your first screen component', tabLabel: 'first screen tabLabel'}, {component: 'your second screen component', tabLabel: 'second screen tabLabel'}] | Put array of screens with tab labels for displaying inside the component |
| isStaticPills | boolean | false | isStaticPills={true} | When you need static navigation without scroll |
| stickyHeaderEnabled | boolean | false | stickyHeaderEnabled={true} | Give header possibility to stick to top of the screen. |
| children | component | | ``` <Swiper><YourComponent/></Swiper> ``` | You can add your own top component in swiper. For example profile info. |
| style | object | | {pillContainer: {backgroundColor: 'black', height: 50}} | The styles object for styling the swiper details. More about styling in Custom styling step.|
