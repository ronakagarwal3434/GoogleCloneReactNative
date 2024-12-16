import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StatusBar,
  FlatList,
  Keyboard,
  ActivityIndicator,
  Animated,
} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import debounce from 'lodash/debounce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SharedElement} from 'react-navigation-shared-element';

import SearchContainer from '../components/SearchContainer';
import {
  ChevronLeftIcon,
  ClockOutlineIcon,
  GoogleLensIcon,
  MagnifyIcon,
  MicrophoneIcon,
} from '../assets/icons';
import {SCREEN_NAMES} from '../util/constants';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SearchResults: {query: string};
};

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

interface SearchSuggestion {
  text: string;
  type: 'history' | 'suggestion';
}

const SEARCH_HISTORY_KEY = 'searchHistory';
const MAX_HISTORY_ITEMS = 10;

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const loadSearchHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        if (storedHistory) {
          const parsedHistory = JSON.parse(storedHistory);
          setSearchHistory(parsedHistory);

          setSuggestions(
            parsedHistory.map(h => ({
              text: h,
              type: 'history' as const,
            })),
          );
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };

    loadSearchHistory();
  }, []);

  // Save search history whenever it changes
  useEffect(() => {
    const saveSearchHistory = async () => {
      try {
        await AsyncStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(searchHistory),
        );
      } catch (error) {
        console.error('Error saving search history:', error);
      }
    };

    saveSearchHistory();
  }, [searchHistory]);

  // Fetch search suggestions
  const fetchSuggestions = useCallback(
    debounce(async (query: string) => {
      if (query.length < 2) {
        setSuggestions(
          searchHistory.map(h => ({
            text: h,
            type: 'history' as const,
          })),
        );
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://ac.duckduckgo.com/ac/?q=${query}&type=list`,
        );

        const apiSuggestions = response.data[1];

        const validSuggestions = apiSuggestions
          .filter((suggestion: any) => typeof suggestion === 'string')
          .map((suggestion: string) => ({
            text: suggestion,
            type: 'suggestion' as const,
          }));

        // Filter out suggestions already in history
        const filteredHistory = searchHistory
          .filter(h => h.toLowerCase().includes(query.toLowerCase()))
          .map(h => ({text: h, type: 'history' as const}));

        // Combine history and API suggestions, ensuring no duplicates
        const combinedSuggestions = [
          ...filteredHistory,
          ...validSuggestions.filter(
            api =>
              !filteredHistory.some(
                hist => hist.text.toLowerCase() === api.text.toLowerCase(),
              ),
          ),
        ];

        setSuggestions(combinedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        // On error, just use the filtered history
        setSuggestions(
          searchHistory
            .filter(h => h.toLowerCase().includes(query.toLowerCase()))
            .map(h => ({text: h, type: 'history' as const})),
        );
      } finally {
        setLoading(false);
      }
    }, 300),
    [searchHistory],
  );

  useEffect(() => {
    fetchSuggestions(searchQuery);
  }, [searchQuery, fetchSuggestions]);

  const handleSearch = (query: string) => {
    const updatedHistory = [
      query,
      ...searchHistory.filter(h => h !== query),
    ].slice(0, MAX_HISTORY_ITEMS);
    setSearchHistory(updatedHistory);

    navigation.navigate(SCREEN_NAMES.SEARCH_RESULTS, {query});

    Keyboard.dismiss();
  };

  const renderSuggestionItem = ({item}: {item: SearchSuggestion}) => (
    <SuggestionItem onPress={() => handleSearch(item.text)}>
      {item.type === 'history' ? (
        <ClockOutlineIcon width="20" height="20" fill="#aaa" />
      ) : (
        <MagnifyIcon width="20" height="20" fill="#aaa" />
      )}
      <SuggestionText>{item.text}</SuggestionText>
    </SuggestionItem>
  );

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#1f2125" />

      {/* Search Container */}
      <SharedElement id="searchInput">
        <SearchContainer
          leftIcon={
            <ChevronLeftIcon
              width="24"
              height="24"
              fill="#aaa"
              onPress={() => navigation.goBack()}
            />
          }
          rightIcons={[
            loading && <ActivityIndicator color="#aaa" size="small" />,
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
            value: searchQuery,
            onChangeText: setSearchQuery,
            onSubmitEditing: () => handleSearch(searchQuery),
            returnKeyType: 'search',
            autoFocus: true,
          }}
          containerStyle={{
            backgroundColor: '#2f3133',
            marginHorizontal: 20,
            marginTop: 20,
            padding: 2,
          }}
          style={{
            fontSize: 16,
          }}
        />
      </SharedElement>

      {/* Search History Header */}
      {searchHistory.length > 0 && (
        <HistoryHeader>
          <HistoryTitle>Recent Searches</HistoryTitle>
        </HistoryHeader>
      )}

      {/* Suggestions List */}
      <SuggestionsList
        data={suggestions}
        renderItem={renderSuggestionItem}
        keyExtractor={(item, index) => `${item.text}-${index}`}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          searchQuery.length > 0 && (
            <EmptyResultText>No suggestions found</EmptyResultText>
          )
        }
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #1f2125;
`;

const SuggestionsList = styled(FlatList)`
  margin-horizontal: 20px;
` as unknown as typeof FlatList;

const SuggestionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 8px 0;
`;

const SuggestionText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  margin-left: 15px;
`;

const EmptyResultText = styled.Text`
  color: #aaa;
  text-align: center;
  margin-top: 20px;
`;

const HistoryHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: 20px;
  margin-bottom: 10px;
`;

const HistoryTitle = styled.Text`
  color: #8e9298;
  font-size: 12px;
`;

export default SearchScreen;
