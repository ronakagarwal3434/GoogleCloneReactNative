import React from 'react';
import {Linking, Pressable, Image, Text, View, StyleSheet} from 'react-native';
import moment from 'moment';
import {ExportVariantIcon, HeartOutlineIcon} from '../assets/icons';

interface ContentCardProps {
  imageUrl: string;
  title: string;
  source: string;
  time: string;
  url: string;
  favicon: string;
}

const dateFormat = 'MM/DD/YYYY, hh:mm A, Z [UTC]';

const ContentCard: React.FC<ContentCardProps> = ({
  imageUrl,
  title,
  source,
  time,
  url,
  favicon,
}) => {
  function handlePress() {
    Linking.openURL(url);
  }

  const relativeTime = time
    ? moment(time, dateFormat)
        .fromNow(true)
        .replace('minutes', 'm')
        .replace('minute', 'm')
        .replace('hours', 'h')
        .replace('hour', 'h')
        .replace('days', 'd')
        .replace('day', 'd')
    : 'N/A';

  return (
    <Pressable onPress={handlePress}>
      <Image source={{uri: imageUrl}} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <View style={styles.footer}>
          <Text style={styles.source}>
            <Image
              source={{uri: favicon}}
              style={styles.favicon}
              resizeMode="cover"
            />
            {'   '}
            {source} · {relativeTime}
          </Text>

          <View style={styles.actions}>
            <HeartOutlineIcon
              height="16"
              width="16"
              fill="#a5a5a5"
              style={styles.icon}
            />
            <ExportVariantIcon
              height="16"
              width="16"
              fill="#a5a5a5"
              style={styles.icon}
            />
          </View>
        </View>
      </View>
      <View style={styles.divider} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 170,
    borderRadius: 16,
  },
  textContainer: {
    paddingVertical: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favicon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  source: {
    color: '#ffffff',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#414246',
  },
});

export default ContentCard;
