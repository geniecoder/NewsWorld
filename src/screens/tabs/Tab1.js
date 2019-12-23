import React, {Component} from 'react';
import {Alert, View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';

import {getArticles} from '../../service/news';
import DataItem from '../../component/dataItem';
import Modal from '../../component/model';

export default class ListThumbnailExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: null,
      setModalVisible: false,
      modalArticleData: {},
    };
  }

  handleItemDataOnPress = (articleData) => {
    this.setState({
      setModalVisible: true,
      modalArticleData: articleData,
    });
    console.log(`handelItemDataOnPress working`);
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  componentDidMount() {
    getArticles().then(
      data => {
        this.setState({
          isLoading: false,
          data: data,
        });
      },
      error => {
        Alert.alert('Error', 'Something went wrong!');
      },
    );
  }

  render() {
    let view = this.state.isLoading ? (
      <View style={styles.loadingSytle}>
        <ActivityIndicator animation={this.state.isLoading} />
        <Text style={{marginTop: 10}}>Please wait...</Text>
      </View>
    ) : (
      <List
        dataArray={this.state.data}
        renderRow={item => {
          return <DataItem onPress={this.handleItemDataOnPress} data={item} />;
        }}
      />
    );
    return (
      <Container contentContainerStyle={{flex: 1}}>
        <Content contentContainerStyle={{flex: 1}}>{view}</Content>
        <Modal
          showModal={this.state.setModalVisible}
          articleData={this.state.modalArticleData}
          onClose={this.handleModalClose}
        />
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  loadingSytle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
