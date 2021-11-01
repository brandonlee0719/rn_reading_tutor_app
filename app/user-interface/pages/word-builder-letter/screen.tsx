
import { NavigationProp } from '@react-navigation/native';
import layout from './layout';
import { WordBuilderLetterPresenter, WordBuilderLetterView } from './presenter';
import { BaseScreen } from '../base/screen'
import { Animated, Dimensions, LayoutChangeEvent, PanResponder } from 'react-native'
import {RFPercentage} from 'react-native-responsive-fontsize'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export interface Props {
    navigation: NavigationProp<any, any>
}
let devicewidth = Dimensions.get("window").width
let deviceheight = Dimensions.get("window").height

export interface Props {
    navigation: NavigationProp<any, any>
};

export class WordBuilderLetterScreen extends BaseScreen implements WordBuilderLetterView {

    private presenter = new WordBuilderLetterPresenter(this)
    // currentPanValue = { x: 0, y: 0 };

    title="default"
    dataDrag = [1, 2, 3, 4, 5]
    // pan = this.dataDrag.map(() => new Animated.ValueXY())
    dropPan = [1, 2, 3].map(() => new Animated.ValueXY())
    state = {
        showDraggable: true,
        dropZoneValues: [],
        x: 10,
        y: 385,
        disabledvolumshot1: true,
        disabledvolumshot2: true,
        disabledvolumshot3: true,
        disabledvolumshot4: true,
        disabledvolumshot5: true,
        disabled: false,
        dropedindex1: 0,
        dropedindex2: 0,
        dropedindex3: 0,
        // y:240
    }

