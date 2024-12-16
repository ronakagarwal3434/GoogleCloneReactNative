import React, {useState, useEffect, useRef} from 'react';
import {StatusBar, Alert, Platform, PermissionsAndroid} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

import LottieView from 'lottie-react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {ChevronLeftIcon, MusicNoteOutlineIcon, WebIcon} from '../assets/icons';
import {SCREEN_NAMES} from '../util/constants';

type RootStackParamList = {
  Search: {query: string};
};

type VoiceSearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'VoiceSearch'
>;

const VoiceSearchScreen: React.FC<VoiceSearchScreenProps> = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    const startVoiceRecognition = async () => {
      if (isRecording) return; // Prevent overlapping calls
      try {
        const hasPermission = await requestMicrophonePermission();
        if (!hasPermission) {
          Alert.alert(
            'Permission Denied',
            'Microphone access is required for voice search. Please enable it in your device settings.',
          );
          return;
        }
        await Voice.start('en-US');
        setIsRecording(true);
        lottieRef.current?.play();
      } catch (error) {
        console.error('Voice Start Error:', error);
        Alert.alert('Voice Recognition Error', 'Unable to start recognition.');
      }
    };

    const stopVoiceRecognition = async () => {
      try {
        await Voice.stop();
        await Voice.destroy();
        setIsRecording(false);
        stopLottieAnimation();
      } catch (error) {
        console.error('Voice Stop Error:', error);
      }
    };

    const speechResultsHandler = (event: SpeechResultsEvent) => {
      if (event.value && event.value[0]) {
        const query = event.value[0];
        setTranscription(query);
        stopVoiceRecognition();
        setTimeout(() => {
          handleNavigation(query);
        }, 1000);
      }
    };

    const speechErrorHandler = (error: SpeechErrorEvent) => {
      console.error('Speech Error:', error);
      stopVoiceRecognition();
    };

    const stopLottieAnimation = () => {
      lottieRef.current?.pause();
      lottieRef.current?.reset();
    };

    Voice.onSpeechResults = speechResultsHandler;
    Voice.onSpeechError = speechErrorHandler;

    startVoiceRecognition();

    const unsubscribeFocus = navigation.addListener('focus', () => {
      startVoiceRecognition();
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      stopVoiceRecognition();
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
      stopVoiceRecognition();
    };
  }, [navigation]);

  const requestMicrophonePermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.error('Permission Request Error:', err);
      return false;
    }
  };

  const handleNavigation = (query: string) => {
    // Trigger haptic feedback
    ReactNativeHapticFeedback.trigger('keyboardPress', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    // Navigate to the desired screen
    navigation.replace(SCREEN_NAMES.SEARCH_RESULTS, {query});
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2f3133" />
      <HeaderRow>
        <HeaderIconWrapper onPress={() => navigation.goBack()}>
          <ChevronLeftIcon width="24" height="24" fill="#aaa" />
        </HeaderIconWrapper>
        <HeaderIconWrapper>
          <WebIcon width="20" height="20" fill="#aaa" />
        </HeaderIconWrapper>
      </HeaderRow>
      <Row>
        <InstructionText>
          {transcription !== ''
            ? transcription
            : isRecording
              ? 'Listening...'
              : 'Speak Now'}
        </InstructionText>
      </Row>
      <Row>
        <LottieView
          ref={lottieRef}
          source={require('../assets/animations/audio.json')}
          loop
          autoPlay={false}
          style={{width: 200, height: 200}}
        />
      </Row>
      <Row>
        <Button>
          <MusicNoteOutlineIcon width="14" height="14" fill="#9d9ea2" />
          <ButtonText>Search a song</ButtonText>
        </Button>
      </Row>
      <Row />
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #2f3133;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderIconWrapper = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  width: 32px;
  height: 32px;
  background-color: #43474a;
`;

const InstructionText = styled.Text`
  color: #999da0;
  font-size: 18px;
`;

const Button = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 20px;
  border-width: 1px;
  border-color: #515355;
  background-color: #202226;
  padding: 10px 16px;
`;

const ButtonText = styled.Text`
  color: #9d9ea2;
  font-size: 14px;
`;

export default VoiceSearchScreen;
