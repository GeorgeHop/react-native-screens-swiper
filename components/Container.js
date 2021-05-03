import React from 'react';
import {ScrollView} from 'react-native';

export default function Container({stickyHeaderEnabled, children, ...rest}) {
    return(
        stickyHeaderEnabled ? (
            <ScrollView
                stickyHeaderIndices={stickyHeaderEnabled ? [1] : null}
                {...rest}
            >
                {children}
            </ScrollView>
        ) : (
            <>
                {children}
            </>
        )
    )
}
