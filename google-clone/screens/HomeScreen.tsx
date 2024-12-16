import React, {useContext, useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {SharedElement} from 'react-navigation-shared-element';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SCREEN_NAMES} from '../util/constants';
import SearchContainer from '../components/SearchContainer';
import TopBar from '../components/TopBar';
import FeatureIcons from '../components/FeatureIcons';
import InfoCards from '../components/InfoCards';

import {
  GoogleLensIcon,
  MagnifyIcon,
  MicrophoneIcon,
  MusicNoteOutlineIcon,
  WavesIcon,
  WeatherCloudyIcon,
} from '../assets/icons';
import ContentSection from '../components/ContentSection';
import axios from 'axios';
import {AuthContext} from '../context/AuthContext';

const infoData = [
  {
    title: 'Gurugram',
    subtitle: '30°',
    icon: <WeatherCloudyIcon width="20" height="20" fill="#c8dcfa" />,
  },
  {
    title: 'Air Quality · 170',
    subtitle: 'Moderate',
    icon: <WavesIcon width="20" height="20" fill="#ffff00" />,
  },
  {
    title: 'Music',
    subtitle: 'Now Playing',
    icon: <MusicNoteOutlineIcon width="20" height="20" fill="#e98d86" />,
  },
];

const HomePage = () => {
  const {userName, userPhoto, userSignedIn, signInMethod, signOutMethod} =
    useContext(AuthContext);
  const [newsData, setNewsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const navigation = useNavigation();

  const toggleUserModal = () => setShowUserModal(!showUserModal);

  const fetchNews = async () => {
    const apiKey =
      '0197f821bdb38d4ac01d5a638ba2a4b7cde5485be01ec9c0d33f096dcc7dfb30';

    try {
      const response = await axios.get(
        `https://serpapi.com/search.json?engine=google_news&gl=in&hl=en&api_key=${apiKey}`,
      );
      if (response.data && response.data.news_results) {
        setNewsData(response.data.news_results);
      } else {
        console.warn('No news data found.');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const navigateToSearch = () => {
    navigation.navigate(SCREEN_NAMES.SEARCH);
  };

  const handleSignIn = async () => {
    await signInMethod();
    setModalVisible(false);
  };

  const handleSignOut = async () => {
    await signOutMethod();
    setShowUserModal(false);
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.BACKGROUND} />
      <TopBar
        userSignedIn={userSignedIn}
        userPhoto={userPhoto}
        userName={userName}
        signInMethod={handleSignIn}
        signOutMethod={handleSignOut}
        toggleUserModal={toggleUserModal}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        showUserModal={showUserModal}
      />
      <GoogleLogoContainer>
        <GoogleLogo
          source={require('../assets/images/google_white_logo.png')}
        />
      </GoogleLogoContainer>
      <TouchableOpacity onPress={navigateToSearch}>
        <SharedElement id="searchInput">
          <SearchContainer
            leftIcon={<MagnifyIcon width="24" height="24" fill="#aaa" />}
            rightIcons={[
              <MicrophoneIcon
                width="24"
                height="24"
                fill="#ffffff"
                onPress={() => navigation.navigate(SCREEN_NAMES.VOICE_SEARCH)}
              />,
              <GoogleLensIcon
                width="24"
                height="24"
                fill="#ffffff"
                onPress={() => navigation.navigate(SCREEN_NAMES.CAMERA)}
              />,
            ]}
            inputProps={{
              placeholder: 'Search',
              placeholderTextColor: '#aaa',
              editable: false,
            }}
            containerStyle={{
              backgroundColor: '#2f3133',
              marginHorizontal: 20,
            }}
          />
        </SharedElement>
      </TouchableOpacity>
      <FeatureIcons />
      <Divider />
      <InfoCards infoData={infoData} />
      <ContentSection data={newsData} />
    </Container>
  );
};

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BACKGROUND};
  padding-vertical: 20px;
`;

const Divider = styled.View`
  margin-vertical: 15px;
  height: 0.5px;
  background-color: #414246;
`;

const GoogleLogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-vertical: 40px;
`;

const GoogleLogo = styled.Image`
  width: 150px;
  height: 50px;
`;

export default HomePage;
