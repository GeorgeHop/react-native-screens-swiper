import React, {useRef, useState} from "react";
import {useWindowDimensions, FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import StaticPills from "./StaticPills";
import {usePrevious} from "../helpers/usePrevious";

const isJSX = element => typeof element !== 'function' && typeof element?.type === 'object';
const isMemo = element => typeof element !== 'function' && typeof element?.type === 'function';

export default function Swiper({style, data, isStaticPills, initialScrollIndex, ...rest}) {
    const width = useWindowDimensions().width;
    const flatList = useRef(null);
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialScrollIndex || 0);
    const prevIndex = usePrevious(currentIndex);
    const buttonsCoords = React.useRef([]).current;
    const [x, setX] = useState(0);

    // collect button layouts
    const onButtonLayout = index => e => {
        if (buttonsCoords[index]?.x !== e.x)
            buttonsCoords[index] = e.nativeEvent.layout;
    };
    const onButtonPress = index => () => flatList.current?.scrollToIndex({index});

    const onFlatListScroll = e => {
        // update X
        setX(e.nativeEvent.contentOffset.x);

        // update current screen index
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index !== currentIndex)
            setCurrentIndex(index);

        // scroll to next button if have to
        if (buttonsCoords[currentIndex] && prevIndex !== currentIndex) {
            const buttonLayout = buttonsCoords[currentIndex];
            scrollViewRef.current?.scrollTo({
                // target X is button's X + hald of button's width - hald of screen width
                x: buttonLayout.x + buttonLayout.width / 2 - (width / 2),
                y: 0,
                animated: true,
            });
        }
    };
    const keyExtractor = (item, index) => String(index);
    const getItemLayout = (data, index) => ({
        length: width,
        offset: width * index,
        index,
    });
    const renderItem = ({item: {component: Component, props = {}}, index}) => (
        <View style={{width}}>
            {isJSX(Component) && Component}
            {(typeof Component === 'function' || isMemo(Component)) && <Component {...props} index={index}/>}
        </View>
    );

    return (
        <>
            <View style={[
                styles.pillContainer,
                isStaticPills && styles.staticPillContainer,
                style?.pillContainer,
            ]}>
                {!!isStaticPills && (
                    <StaticPills
                        data={data}
                        currentIndex={currentIndex}
                        x={x}
                        style={style}
                        onPillPress={onButtonPress}
                    />
                )}
                {!isStaticPills && (
                    <ScrollView
                        ref={scrollViewRef}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {!!data?.length && data.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                ref={buttonRef}
                                onLayout={onButtonLayout(index)}
                                style={[
                                    styles.pillButton,
                                    style?.pillButton,
                                    index === currentIndex && styles.pillActive,
                                    index === currentIndex && style?.pillActive,
                                ]}
                                onPress={onButtonPress(index)}
                            >
                                {item.icon}
                                <Text style={[
                                    styles.pillLabel,
                                    style?.pillLabel,
                                    index === currentIndex && (style?.activeLabel || styles.pillLabelActive),
                                ]}>
                                    {item.tabLabel}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
            <FlatList
                ref={flatList}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onFlatListScroll}
                pagingEnabled
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                horizontal={true}
                data={data}
                renderItem={renderItem}
                snapToAlignment={'center'}
                style={styles.flatList}
                initialScrollIndex={initialScrollIndex}
                {...rest}
            />
        </>
    );
};

const styles = {
    pillButton: {
        minWidth: 30,
        height: 32,
        backgroundColor: '#c8c8c8',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
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
    staticPillContainer: {
        backgroundColor: 'white',
        paddingTop: 12,
        paddingBottom: 8,
        paddingHorizontal: 0,
        borderBottomWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatList: {
        flex: 1,
    },
};
