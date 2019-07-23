import React from 'react';

import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from "@up-shared/components";

const Touchable = Platform.select({
  android: TouchableOpacity,
  default: TouchableHighlight,
});

function MenuItem({
  children,
  disabled,
  disabledTextColor,
  ellipsizeMode,
  onPress,
  style,
  textStyle,
  ...props
}) {
  const touchableProps =
    Platform.OS === 'android'
      ? { }
      : {};

  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      {...touchableProps}
      {...props}
    >
      <View style={[styles.container, style]}>
        <View style={styles.itemContainer}>
          {props.icon ? <Icon name={props.icon} size={16} style={styles.icon} /> : null}
            <Text
              ellipsizeMode={ellipsizeMode}
              numberOfLines={1}
              style={[
                styles.title,
                disabled && { color: disabledTextColor },
                textStyle,
              ]}
            >
              {children}
            </Text>
        </View>
      </View>
    </Touchable>
  );
}

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  disabledTextColor: PropTypes.string,
  ellipsizeMode: PropTypes.string,
  onPress: PropTypes.func,
  style: TouchableHighlight.propTypes.style,
  textStyle: Text.propTypes.style,
  underlayColor: TouchableHighlight.propTypes.underlayColor,
};

MenuItem.defaultProps = {
  disabled: false,
  disabledTextColor: '#bdbdbd',
  ellipsizeMode: Platform.OS === 'ios' ? 'clip' : 'tail',
  underlayColor: '#e0e0e0',
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    maxWidth: 248,
    minWidth: 124,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 44,    
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 10,
  },
  icon: {
    width: 10,
    height: 10,
  }
});

export default MenuItem;
