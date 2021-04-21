import React, {useCallback, useRef, useState} from "react";
import {Dimensions, FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StaticPills} from "./StaticPills";
import {usePrevious} from "../helpers/usePrevious";

const width = Dimensions.get('window').width;

const Swiper = ({style, data, pillStyle, activeLabelStyles, activePillStyles, pillContainerStyles, isStaticPills, ...rest}) => {
    const flatList = useRef(null);
    const scrollViewRef = useRef(null);
    const buttonRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const prevIndex = usePrevious(currentIndex);
    const [buttonsCoords, setButtonsCoords] = useState([]);
    const [x, setX] = useState(0);

    const handleScroll = useCallback((e) => {
        setX(e.nativeEvent.contentOffset.x);
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index !== currentIndex)
            setCurrentIndex(index);
    }, [currentIndex]);

    // set all buttons coords on first swiper
    const setCoords = useCallback((e, index) => {
        setButtonsCoords(buttonsCoords => {
            let buttons = [...buttonsCoords];
            buttons[index] = e;
            return buttons;
        });
    }, []);

    const buttonWatch = useCallback(() => {
        if (buttonsCoords[currentIndex] && prevIndex !== currentIndex) {
            const e = buttonsCoords[currentIndex];
            // for displaying the button in the center
            // we get half length of the button
            const buttonWidth = e.width / 2
            // and count new coords by getting element x + buttonWidth - half of screen width
            const coords = e.x + buttonWidth - (width / 2);

            scrollViewRef?.current?.scrollTo({x: coords, y: 0, animated: true});
        }
    }, [currentIndex, prevIndex]);

    const onLayout = useCallback(index => e => {
        if (!buttonsCoords[index] || buttonsCoords[index].x !== e.x)
            setCoords(e.nativeEvent.layout, index);
    }, [buttonsCoords]);

    return (
        <>
            <View
                style={[
                    styles.pillContainer,
                    style?.pillContainer,
                    isStaticPills && {
                        backgroundColor: 'white',
                        paddingTop: 12,
                        paddingBottom: 8,
                        paddingHorizontal: 0,
                        borderBottomWidth: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}>
                {isStaticPills ? (
                    <StaticPills
                        data={data}
                        currentIndex={currentIndex}
                        x={x}
                        activePillStyles={style}
                        flatList={flatList}
                    />
                ) : (
                    <ScrollView
                        ref={scrollViewRef}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                    >
                        {!!data?.length && data.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                ref={buttonRef}
                                onLayout={onLayout(index)}
                                style={[
                                    styles.pillButton,
                                    style?.pillButton,
                                    index === currentIndex && styles.pillActive,
                                    index === currentIndex && style?.pillActive,
                                ]}
                                onPress={() => flatList?.current?.scrollToIndex({index})}
                            >
                                {item.icon}
                                <Text
                                    style={[
                                        style?.pillLabel,
                                        styles.pillLabel,
                                        index === currentIndex ? (!!style?.activeLabel ? style?.activeLabel : styles.pillLabelActive) : '']}>
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
                onScroll={(e) => {
                    handleScroll(e);
                    buttonWatch();
                }}
                pagingEnabled
                keyExtractor={(item, index) => String(index)}
                horizontal={true}
                data={data}
                renderItem={({item, index}) => (
                    <View
                        key={index}
                        style={{
                            width: width
                        }}
                    >
                        {item.component}
                    </View>
                )}
                snapToAlignment={'center'}
                style={{flex: 1}}
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
        height: 35,
    }
};

export default Swiper;
