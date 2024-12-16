import React, {useState, useEffect} from 'react';
import {Alert, StatusBar, TouchableOpacity} from 'react-native';
import {
  Camera,
  useCameraDevices,
  PhotoFile,
  CameraDevice,
} from 'react-native-vision-camera';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  ChevronLeftIcon,
  DotsHorizontalIcon,
  FlashIcon,
  FlashOffIcon,
  GoogleLensIcon,
  HistoryIcon,
  IdeogramCjkVariantIcon,
  ImageMultipleOutlineIcon,
  MagnifyIcon,
  SchoolOutlineIcon,
} from '../assets/icons';
import {SCREEN_NAMES} from '../util/constants';

type RootStackParamList = {};

type CameraScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CameraScreen'
>;

const CameraScreen: React.FC<CameraScreenProps> = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [selectedTab, setSelectedTab] = useState<
    'Translate' | 'Search' | 'Homework'
  >('Search');

  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const devices = useCameraDevices();
  const device: CameraDevice | undefined = devices.find(
    d => d.position === 'back',
  );

  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();

      if (cameraPermission === 'denied' || microphonePermission === 'denied') {
        Alert.alert(
          'Permissions required',
          'Camera and microphone permissions are required to use this feature.',
        );
      }

      setHasPermission(
        cameraPermission === 'granted' && microphonePermission === 'granted',
      );
    })();
  }, []);

  const handleTabPress = (tab: 'Translate' | 'Search' | 'Homework') => {
    setSelectedTab(tab);
  };

  const handleCapture = async () => {
    if (cameraRef) {
      try {
        const photo: PhotoFile = await cameraRef.takePhoto({
          qualityPrioritization: 'speed',
          flash: flashMode,
          output: 'file',
        });

        navigation.navigate(SCREEN_NAMES.CROP, {imageUri: photo.path});
      } catch (error) {
        console.error('Error capturing photo:', error);
        Alert.alert('Capture Error', 'Failed to capture photo');
      }
    }
  };

  const toggleFlashMode = () => {
    setFlashMode(prevMode => (prevMode === 'off' ? 'on' : 'off'));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.assets && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        navigation.navigate(SCREEN_NAMES.CROP, {imageUri: selectedImage.uri});
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Gallery Error', 'Failed to select image');
    }
  };

  if (!device || !hasPermission) {
    return (
      <Container>
        <ErrorText>
          {!device ? 'No camera device found' : 'Camera permission denied'}
        </ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Camera View */}
      <CameraContainer>
        <StyledCamera
          device={device}
          isActive={true}
          ref={ref => setCameraRef(ref)}
          photo={true}
          torch={flashMode}
        />

        {/* Header Icons */}
        <Header>
          <TouchableOpacity onPress={handleGoBack}>
            <ChevronLeftIcon width="24" height="24" fill="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFlashMode}>
            {flashMode === 'off' ? (
              <FlashOffIcon width="24" height="24" fill="#fff" />
            ) : (
              <FlashIcon width="24" height="24" fill="#fff" />
            )}
          </TouchableOpacity>
          <GoogleLensIcon width="32" height="32" fill="#fff" />
          <HistoryIcon width="24" height="24" fill="#fff" />
          <DotsHorizontalIcon width="24" height="24" fill="#fff" />
        </Header>

        {/* Focus Curvy Borders */}
        <FocusArea>
          <CurvyBorderTopLeft />
          <CurvyBorderTopRight />
          <CurvyBorderBottomLeft />
          <CurvyBorderBottomRight />
        </FocusArea>

        {/* Capture Button */}
        <Footer>
          <FooterButton onPress={handlePickFromGallery}>
            <ImageMultipleOutlineIcon width="28" height="28" fill="#fff" />
          </FooterButton>

          <CaptureButton onPress={handleCapture}>
            <InnerCapture />
          </CaptureButton>

          <FooterButton />
        </Footer>
      </CameraContainer>

      {/* Bottom Section */}
      <BottomSection>
        <TabsSection>
          <Button
            onPress={() => handleTabPress('Translate')}
            isSelected={selectedTab === 'Translate'}>
            <IdeogramCjkVariantIcon
              width="14"
              height="14"
              fill={selectedTab === 'Translate' ? '#a2c1f2' : '#a6c6f9'}
            />
            <ButtonText isSelected={selectedTab === 'Translate'}>
              Translate
            </ButtonText>
          </Button>
          <Button
            onPress={() => handleTabPress('Search')}
            isSelected={selectedTab === 'Search'}>
            <MagnifyIcon
              width="14"
              height="14"
              fill={selectedTab === 'Search' ? '#a2c1f2' : '#a6c6f9'}
            />
            <ButtonText isSelected={selectedTab === 'Search'}>
              Search
            </ButtonText>
          </Button>
          <Button
            onPress={() => handleTabPress('Homework')}
            isSelected={selectedTab === 'Homework'}>
            <SchoolOutlineIcon
              width="14"
              height="14"
              fill={selectedTab === 'Homework' ? '#a2c1f2' : '#a6c6f9'}
            />
            <ButtonText isSelected={selectedTab === 'Homework'}>
              Homework
            </ButtonText>
          </Button>
        </TabsSection>
      </BottomSection>
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #202125;
`;

const CameraContainer = styled.View`
  flex: 9;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  overflow: hidden;
  position: relative;
`;

const StyledCamera = styled(Camera)`
  flex: 1;
`;

const Header = styled.View`
  position: absolute;
  top: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  z-index: 2;
`;

const FocusArea = styled.View`
  position: absolute;
  top: 30%;
  left: 20%;
  width: 60%;
  height: 35%;
  justify-content: center;
  align-items: center;
`;

const CurvyBorder = styled.View`
  position: absolute;
  width: 50px;
  height: 50px;
  border-color: #fff;
  border-width: 1px;
`;

const CurvyBorderTopLeft = styled(CurvyBorder)`
  top: 0;
  left: 0;
  border-right-width: 0;
  border-bottom-width: 0;
  border-top-left-radius: 40px;
`;

const CurvyBorderTopRight = styled(CurvyBorder)`
  top: 0;
  right: 0;
  border-left-width: 0;
  border-bottom-width: 0;
  border-top-right-radius: 40px;
`;

const CurvyBorderBottomLeft = styled(CurvyBorder)`
  bottom: 0;
  left: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-left-radius: 40px;
`;

const CurvyBorderBottomRight = styled(CurvyBorder)`
  bottom: 0;
  right: 0;
  border-left-width: 0;
  border-top-width: 0;
  border-bottom-right-radius: 40px;
`;

const Footer = styled.View`
  position: absolute;
  bottom: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CaptureButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 40px;
  border: 3px #fff;
  justify-content: center;
  align-items: center;
`;

const InnerCapture = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 350px;
  background-color: #fff;
`;

const BottomSection = styled.View`
  flex: 1;
  background-color: #202125;
  border-top-left-radius: 3px;
  border-top-right-radius: 30px;
`;

const TabsSection = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: #202125;
  padding: 10px;
`;

const Button = styled.TouchableOpacity<{isSelected: boolean}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 20px;
  padding: 4px 10px;
  box-sizing: border-box;
  background-color: ${({isSelected}) => (isSelected ? '#394456' : '#202226')};
  border-width: ${({isSelected}) => (isSelected ? 0 : '1px')};
  border-color: ${({isSelected}) => (isSelected ? 'transparent' : '#515355')};
`;

const ButtonText = styled.Text<{isSelected: boolean}>`
  color: ${({isSelected}) => (isSelected ? '#a2c1f2' : '#9d9ea2')};
  font-size: 13px;
`;

const ErrorText = styled.Text`
  color: white;
  font-size: 18px;
  text-align: center;
`;

export default CameraScreen;
