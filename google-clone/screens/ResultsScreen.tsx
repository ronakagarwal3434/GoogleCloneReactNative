import React from 'react';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Results: {imageUri: string};
};

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, 'Results'>;

interface Result {
  id: string;
  title: string;
  price: string;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({route}) => {
  const {imageUri} = route.params;

  const mockResults: Result[] = [
    {id: '1', title: 'Amazon', price: '$29.99'},
    {id: '2', title: 'Myntra', price: '$35.50'},
  ];

  return (
    <Container>
      <Header>
        <Icon name="arrow-back" size={25} onPress={() => {}} />
        <Title>Results</Title>
        <Icon name="ellipsis-vertical" size={25} />
      </Header>
      <ImagePreview source={{uri: imageUri}} />
      <FlatList
        data={mockResults}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ResultItem>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </ResultItem>
        )}
      />
      <LottieView
        source={require('../assets/animations/glowing-stars.json')}
        autoPlay
        loop
        style={{position: 'absolute', bottom: 0, width: 200, height: 200}}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #f8f9fa;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const ImagePreview = styled.Image`
  height: 300px;
  width: 100%;
`;

const ResultItem = styled.View`
  background-color: #fff;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  elevation: 2;
`;

export default ResultsScreen;
