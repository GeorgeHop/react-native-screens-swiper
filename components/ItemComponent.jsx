import React from 'react';
import {View, useWindowDimensions} from 'react-native';

export default function ItemComponent({Component, index, ...rest}) {
    const width = useWindowDimensions().width;
    const isJSX = element => typeof element !== 'function' && typeof element?.type === 'object';
    const isMemo = element => typeof element !== 'function' && typeof element?.type === 'function';

    return(
        <View style={{width}}>
            {isJSX(Component) && Component}
            {(typeof Component === 'function' || isMemo(Component)) && <Component {...rest} index={index}/>}
        </View>
    );
}
