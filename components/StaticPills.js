import React from 'react';
import {useWindowDimensions, Text, TouchableOpacity, View} from "react-native";
import {getOpacity} from "../helpers/getOpacity";

export default function StaticPills({data, style, x, currentIndex, onPillPress}) {
    const width = useWindowDimensions().width;
    return (
        <View style={styles.container}>
            {!!data?.length && data.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity onPress={onPillPress(index)} style={[
                        {
                            paddingHorizontal: 5,
                            width: width / data.length,
                            alignItems: 'center',
                        },
                        style?.pillButton,
                    ]}>
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
