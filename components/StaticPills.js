import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {getOpacity} from "../helpers/getOpacity";

const width = Dimensions.get('window').width;

export const StaticPills = ({data, style, x, currentIndex, flatList}) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            borderBottomWidth: 2,
            borderColor: 'white',
            width: width - 20,
            paddingBottom: 8,
        }}>
            {!!data?.length && data.map((item, index) => (
                <View key={index}>
                    <TouchableOpacity
                        key={index}
                        style={[{
                            paddingHorizontal: 5,
                            height: 40,
                            width: width / data?.length - 20,
                            alignItems: 'center',
                        }, style?.pillButton && style?.pillButton]}
                        onPress={() => flatList?.current?.scrollToIndex({index})}
                    >
                        <Text
                            style={[
                                !!style?.pillLabel ? style.pillLabel : {color: 'gray'},
                                index === currentIndex ?
                                    !!style?.activeLabel ? style.activeLabel : style?.pillLabel
                                    : '',
                            ]}
                        >
                            {item.tabLabel}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={[{
                            marginHorizontal: 10,
                            borderColor: 'white',
                            borderBottomWidth: 2,
                            // for fade in and fade out animation
                            opacity: getOpacity(index, x),
                        },
                            !!style?.borderActive ? style?.borderActive : {borderColor: 'red', borderBottomWidth: 2,}]}
                    >
                    </View>
                </View>
            ))}
        </View>
    )
}
