import React from 'react';
import {View} from "react-native";
import StaticPills from "./StaticPills";
import ScrollablePills from "./ScrollablePills";

export default function SwiperHeader({data, x, style, isStaticPills, setPillContainerHeight, containerRef, scrollableContainer, currentIndex, onButtonPress, scrollViewRef, onButtonLayout}) {
    return(
        <View style={[style?.pillsOverflow]}>
            <View
                onLayout={setPillContainerHeight}
                style={[
                    styles.pillContainer,
                    isStaticPills && styles.staticPillContainer,
                    style?.pillContainer,
                ]}>
                {!!isStaticPills && (
                    <StaticPills
                        containerRef={containerRef}
                        scrollableContainer={scrollableContainer}
                        data={data}
                        currentIndex={currentIndex}
                        x={x}
                        style={style}
                        onPillPress={onButtonPress}
                    />
                )}
                {!isStaticPills && (
                    <ScrollablePills
                        scrollViewRef={scrollViewRef}
                        data={data}
                        onButtonLayout={onButtonLayout}
                        style={style}
                        x={x}
                        currentIndex={currentIndex}
                        onButtonPress={onButtonPress}
                    />
                )}
            </View>
        </View>
    )
}

const styles = {
    pillContainer: {
        paddingHorizontal: 5,
    },
    staticPillContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
}
