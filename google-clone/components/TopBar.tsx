import React from 'react';
import {TouchableOpacity, Modal, Text, StyleSheet, View} from 'react-native';
import styled from 'styled-components/native';
import {FlaskIcon, AccountCircleOutlineIcon} from '../assets/icons';
import ProfileImage from './ProfileImage';
import {
  CloseIcon,
  IncognitoIcon,
  CogIcon,
  HelpLineCircleIcon,
} from '../assets/icons';

interface TopBarProps {
  userSignedIn: boolean;
  userPhoto: string | null;
  userName: string | null;
  signInMethod: () => void;
  signOutMethod: () => void;
  toggleUserModal: () => void;
  isModalVisible: boolean;
  showUserModal: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopBar: React.FC<TopBarProps> = ({
  userSignedIn,
  userPhoto,
  userName,
  signInMethod,
  signOutMethod,
  toggleUserModal,
  setModalVisible,
  showUserModal,
  isModalVisible,
}) => {
  return (
    <>
      <TopBarContainer>
        <TouchableOpacity>
          <FlaskIcon width="28" height="28" fill="#a7c7fa" />
        </TouchableOpacity>
        {userSignedIn ? (
          <ProfileImageContainer onPress={toggleUserModal}>
            <ProfileImage
              source={
                userPhoto
                  ? {uri: userPhoto}
                  : require('../assets/icons/account-circle.svg')
              }
              large={false}
            />
          </ProfileImageContainer>
        ) : (
          <AccountCircleOutlineIcon
            onPress={() => setModalVisible(true)}
            width="32"
            height="32"
            fill="#a7c7fa"
          />
        )}
      </TopBarContainer>

      {/* User Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showUserModal}
        onRequestClose={toggleUserModal}>
        <UserModalContainer onPress={toggleUserModal}>
          <UserModalContent>
            <CloseButton onPress={toggleUserModal}>
              <CloseIcon width="20" height="20" fill="#ffffff" />
            </CloseButton>

            <ProfileImageWrapper>
              <ProfileImage
                large={true}
                source={
                  userPhoto
                    ? {uri: userPhoto}
                    : require('../assets/icons/account-circle.svg')
                }
              />
            </ProfileImageWrapper>

            <UserName>{userName || 'Anonymous User'}</UserName>

            <SignOutButton onPress={signOutMethod}>
              <SignOutText>Sign Out</SignOutText>
            </SignOutButton>
          </UserModalContent>
        </UserModalContainer>
      </Modal>

      {/* Sign In Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <ModalContainer>
          <ModalContent>
            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseIcon width="20" height="20" fill="#ffffff" />
            </CloseButton>

            <Text style={styles.googleText}>Google</Text>

            <View style={styles.centeredContainer}>
              <SignInButton onPress={signInMethod}>
                <Text style={styles.signInText}>Sign In</Text>
              </SignInButton>
            </View>

            <Divider />

            <MenuItem>
              <IncognitoIcon width="20" height="20" fill="#ffffff" />
              <MenuText>New Chrome incognito tab</MenuText>
            </MenuItem>

            <Divider />

            <MenuItem>
              <CogIcon width="20" height="20" fill="#ffffff" />
              <MenuText>Settings</MenuText>
            </MenuItem>
            <MenuItem>
              <HelpLineCircleIcon width="20" height="20" fill="#ffffff" />
              <MenuText>Help & feedback</MenuText>
            </MenuItem>

            <Divider />

            <Footer>
              <Text style={styles.footerText}>Privacy Policy</Text>
              <Text style={styles.footerText}> · </Text>
              <Text style={styles.footerText}>Terms of Service</Text>
            </Footer>
          </ModalContent>
        </ModalContainer>
      </Modal>
    </>
  );
};

// Styled Components
const TopBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const ProfileImageContainer = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
  width: 90%;
  padding-vertical: 20px;
  background-color: #2d2d2d;
  border-radius: 10px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 30px;
`;

const SignInButton = styled.TouchableOpacity`
  width: 40%;
  padding: 10px;
  background-color: #4285f4;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 10px;
  padding-horizontal: 30px;
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-left: 20px;
`;

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #444;
  margin-vertical: 10px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const UserModalContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const UserModalContent = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #2d2d2d;
  border-radius: 10px;
  align-items: center;
  position: relative;
`;

const ProfileImageWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UserName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;

const SignOutButton = styled.TouchableOpacity`
  width: 100%;
  padding: 12px;
  background-color: #e74c3c;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const SignOutText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

const styles = StyleSheet.create({
  googleText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  signInText: {
    fontSize: 16,
    color: '#ffffff',
  },
  footerText: {
    fontSize: 12,
    color: '#cccccc',
  },
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default TopBar;
