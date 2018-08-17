/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    CameraRoll,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import React,{Component} from 'react';
var AV = require('leancloud-storage');
AV.initialize('NE1T3uRn8zjIWsmETEbsqpEu', '5K5HYy0wUmhryfKyQY2w1GtT');
export default class App extends Component<{}> {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      images: [],
      hint: '点击图片上传云端',
    };
  }

  componentDidMount() {
    CameraRoll.getPhotos({
      first: 9
    }).then(this.showImages.bind(this), (err) => this.log('Error: ' + err.message));
  }

  showImages(data) {
    var assets = data.edges;
    var images = assets.map((asset) => asset.node.image);
    this.setState({images});
  }

  upload(image) {
    var file = new AV.File('react-native-demo-image.jpg', {
      blob: image
    });
    file.save()
        .then((res) => this.log('Uploaded: ' + res.url()))
        .catch((err) => {
          this.log('Error: ' + err.message);
          console.log(error);
        });
    this.log('Uploading');
  }

  log(hint){
    console.log(hint);
    this.setState({hint});
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            LeanCloud图片上传Demo
          </Text>
          <ScrollView style={{flex: 1}}>
            <View style={styles.imageGrid}>
              {this.state.images.map((image) =>
                  <TouchableOpacity onPress={()=>this.upload(image)} key={image.uri}>
                    <Image style={styles.image} source={{uri: image.uri}}/>
                  </TouchableOpacity>
              )}
            </View>
            <Text style={styles.hint}>
              {this.state.hint}
            </Text>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  hint: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    margin: 4,
  }
});