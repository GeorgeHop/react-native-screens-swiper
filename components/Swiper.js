import React, {useRef, useState} from "react";
import {useWindowDimensions, FlatList, Keyboard} from "react-native";
import Container from "./Container";
import {usePrevious} from "../helpers/usePrevious";
import ItemComponent from "./ItemComponent";
import SwiperHeader from "./SwiperHeader";

/**
 * Swiper component
 * @param {Array[]} data Array of items to render
 * @param {?Function} renderPills Pills render customizer that allows wrapping header with custom components
 * @param {?Number} initialScrollIndex Initial screen to show
 * @param {?boolean} stickyHeaderEnabled Enable or disable sticky header for component
 * @param {?boolean} isStaticPills Enable or disable static pills
 * @param {Function} children React component used to render item
 * @param {?Number} stickyHeaderIndex Index of component to sticky to top
 * @param {?boolean} scrollableContainer Enable or disable scrollable container for component
 * @param {?Object} style Styles
 * @param {Function} onSwiperScroll function which returns event when screen swiped
 * @param {?Function} onActiveScreenChange function that is fired when active screen index changes
 * @param {?boolean} keyboardDismissOnScroll dismiss keyboard when screens scroll
 * @param rest
 */

export default function Swiper({
    style,
    data,
    renderPills,
    isStaticPills,
    initialScrollIndex,
    stickyHeaderEnabled,
    children,
    stickyHeaderIndex,
    scrollableContainer,
    onSwiperScroll,
    onActiveScreenChange,
    keyboardDismissOnScroll,
    ...rest
}) {
    const width = useWindowDimensions().width;
    const flatList = useRef(null);
    const containerRef = useRef(null);
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(initialScrollIndex || 0);
    const prevIndex = usePrevious(currentIndex);
    const [buttonsCoords, setButtonsCoords] = useState([]);
    const [x, setX] = useState(0);

    // collect button layouts
    const onButtonLayout = index => e => {
        const layout = e?.nativeEvent?.layout;

        if (!buttonsCoords[index] || buttonsCoords[index].x !== e.x)
            setButtonsCoords(buttonsCoords => {
                let buttons = [...buttonsCoords];
                buttons[index] = layout;
                return buttons;
            });
    };
    // Scroll to pressed button index
    const onButtonPress = index => {
        if (keyboardDismissOnScroll)
            Keyboard.dismiss();

        flatList.current?.scrollToIndex({index});
    };
    // Counting coordinates on screen swipe
    const onFlatListScroll = e => {
        if (keyboardDismissOnScroll)
            Keyboard.dismiss();

        // update X
        setX(e.nativeEvent.contentOffset.x);
        // update current screen index
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        if (index !== currentIndex) {
            setCurrentIndex(index);
            onActiveScreenChange?.(index);
        };

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

        if (!!onSwiperScroll)
            onSwiperScroll(e);
    };

    const getItemLayout = (data, index) => ({
        length: width,
        offset: width * index,
        index,
    });

    const pills = (
        <SwiperHeader
            isStaticPills={isStaticPills}
            style={style}
            containerRef={containerRef}
            scrollViewRef={scrollViewRef}
            scrollableContainer={scrollableContainer}
            data={data}
            currentIndex={currentIndex}
            x={x}
            onButtonPress={onButtonPress}
            onButtonLayout={onButtonLayout}
        />
    );

    return (
        <Container
            containerRef={containerRef}
            stickyHeaderEnabled={stickyHeaderEnabled}
            scrollableContainer={scrollableContainer}
            stickyHeaderIndex={stickyHeaderIndex}
        >
            {children}
            {renderPills ? renderPills(pills) : pills}
            <FlatList
                ref={flatList}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onFlatListScroll}
                pagingEnabled
                keyExtractor={(item, index) => String(index)}
                getItemLayout={getItemLayout}
                horizontal={true}
                data={data}
                renderItem={({item: {component: Component, props = {}}, index}) => (
                    <ItemComponent
                        key={index}
                        index={index}
                        Component={Component}
                        {...props}
                    />
                )}
                snapToAlignment={'center'}
                style={styles.flatList}
                initialScrollIndex={initialScrollIndex}
                {...rest}
            />
        </Container>
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
