import React, {useState, useEffect} from 'react';
import {StatusBar, FlatList, Linking, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import axios from 'axios';
import {SharedElement} from 'react-native-shared-element';

import CrossIcon from '../assets/icons/cross.svg';
import GoogleIcon from '../assets/icons/google.svg';
import DotsVerticalIcon from '../assets/icons/dots-vertical.svg';
import SearchContainer from '../components/SearchContainer';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  SearchResults: {query: string};
};

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  displayLink: string;
  pagemap: any;
}

type SearchResultsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SearchResults'
>;

const SearchResultsScreen: React.FC<SearchResultsScreenProps> = ({
  navigation,
  route,
}) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const {query} = route.params;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/customsearch/v1`,
          {
            params: {
              key: 'AIzaSyD0JnLqtjG3Qhq3zrdBSXKBfyn0SW342nE',
              cx: '45757b0c6cabc4de3',
              q: query,
            },
          },
        );

        const searchResults = response.data.items.map((item: any) => ({
          title: item.title,
          link: item.link,
          displayLink: item.displayLink,
          snippet: item.snippet,
          pagemap: item.pagemap,
        }));
        setResults(searchResults);
        setLoading(false);
      } catch (error) {
        console.error('Search results error:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const renderResultItem = ({item}: {item: SearchResult}) => {
    return (
      <ResultItem onPress={() => openLink(item.link)}>
        {/* Top Section */}
        <TopSection>
          <LeftSection>
            <LogoContainer>
              <LogoImage
                source={{
                  uri:
                    item.pagemap?.cse_image?.[0].src ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/48px-Google_%22G%22_logo.svg.png?20230822192911',
                }}
              />
            </LogoContainer>
            <PageName>{item.displayLink}</PageName>
          </LeftSection>
          <RightSection>
            <IconWrapper>
              <DotsVerticalIcon width="24" height="24" fill="#9e9e9e" />
            </IconWrapper>
          </RightSection>
        </TopSection>

        {/* Title and Snippet */}
        <ResultTitle numberOfLines={2} ellipsizeMode="tail">
          {item.title}
        </ResultTitle>
        <ResultSnippet numberOfLines={3} ellipsizeMode="tail">
          {item.snippet}
        </ResultSnippet>
      </ResultItem>
    );
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#1f2125" />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SharedElement id="searchInput">
          <SearchContainer
            leftIcon={
              <GoogleIcon
                width="24"
                height="24"
                fill="#aaa"
                onPress={() => navigation.goBack()}
              />
            }
            rightIcons={[
              <CrossIcon
                width="24"
                height="24"
                fill="#ffffff"
                onPress={() => navigation.goBack()}
              />,
            ]}
            inputProps={{
              value: query,
              placeholderTextColor: '#aaa',
              editable: false,
            }}
            containerStyle={{
              backgroundColor: '#2b2b2b',
              padding: 2,
            }}
            style={{
              fontSize: 18,
              color: '#ffffff',
            }}
          />
        </SharedElement>
      </TouchableOpacity>

      {loading ? (
        <LoadingContainer>
          <LoadingText>Searching...</LoadingText>
        </LoadingContainer>
      ) : (
        <ResultsList
          data={results}
          renderItem={renderResultItem}
          keyExtractor={(item, index) => `${index}-${item.link}`}
        />
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #121212;
`;

const ResultsList = styled(FlatList)`
  flex: 1;
`;

const ResultItem = styled.TouchableOpacity`
  padding: 15px;
  background-color: #1f1f1f;
  margin-bottom: 4px;
`;

const IconWrapper = styled.TouchableOpacity`
  padding: 5px;
`;

const ResultTitle = styled.Text`
  color: #99c3ff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const ResultSnippet = styled.Text`
  color: #cfcfcf;
  font-size: 14px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  margin-top: 10px;
`;

const TopSection = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LogoContainer = styled.View`
  margin-right: 10px;
`;

const LogoImage = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 5px; /* Optional: Adjust if logo has a circular shape */
`;

const PageName = styled.Text`
  color: #ffffff;
  font-size: 14px;
  text-align: left;
`;

const RightSection = styled.View`
  justify-content: center;
  align-items: center;
`;

export default SearchResultsScreen;