    index = 0;
    animation = new Animated.Value(0);
    pan = new Animated.ValueXY();
    panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.pan.x, dy: this.pan.y }
        ]),
        onPanResponderRelease: () => {

            let xdata = JSON.stringify(this.pan.x)
            let ydata = JSON.stringify(this.pan.y)
            console.log(parseInt(xdata), parseInt(ydata))
            if (parseInt(xdata) === 0 && parseInt(ydata) === 0) {
                this.state.disabledvolumshot1 ? this.setState({ disabledvolumshot1: false }) : this.setState({ disabledvolumshot1: true })

            } else {

                // this.setState({ disabled: true })
                if (parseInt(xdata) > -35 && parseInt(xdata) < 50 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                    if (this.state.dropedindex1 === 0) {
                        Animated.spring(this.pan, { toValue: { x: 0, y: -145 } }).start()

                        let dropZoneValues = this.state.dropZoneValues
                        dropZoneValues.push(1)
                        this.setState({ dropedindex1: 1, dropZoneValues })

                    } else {
                        Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start()
                    }

                } else if (parseInt(xdata) > 50 && parseInt(xdata) < 170 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                    if (this.state.dropedindex2 === 0) {
                        Animated.spring(this.pan, { toValue: { x:wp(33), y: -145 } }).start()

                        let dropZoneValues = this.state.dropZoneValues
                        dropZoneValues.push(1)
                        this.setState({ dropedindex2: 1, dropZoneValues })
                    } else {
                        Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start()
                    }
                } else if (parseInt(xdata) > 170 && parseInt(xdata) < 350 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                    if (this.state.dropedindex3 === 0) {
                        Animated.spring(this.pan, { toValue: { x: wp("67") , y: -145 } }).start()

                        let dropZoneValues = this.state.dropZoneValues
                        dropZoneValues.push(1)
                        this.setState({ dropedindex3: 1, dropZoneValues })
                    } else {
                        Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start()
                    }
                } else {
                    Animated.spring(this.pan, { toValue: { x: 0, y: 0 } }).start()
                    this.checkidfunction(1)


                }

            }


        }

    });

    async checkidfunction(id) {

        let dropZoneValues = this.state.dropZoneValues

        switch (id) {
            case 1: {
                dropZoneValues.pop(1)
                switch (this.state.dropedindex1) {
                    case 1: this.setState({ dropedindex1: 0 })
                    case 2: this.setState({ dropedindex1: 0 })
                    case 3: this.setState({ dropedindex1: 0 })
                    case 4: this.setState({ dropedindex1: 0 })
                    case 5: this.setState({ dropedindex1: 0 })
                }
                switch (this.state.dropedindex2) {
                    case 1: this.setState({ dropedindex2: 0 })
                    case 2: this.setState({ dropedindex2: 0 })
                    case 3: this.setState({ dropedindex2: 0 })
                    case 4: this.setState({ dropedindex2: 0 })
                    case 5: this.setState({ dropedindex2: 0 })
                }
                switch (this.state.dropedindex3) {
                    case 1: this.setState({ dropedindex3: 0 })
                    case 2: this.setState({ dropedindex3: 0 })
                    case 3: this.setState({ dropedindex3: 0 })
                    case 4: this.setState({ dropedindex3: 0 })
                    case 5: this.setState({ dropedindex3: 0 })
                }
            }
            case 2: {
                dropZoneValues.pop(2)
                switch (this.state.dropedindex1) {
                    case 1: this.setState({ dropedindex1: 0 })
                    case 2: this.setState({ dropedindex1: 0 })
                    case 3: this.setState({ dropedindex1: 0 })
                    case 4: this.setState({ dropedindex1: 0 })
                    case 5: this.setState({ dropedindex1: 0 })
                }
                switch (this.state.dropedindex2) {
                    case 1: this.setState({ dropedindex2: 0 })
                    case 2: this.setState({ dropedindex2: 0 })
                    case 3: this.setState({ dropedindex2: 0 })
                    case 4: this.setState({ dropedindex2: 0 })
                    case 5: this.setState({ dropedindex2: 0 })
                }
                switch (this.state.dropedindex3) {
                    case 1: this.setState({ dropedindex3: 0 })
                    case 2: this.setState({ dropedindex3: 0 })
                    case 3: this.setState({ dropedindex3: 0 })
                    case 4: this.setState({ dropedindex3: 0 })
                    case 5: this.setState({ dropedindex3: 0 })
                }
            }
            case 3: {
                dropZoneValues.pop(3)
                switch (this.state.dropedindex1) {
                    case 1: this.setState({ dropedindex1: 0 })
                    case 2: this.setState({ dropedindex1: 0 })
                    case 3: this.setState({ dropedindex1: 0 })
                    case 4: this.setState({ dropedindex1: 0 })
                    case 5: this.setState({ dropedindex1: 0 })
                }
                switch (this.state.dropedindex2) {
                    case 1: this.setState({ dropedindex2: 0 })
                    case 2: this.setState({ dropedindex2: 0 })
                    case 3: this.setState({ dropedindex2: 0 })
                    case 4: this.setState({ dropedindex2: 0 })
                    case 5: this.setState({ dropedindex2: 0 })
                }
                switch (this.state.dropedindex3) {
                    case 1: this.setState({ dropedindex3: 0 })
                    case 2: this.setState({ dropedindex3: 0 })
                    case 3: this.setState({ dropedindex3: 0 })
                    case 4: this.setState({ dropedindex3: 0 })
                    case 5: this.setState({ dropedindex3: 0 })
                }
            }
            case 4: {
                dropZoneValues.pop(4)
                switch (this.state.dropedindex1) {
                    case 1: this.setState({ dropedindex1: 0 })
                    case 2: this.setState({ dropedindex1: 0 })
                    case 3: this.setState({ dropedindex1: 0 })
                    case 4: this.setState({ dropedindex1: 0 })
                    case 5: this.setState({ dropedindex1: 0 })
                }
                switch (this.state.dropedindex2) {
                    case 1: this.setState({ dropedindex2: 0 })
                    case 2: this.setState({ dropedindex2: 0 })
                    case 3: this.setState({ dropedindex2: 0 })
                    case 4: this.setState({ dropedindex2: 0 })
                    case 5: this.setState({ dropedindex2: 0 })
                }
                switch (this.state.dropedindex3) {
                    case 1: this.setState({ dropedindex3: 0 })
                    case 2: this.setState({ dropedindex3: 0 })
                    case 3: this.setState({ dropedindex3: 0 })
                    case 4: this.setState({ dropedindex3: 0 })
                    case 5: this.setState({ dropedindex3: 0 })
                }
            }
            case 5: {
                dropZoneValues.pop(5)
                switch (this.state.dropedindex1) {
                    case 1: this.setState({ dropedindex1: 0 })
                    case 2: this.setState({ dropedindex1: 0 })
                    case 3: this.setState({ dropedindex1: 0 })
                    case 4: this.setState({ dropedindex1: 0 })
                    case 5: this.setState({ dropedindex1: 0 })
                }
                switch (this.state.dropedindex2) {
                    case 1: this.setState({ dropedindex2: 0 })
                    case 2: this.setState({ dropedindex2: 0 })
                    case 3: this.setState({ dropedindex2: 0 })
                    case 4: this.setState({ dropedindex2: 0 })
                    case 5: this.setState({ dropedindex2: 0 })
                }
                switch (this.state.dropedindex3) {
                    case 1: this.setState({ dropedindex3: 0 })
                    case 2: this.setState({ dropedindex3: 0 })
                    case 3: this.setState({ dropedindex3: 0 })
                    case 4: this.setState({ dropedindex3: 0 })
                    case 5: this.setState({ dropedindex3: 0 })
                }
            }
        }

        this.setState({ dropZoneValues })
    }

    Secondpan = new Animated.ValueXY();
    SecondpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.Secondpan.x, dy: this.Secondpan.y }
        ]),
        onPanResponderRelease: () => {
            let xdata = JSON.stringify(this.Secondpan.x)
            let ydata = JSON.stringify(this.Secondpan.y)
            console.log(parseInt(xdata), parseInt(ydata))
            if (parseInt(xdata) === 0 && parseInt(ydata) === 0) {

                this.state.disabledvolumshot2 ? this.setState({ disabledvolumshot2: false }) : this.setState({ disabledvolumshot2: true })
            }
            // this.setState({ disabled: true })
            if (parseInt(xdata) > -200 && parseInt(xdata) < -70 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex1 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(2)
                    Animated.spring(this.Secondpan, { toValue: { x: -wp(33.5), y: -145 } }).start()
                    this.setState({ dropedindex1: 2, dropZoneValues })
                } else {
                    Animated.spring(this.Secondpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > -70 && parseInt(xdata) < 50 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex2 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(2)
                    Animated.spring(this.Secondpan, { toValue: { x: 0, y: -145 } }).start()
                    this.setState({ dropedindex2: 2, dropZoneValues })
                } else {
                    Animated.spring(this.Secondpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > 50 && parseInt(xdata) < 200 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex3 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(2)
                    Animated.spring(this.Secondpan, { toValue: { x: wp(33.5), y: -145 } }).start()
                    this.setState({ dropedindex3: 2, dropZoneValues })
                } else {
                    Animated.spring(this.Secondpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else {
                Animated.spring(this.Secondpan, { toValue: { x: 0, y: 0 } }).start()
                this.checkidfunction(2)
            }
        }

    });


    thirdpan = new Animated.ValueXY();
    thirdpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.thirdpan.x, dy: this.thirdpan.y }
        ]),
        onPanResponderRelease: () => {
            let xdata = JSON.stringify(this.thirdpan.x)
            let ydata = JSON.stringify(this.thirdpan.y)
            console.log(parseInt(xdata), parseInt(ydata))
            if (parseInt(xdata) === 0 && parseInt(ydata) === 0) {
                this.state.disabledvolumshot3 ? this.setState({ disabledvolumshot3: false }) : this.setState({ disabledvolumshot3: true })
            }
            // this.setState({ disabled: true })
            if (parseInt(xdata) > -280 && parseInt(xdata) < -170 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex1 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(3)
                    Animated.spring(this.thirdpan, { toValue: { x: -wp(67.5), y: -145 } }).start()
                    this.setState({ dropedindex1: 3, dropZoneValues })
                } else {
                    Animated.spring(this.thirdpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > -170 && parseInt(xdata) < -70 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex2 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(3)
                    Animated.spring(this.thirdpan, { toValue: { x: -wp(33.5), y: -145 } }).start()
                    this.setState({ dropedindex2: 3, dropZoneValues })
                } else {
                    Animated.spring(this.thirdpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > -70 && parseInt(xdata) < 90 && parseInt(ydata) < -75 && parseInt(ydata) > -200) {
                if (this.state.dropedindex3 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(3)
                    Animated.spring(this.thirdpan, { toValue: { x: 0, y: -145 } }).start()
                    this.setState({ dropedindex3: 3, dropZoneValues })
                } else {
                    Animated.spring(this.thirdpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else {
                Animated.spring(this.thirdpan, { toValue: { x: 0, y: 0 } }).start()
                this.checkidfunction(3)

            }
        }

    });

    fourthpan = new Animated.ValueXY();
    fourthpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.fourthpan.x, dy: this.fourthpan.y }
        ]),
        onPanResponderRelease: () => {
            let xdata = JSON.stringify(this.fourthpan.x)
            let ydata = JSON.stringify(this.fourthpan.y)
            console.log(parseInt(xdata), parseInt(ydata))
            if (parseInt(xdata) === 0 && parseInt(ydata) === 0) {
                this.state.disabledvolumshot4 ? this.setState({ disabledvolumshot4: false }) : this.setState({ disabledvolumshot4: true })
            }
            // this.setState({ disabled: true })
            if (parseInt(xdata) > -170 && parseInt(xdata) < -10 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex1 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(4)
                    Animated.spring(this.fourthpan, { toValue: { x: -wp(18.5), y: -235 } }).start()
                    this.setState({ dropedindex1: 4, dropZoneValues })
                } else {
                    Animated.spring(this.fourthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > -70 && parseInt(xdata) < 90 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex2 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(4)
                    Animated.spring(this.fourthpan, { toValue: { x: wp(15), y: -235 } }).start()
                    this.setState({ dropedindex2: 4, dropZoneValues })
                } else {
                    Animated.spring(this.fourthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > 90 && parseInt(xdata) < 200 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex3 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(4)
                    Animated.spring(this.fourthpan, { toValue: { x: wp(48.5), y: -235 } }).start()
                    this.setState({ dropedindex3: 4, dropZoneValues })
                } else {
                    Animated.spring(this.fourthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else {
                Animated.spring(this.fourthpan, { toValue: { x: 0, y: 0 } }).start()
                this.checkidfunction()


            }
        }

    });


    fifthpan = new Animated.ValueXY();
    fifthpanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: this.fifthpan.x, dy: this.fifthpan.y }
        ]),
        onPanResponderRelease: () => {
            let xdata = JSON.stringify(this.fifthpan.x)
            let ydata = JSON.stringify(this.fifthpan.y)
            console.log(parseInt(xdata), parseInt(ydata))
            if (parseInt(xdata) === 0 && parseInt(ydata) === 0) {
                this.state.disabledvolumshot5 ? this.setState({ disabledvolumshot5: false }) : this.setState({ disabledvolumshot5: true })
            }
            // this.setState({ disabled: true })
            if (parseInt(xdata) > -270 && parseInt(xdata) < -70 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex1 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(5)
                    Animated.spring(this.fifthpan, { toValue: { x: -wp(48.5), y: -235 } }).start()
                    this.setState({ dropedindex1: 5, dropZoneValues })
                } else {
                    Animated.spring(this.fifthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > -70 && parseInt(xdata) < 10 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex2 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(5)
                    Animated.spring(this.fifthpan, { toValue: { x: -wp(15), y: -235 } }).start()
                    this.setState({ dropedindex2: 5, dropZoneValues })
                } else {
                    Animated.spring(this.fifthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else if (parseInt(xdata) > 10 && parseInt(xdata) < 200 && parseInt(ydata) < -165 && parseInt(ydata) > -243) {
                if (this.state.dropedindex3 === 0) {
                    let dropZoneValues = this.state.dropZoneValues
                    dropZoneValues.push(5)
                    Animated.spring(this.fifthpan, { toValue: { x: wp(18.5), y: -235 } }).start()
                    this.setState({ dropedindex3: 5, dropZoneValues })
                } else {
                    Animated.spring(this.fifthpan, { toValue: { x: 0, y: 0 } }).start()
                }
            } else {
                Animated.spring(this.fifthpan, { toValue: { x: 0, y: 0 } }).start()
                this.checkidfunction(5)

            }
        }

    });
    componentDidMount() {
        // this.myComponent.measure( (fx, fy, width, height, px, py) => {
        //     console.log('Component width is: ' + width)
        //     console.log('Component height is: ' + height)
        //     console.log('X offset to frame: ' + fx)
        //     console.log('Y offset to frame: ' + fy)
        //     console.log('X offset to page: ' + px)
        //     console.log('Y offset to page: ' + py)
        // }) 
    }


    showNextLessons() {
        this.props.navigation.navigate('ComprehensionScreen')
    }
    showPreviousLessons() {
        this.props.navigation.goBack()
    }

    render() {
        console.log(this.state.dropZoneValues)
        return layout(this)
    }
}

