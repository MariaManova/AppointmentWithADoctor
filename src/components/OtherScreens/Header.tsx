
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ColorApp } from '../../constants';
import { Icon } from 'react-native-elements';


const Header = ({ title, onPressLeft, leftIcon, onPressRight, rightIcon }: any) => {
  const { container, containerBtn,titleStyle,positionRight, iconLeftStyle, iconRightStyle } = styles
  return (
          <View style={container}>
            {leftIcon && 
              <TouchableOpacity 
                onPress={onPressLeft} 
                style={containerBtn}>
                <Icon
                  name={leftIcon}
                  style={iconLeftStyle} color='#fff' />
              </TouchableOpacity>
            }
            <Text style={titleStyle}>{title}</Text>
            {rightIcon && 
            <View style={positionRight}>
              <TouchableOpacity onPress={onPressRight}  
                style={containerBtn}>
                <Icon
                  name={rightIcon}
                  style={iconRightStyle} color='#fff' />
              </TouchableOpacity>
          </View>
            }
          </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorApp,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  containerBtn: {
    //backgroundColor: 'gold',
    padding:20,
    borderRadius: 35,
    marginLeft: 5,
  },
  titleStyle: {
    marginLeft: 20,
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  iconLeftStyle: {
    width: 20,
    height: 20,
  },
  positionRight:{
    position: "absolute",
    right: -3
  },
  iconRightStyle: {    
    width: 25,
    height: 25, 
  }
})

export { Header }
