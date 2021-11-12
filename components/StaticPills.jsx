import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {getOpacity} from "../helpers/getOpacity";

export default function StaticPills({data, style, x, currentIndex, onPillPress, containerRef, scrollableContainer}) {
    return (
        <View style={[styles.container, style?.staticPillsContainer]}>
            {!!data?.length && data.map((item, index) => (
                <View key={index} style={{flex: 1}}>
                    <TouchableOpacity
                        onPress={() => {
                            onPillPress(index)

                            if (index === currentIndex && scrollableContainer)
                                containerRef?.current?.scrollTo({ x: 0, y: 0, animated: true })
                        }}
                        style={[
                            {
                                paddingHorizontal: 5,
                                flexGrow: 1,
                                flex: 1,
                                alignItems: 'center',
                            },
                            style?.pillButton,
                        ]}
                    >
                        <Text style={[
                            style?.pillLabel || styles.pillLabel,
                            index === currentIndex && (style?.activeLabel || styles.activePill),
                        ]}>
                            {item.tabLabel}
                        </Text>
                    </TouchableOpacity>
                    <View style={[
                        {
                            marginTop: 5,
                            marginHorizontal: 10,
                            borderColor: 'red',
                            borderBottomWidth: 2,
                            // for fade in and fade out animation
                            opacity: getOpacity(index, x),
                        },
                        style?.borderActive || styles.activeBorder,
                    ]}/>
                </View>
            ))}
        </View>
    );
}

const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 8,
    },
    pillLabel: {
        color: 'gray',
    },
    activePill: {
        color: 'red',
        marginBottom: 10,
    },
};
