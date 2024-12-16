import {createContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '44508520265-votufbssc7tqbjqmg02f22qo3vmhc0m7.apps.googleusercontent.com',
});

export const AuthContext = createContext({
  userName: '',
  userEmail: '',
  userPhoto: '',
  userSignedIn: false,
  signInMethod: async () => {},
  signOutMethod: async () => {},
  isLoading: false,
});

export const AuthProvider = ({children}: any) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setUserName(user.displayName || '');
        setUserEmail(user.email || '');
        setUserPhoto(user.photoURL || '');
        setUserSignedIn(true);
      } else {
        setUserName('');
        setUserEmail('');
        setUserPhoto('');
        setUserSignedIn(false);
      }
    });

    return subscriber;
  }, []);

  const signIn = async () => {
    setIsLoading(true);

    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential =
        await auth().signInWithCredential(googleCredential);
      if (userCredential.user) {
        setUserName(userCredential.user.displayName || '');
        setUserEmail(userCredential.user.email || '');
        setUserPhoto(userCredential.user.photoURL || '');
        setUserSignedIn(true);
      }
      console.log('Signed In with Google!');
    } catch (error: any) {
      if (error.code === '-5') {
        console.log('User canceled the Sign In process.');
      } else {
        console.error('Error Signing in with Google:', error);
      }
    } finally {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        console.log('No user Signed In.');
      }
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
      console.log('User signed out!');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    userName: userName,
    userEmail: userEmail,
    userPhoto: userPhoto,
    userSignedIn: userSignedIn,
    signInMethod: signIn,
    signOutMethod: signOut,
    isLoading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
