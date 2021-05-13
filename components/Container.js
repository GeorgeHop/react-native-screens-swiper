import React from 'react';
import {ScrollView} from 'react-native';

export default function Container({stickyHeaderEnabled, children, scrollableContainer, containerRef, stickyHeaderIndex, ...rest}) {
    return(
        scrollableContainer ? (
            <ScrollView
                ref={containerRef}
                stickyHeaderIndices={stickyHeaderEnabled ? [stickyHeaderIndex] : null}
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
