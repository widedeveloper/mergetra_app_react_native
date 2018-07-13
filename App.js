
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  WebView
} from 'react-native';
import AppScreen from './src'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppScreen />
    );
  }
}


