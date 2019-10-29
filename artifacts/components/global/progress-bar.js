import React from 'react';
import { View, StyleSheet } from 'react-native';
const ProgressBar = (props) => {
    const { percent = 0 } = props;
    const filledPart = percent > 1 ? percent / 100 : percent;
    const emptyPart = 1 - filledPart;
    return (React.createElement(View, { style: styles.container },
        React.createElement(View, { style: styles.bar },
            React.createElement(View, { style: [styles.filledSpace, { flex: filledPart }] }),
            React.createElement(View, { style: [styles.emptySpace, { flex: emptyPart }] }))));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    bar: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#E7EBEF',
        height: 10,
        borderRadius: 3
    },
    filledSpace: {
        backgroundColor: '#A2BEDD',
        height: 10,
        borderRadius: 3
    },
    emptySpace: {
        backgroundColor: '#E7EBEF',
        height: 10,
        borderRadius: 3,
    }
});
export default ProgressBar;
//# sourceMappingURL=progress-bar.js.map