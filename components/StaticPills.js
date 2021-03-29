import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from "react-native";
import {getOpacity} from "../helpers/getOpacity";

const width = Dimensions.get('window').width;

export const StaticPills = ({data, activePillStyles, x, currentIndex, flatList}) => {
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
                            width: width / data?.length - 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }]}
                        onPress={() => flatList?.current?.scrollToIndex({index})}
                    >
                        <Text
                            style={[{
                                color: 'red',
                                //opacity: getOpacity(index, x) + .5,
                                marginBottom: 10,
                            }]}
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
                            activePillStyles ? activePillStyles : {borderColor: 'red', borderBottomWidth: 2,}]}
                    >
                    </View>
                </View>
            ))}
        </View>
    )
}
