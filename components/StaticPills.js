import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {getOpacity} from "../helpers/getOpacity";

const width = Dimensions.get('window').width;

export default function StaticPills({data, style, x, currentIndex, onPillPress}) {
    return (
        <View style={styles.container}>
            {!!data?.length && data.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity key={index} onPress={onPillPress(index)} style={[
                        {
                            paddingHorizontal: 5,
                            width: width / data.length - 20,
                            height: 40,
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
                            marginHorizontal: 10,
                            borderColor: 'white',
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
        width: width - 20,
        paddingBottom: 8,
    },
    pillLabel: {
        color: 'gray',
    },
    activePill: {
        color: 'red',
        marginBottom: 10,
    },
    activeBorder: {
        borderColor: 'red',
        borderBottomWidth: 2,
    },
};
