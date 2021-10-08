import React from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import {getOpacity} from "../helpers/getOpacity";

export default function ScrollablePills({data, scrollViewRef, onButtonLayout, style, currentIndex, onButtonPress, x}) {
    return(
        <ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
        >
            {!!data?.length && data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onLayout={onButtonLayout(index)}
                    style={[
                        styles.pillButton,
                        style?.pillButton,
                        index === currentIndex && (style?.pillActive || styles.pillActive),
                    ]}
                    onPress={() => onButtonPress(index)}
                >
                    <View
                        style={{
                            borderRadius: 5,
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                            opacity: getOpacity(index, x),
                        }}
                    />
                    <View
                        style={{
                            paddingHorizontal: 20
                        }}
                    >
                        {item.icon}
                        <Text style={[
                            styles.pillLabel,
                            style?.pillLabel,
                            index === currentIndex && (style?.activeLabel || styles.pillLabelActive),
                        ]}>
                            {item.tabLabel}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
};

const styles = {
    pillButton: {
        minWidth: 30,
        height: 32,
        backgroundColor: '#c8c8c8',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    pillLabelActive: {
        color: 'white'
    },
    pillActive: {
        backgroundColor: '#42a5f5',
    },
    pillLabel: {
        marginLeft: 5,
        color: '#455a64'
    },
    pillContainer: {
        paddingHorizontal: 5,
    },
};
