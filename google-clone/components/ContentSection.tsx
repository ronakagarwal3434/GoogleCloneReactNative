import React from 'react';
import styled from 'styled-components/native';
import ContentCard from './ContentCard';

const ContentSection = ({data}) => {
  return (
    <ContentContainer>
      {data.map((news, index) => (
        <ContentCard
          key={index}
          imageUrl={news.thumbnail || news.highlight.thumbnail}
          title={news.title || news.highlight.title}
          source={news.source?.name || news.highlight.source?.name}
          time={news.date || news.highlight.date}
          url={news.link || news.highlight.link}
          favicon={news.source?.icon || news.highlight?.source?.icon}
        />
      ))}
    </ContentContainer>
  );
};

const ContentContainer = styled.View`
  margin-horizontal: 20px;
  margin-bottom: 40px;
  flex-direction: column;
  gap: 20px;
`;

export default ContentSection;
