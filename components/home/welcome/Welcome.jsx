import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { icons, SIZES } from '../../../constants';
import { useRouter } from 'expo-router'


const WeekSlider = () => {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [currentMonth, setCurrentMonth] = useState('')

  const weeks = Array.from({ length: 4 }, (_, i) => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() + 7 * i - startOfWeek.getDay());
    return Array.from({ length: 7 }, (_, j) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + j);
      return day;
    });
  });

  const formatWeekDay = (date) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay();
    return dayNames[dayIndex].toUpperCase();
  };

  const getCurrentMonth = () => {
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
    return currentMonth.toUpperCase();
  };

  const renderItem = ({ item }) => (
    <View style={styles.weekContainer}>
      {item.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
        <Text style={styles.dayOfWeek}>{formatWeekDay(day)}</Text>
          <View
            style={[
              styles.dayCircle,
              day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth()
                ? styles.currentDayCircle
                : null,
            ]}
          >
            <Text style={styles.dayOfMonth}>{day.getDate()}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const weekWidth = layoutMeasurement.width / 4; // Assuming 4 weeks visible at a time
    const newSelectedWeek = Math.floor(contentOffset.x / weekWidth);
    setSelectedWeek(newSelectedWeek);
  };

  return (
    <View style={styles.container}>
    <Text style={styles.month}>{getCurrentMonth()} 2023</Text>
      <FlatList
        data={weeks}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => `week-${index}`}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
  },
  month: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 10,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  dayOfWeek: {
    fontSize: 16,
    color: '#333',
  },
  dayOfMonth: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  currentDayCircle: {
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f57878',
  },
});

export default WeekSlider;