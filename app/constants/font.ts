import Device from "react-native-device-detection";

export default{
    fontBold : "Cadman-Bold",
    fontBoldItalic : "Cadman-BoldItalic",
    fontItalic : "Cadman-Italic",
    fontRegular : Device.isIos ? 'Cadman' : 'Cadman-Regular',
    fontQuickRegular : "Quicksand-Regular",
}