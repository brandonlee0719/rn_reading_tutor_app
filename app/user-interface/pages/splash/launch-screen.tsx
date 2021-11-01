
import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text, Image, StyleSheet } from 'react-native';
import { StackActions, NavigationProp } from '@react-navigation/native';
import ProgressBar from '../../components/progress-bar';
import { getItem, IS_LOGGED_IN } from '../../../utils/prefUtils';

interface Props {
    navigation: NavigationProp<any, any>
}

export class LaunchScreen extends Component<Props> {

    state = {
        
        totalSecond: 0,
        maxSecond : 4
    }

    componentDidMount= async () => {
        let is_login = await getItem(IS_LOGGED_IN)

        setTimeout(() => 
        this.props.navigation.dispatch(
            // StackActions.replace('SignInScreen')
            StackActions.replace(is_login === "1" ? 'MyLearnersScreen' : 'SignUpScreen')
            // StackActions.replace('SignUpScreen')
        ), this.state.maxSecond * 1000 + 500)

        const interval = setInterval(() => {
            let time = this.state.totalSecond + 0.015625
            this.setState({totalSecond : time})
            if (time >= this.state.maxSecond){
                clearInterval(interval)
            }
        }, 15.625);

    }
    componentWillUnmount(){
        
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' backgroundColor='white' />
                <View style={styles.container}>
                    <View style={styles.centeredContent}>
                        <Image
                            style={styles.logo}
                            source={require('../../../assets/images/img-ort-logo.png')}
                        />
                    </View>
                    <View style={{ marginTop: 28 }}></View>
                    <ProgressBar
                    
                        progress={this.state.totalSecond * (100/4)}
                    ></ProgressBar>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredContent: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 300,
        height: 80,
    }
})
