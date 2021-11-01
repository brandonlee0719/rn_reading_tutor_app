import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../../constants/colors';
import lightTheme from '../../styles/themes/light-theme';

const screenHeight = Dimensions.get('window').height
let CIRCLE_RADIUS = 36;
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.imgGrayBackGround,
        padding: 16
    },
    headerContainer: {
        marginHorizontal: 20
    },
    buttonStyleEnabled: {
        backgroundColor: 'transparent'
    },
    buttonStyleDisabled: {
        borderWidth: 0.75,
        borderColor: '#ccc'
    },
    mainContainer: {
        flex: 1
    },
    dropZone: {
        height: 100,
        backgroundColor: '#2c3e50'
    },
    text: {
        marginTop: 25,
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center',
        color: '#fff'
    },
    draggableContainer: {
        position: 'absolute',
        marginTop: Dimensions.get('window').height / 2 - CIRCLE_RADIUS,
        marginLeft: Dimensions.get('window').width / 2 - CIRCLE_RADIUS,
    },
    circle: {
        backgroundColor: '#1abc9c',
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
        borderRadius: CIRCLE_RADIUS
    },
    subcontainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
})
