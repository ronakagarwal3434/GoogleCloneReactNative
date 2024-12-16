import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

const InfoCards = ({infoData}) => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    <Container>
      {infoData.map((data, index) => (
        <Card key={index}>
          <Title>{data.title}</Title>
          <Subtitle>{data.subtitle}</Subtitle>
          <IconWrapper style={{position: 'absolute', bottom: 8, right: 10}}>
            {data.icon}
          </IconWrapper>
        </Card>
      ))}
    </Container>
  </ScrollView>
);

const Container = styled.View`
  flex-direction: row;
  gap: 10px;
  margin: 0 20px 20px 20px;
`;

const Card = styled.View`
  height: 80px;
  width: 150px;
  padding: 12px;
  border-radius: 14px;
  border: 1px #414246;
`;

const Title = styled.Text`
  color: #ffffff;
  margin-bottom: 5px;
  font-size: 14px;
`;

const Subtitle = styled.Text`
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  position: absolute;
  bottom: 12px;
  left: 12px;
`;

const IconWrapper = styled.TouchableOpacity`
  padding: 5px;
`;

export default InfoCards;
