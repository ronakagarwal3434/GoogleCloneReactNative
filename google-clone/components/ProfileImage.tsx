import React from 'react';
import styled from 'styled-components/native';

interface ProfileImageProps {
  source: {uri: string} | any;
  large?: boolean;
}

const ProfileImage: React.FC<ProfileImageProps> = ({source, large = false}) => {
  return <StyledImage source={source} large={large} />;
};

const StyledImage = styled.Image<ProfileImageProps>`
  width: ${props => (props.large ? '80px' : '32px')};
  height: ${props => (props.large ? '80px' : '32px')};
  border-radius: ${props => (props.large ? '40px' : '16px')};
  background-color: #ccc;
`;

export default ProfileImage;
