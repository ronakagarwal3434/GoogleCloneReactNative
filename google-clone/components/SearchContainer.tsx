// SearchContainer.tsx
import React from 'react';
import styled from 'styled-components/native';
import {TextInputProps, ViewStyle} from 'react-native';

interface SearchContainerProps {
  leftIcon?: React.ReactNode;
  rightIcons?: React.ReactNode[];
  inputProps?: TextInputProps;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
}

const SearchContainer: React.FC<SearchContainerProps> = ({
  leftIcon,
  rightIcons = [],
  inputProps,
  style,
  containerStyle,
}) => {
  return (
    <Container style={containerStyle}>
      {leftIcon && <LeftIconWrapper>{leftIcon}</LeftIconWrapper>}
      <SearchInput {...inputProps} style={style} />
      {rightIcons.map((icon, index) => (
        <IconWrapper key={index}>{icon}</IconWrapper>
      ))}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #2f3133;
  padding: 8px 20px;
  border-radius: 40px;
  margin: 10px;
`;

const LeftIconWrapper = styled.View`
  margin-right: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #9ca0a3;
  font-size: 16px;
  margin-horizontal: 5px;
`;

const IconWrapper = styled.TouchableOpacity`
  padding: 5px;
`;

export default SearchContainer;
