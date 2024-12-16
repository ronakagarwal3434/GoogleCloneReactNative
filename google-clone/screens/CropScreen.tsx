import React, {useRef, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';

const {height} = Dimensions.get('screen');

const CropScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '60%'], []);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Default ScrollView Images
  const defaultImages = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ];

  // Open Image Picker and Crop
  const handleCropImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path);
      })
      .catch(error => console.log('Error cropping image: ', error));
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity>
          {/* <Ionicons name="chevron-back" size={24} color="#fff" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crop Image</Text>
        <TouchableOpacity onPress={handleCropImage}>
          <Text style={styles.headerButton}>Crop</Text>
        </TouchableOpacity>
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{uri: imageUri}}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}
      </View>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={styles.bottomSheet}>
        <View style={styles.sheetContent}>
          {/* Search Bar */}
          <View style={styles.searchBar}>
            {/* <Ionicons
              name="search"
              size={20}
              color="#888"
              style={styles.icon}
            /> */}
            <TextInput
              placeholder="Add to your search"
              placeholderTextColor="#888"
              style={styles.input}
            />
          </View>

          {/* Text */}
          <Text style={styles.resultsText}>Results for people are limited</Text>

          {/* Scrollable Image Section */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {defaultImages.map((url, index) => (
              <TouchableOpacity key={index} style={styles.imageWrapper}>
                <Image source={{uri: url}} style={styles.scrollImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#222',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  headerButton: {
    color: '#00f',
    fontSize: 16,
    fontWeight: '500',
  },
  imageContainer: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  bottomSheet: {
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultsText: {
    marginVertical: 16,
    fontWeight: '600',
    color: '#333',
  },
  imageWrapper: {
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    width: 100,
    height: 100,
  },
  scrollImage: {
    width: '100%',
    height: '100%',
  },
});

export default CropScreen;
