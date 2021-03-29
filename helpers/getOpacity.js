import {Dimensions} from "react-native";

const width = Dimensions.get('window').width;

/**
 * leftZero    noOpacity   rightZero
 *     |-----------|-----------|
 *     0          100          0
 *
 * @param index
 * @param x
 * @returns {number}
 */
export const getOpacity = (index, x) => {
    const noOpacity = index * width;
    const leftZero = noOpacity - width;
    const rightZero = noOpacity + width;

    if (x === noOpacity)
        return 100;

    if (x <= leftZero || x >= rightZero)
        return 0;

    if (x > leftZero && x < noOpacity)
        return x / (noOpacity - leftZero) - (index - 1 < 1 ? 0 : index - 1);

    if (x > noOpacity && x < rightZero)
        return (1 - (x / (noOpacity - leftZero) - index));

    return 0;
};
