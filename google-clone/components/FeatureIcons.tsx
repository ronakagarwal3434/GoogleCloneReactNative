import React from 'react';
import styled from 'styled-components/native';
import {FEATURE_ICONS} from '../util/constants';
import {
  ImageSearchOutlineIcon,
  IdeogramCjkVariantIcon,
  SchoolOutlineIcon,
  MusicNoteOutlineIcon,
} from '../assets/icons';

const icons = {
  ImageSearchOutlineIcon,
  IdeogramCjkVariantIcon,
  SchoolOutlineIcon,
  MusicNoteOutlineIcon,
};

const FeatureIcons = () => (
  <Container>
    {FEATURE_ICONS.map(({bgColor, icon, color}, index) => {
      const IconComponent = icons[icon];
      return (
        <FeatureIcon key={index} bgColor={bgColor}>
          <IconComponent width="20" height="20" fill={color} />
        </FeatureIcon>
      );
    })}
  </Container>
);

const Container = styled.View`
  margin-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const FeatureIcon = styled.TouchableOpacity`
  background-color: ${props => props.bgColor || '#36404e'};
  padding: 15px 20px;
  border-radius: 24px;
  width: 80px;
  align-items: center;
`;

export default FeatureIcons;
