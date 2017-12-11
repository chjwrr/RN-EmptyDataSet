import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';

import PropTypes from 'prop-types'


let isEndAnimal = false;

export default class emptyDataSet extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            showAnimal: false,
            animalTyle: 'opacity',
            spinValue:  new Animated.Value(0),
        };

        this.springAnimal = this.springAnimal.bind(this);
        this.opacityAnimal = this.opacityAnimal.bind(this);
        this.transformAnimal = this.transformAnimal.bind(this);
        this.scaleAnimal = this.scaleAnimal.bind(this);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');

        // 停止动画
        this.state.spinValue.stopAnimation(()=>{
            console.log('EndAnimal');
            isEndAnimal = false;
        });

    }

    /*开始动画*/
    springAnimal(){
        console.log('springAnimal');
        console.log('isEndAnimal: ', isEndAnimal);

        if (isEndAnimal){
            console.log('springAnimal loading...');

            this.state.spinValue.setValue(0);
            Animated.timing(
                this.state.spinValue,
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear
                }
            ).start(()=>{
                if (this.state.animalTyle !== 'transform'){
                    Animated.timing(
                        this.state.spinValue,
                        {
                            toValue: 0,
                            duration: 1000,
                            easing: Easing.linear
                        }
                    ).start(()=>{
                        this.springAnimal();
                    });
                }else {
                    this.springAnimal();
                }
            });
        }
    }

    // 渐隐动画
    opacityAnimal(){
        return {opacity: this.state.spinValue }
    }

    // 旋转动画
    transformAnimal(){
        // 旋转动画 利用 interpolate 方法将数值 0~1 映射到了 0deg~360deg
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],                // [0,0.5,1]改成这样会有不同的效果
            outputRange: ['0deg', '360deg']    //  ['0deg', '360deg','0deg']改成这样会有不同的效果，
        });
        return {transform: [{rotate: spin}] };
    }

    // 缩放动画
    scaleAnimal(){
        return {transform: [{scale: this.state.spinValue}]}
    }

    render() {
        
        const {
            normalImage,
            animalImage,
            topSpace,
            titleTopSpace,
            title,
            description,
            descriptionTopSpace,
            buttonTopSpace,
            buttonTitle,
            isShowAnimal,
            animalTyle,
            customElement,
            screenClick,
            buttonClick
        } = this.props;


        let animal ;

        switch (this.state.animalTyle){
            case 'opacity':
                animal = this.opacityAnimal();
                break;
            case 'scale':
                animal = this.scaleAnimal();
                break;
            case 'transform':
                animal = this.transformAnimal();
                break;
        }


        return (
            <TouchableOpacity style={styles.container} onPress={()=>{
                console.log('点击屏幕');
                screenClick();
            }}>
                <View style={{top: topSpace, alignItems: 'center'}}>

                    {
                        normalImage ? this.state.showAnimal ?<Animated.Image
                                    style={animal}
                                    source={animalImage} /> : <Image source={normalImage} /> : null
                    }

                    {
                         title ? <Text style={[styles.titleStyle, {marginTop: titleTopSpace}]}>{ title }</Text> : null
                    }

                    {
                         description ? <Text style={[ styles.descriptionStyle, {marginTop:  descriptionTopSpace} ]}>
                                 { description }
                              </Text> : null
                    }

                    {
                        buttonTitle ?  <TouchableOpacity style={[ styles.buttonTitleStyle, {marginTop:  buttonTopSpace}]}
                                                          onPress={()=>{
                                                              console.log('点击按钮');

                                                              buttonClick();

                                                              if (isShowAnimal){
                                                                  this.setState({
                                                                      showAnimal: true,
                                                                      animalTyle
                                                              }, ()=>{
                                                                      isEndAnimal = true;
                                                                      this.springAnimal()
                                                                  });
                                                              }

                                                          }}>
                            <Text style={{color: '#4876FF'}}>{ buttonTitle }</Text>
                        </TouchableOpacity> : null
                    }

                    {
                        customElement
                    }

                </View>

            </TouchableOpacity>
        );
    }
}

/*声明属性*/
emptyDataSet.propTypes = {
    topSpace: PropTypes.number, // 子组件距离上部间距
    titleTopSpace: PropTypes.number, // 标题距离上部间距
    title: PropTypes.string, // 标题
    description: PropTypes.string, // 描述
    descriptionTopSpace: PropTypes.number, // 描述距离上部间距
    buttonTopSpace: PropTypes.number, // 默认按钮距离上部间距
    buttonTitle: PropTypes.string, // 默认按钮标题
    isShowAnimal: PropTypes.bool, // 是否显示动画
    animalTyle: PropTypes.string, // 动画类型 opacity(渐变)  transform(旋转)  scale(缩放)
    customElement: PropTypes.element, // 自定义组件
    screenClick: PropTypes.func, // 点击屏幕触发方法
    buttonClick: PropTypes.func, // 点击默认按钮触发方法
};

/*属性默认值*/
emptyDataSet.defaultProps = {
    normalImage: {},
    animalImage: {},
    topSpace: 100,
    titleTopSpace: 10,
    title: '',
    description: '',
    descriptionTopSpace: 10,
    buttonTopSpace: 20,
    buttonTitle: '',
    isShowAnimal: false,
    animalTyle: 'transform',
    screenClick: ()=>{},
    buttonClick: ()=>{}
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 17,
        fontWeight: 'bold'
    },
    descriptionStyle: {
        textAlign: 'center',
        fontSize: 14,
        color: '#ABABAB',
        marginHorizontal: 10,
    },
    buttonTitleStyle:{
        height: 44,
        justifyContent: 'center',
        marginHorizontal: 10
    }

});
