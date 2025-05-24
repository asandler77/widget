import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const testDate = new Date('2025-05-30T00:00:00').toISOString();
if (!storage.getString('widget_end_time')) {
  storage.set('widget_end_time', testDate);
}

const CountDownTimer: React.FC = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(null));

  function getTimeLeft(target: Date | null) {
    if (!target) return {days: 0, hours: 0, minutes: 0, seconds: 0};

    const now = new Date().getTime();
    const difference = target.getTime() - now;

    if (difference <= 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const dateStr = storage.getString('widget_end_time');
    if (dateStr) {
      const date = new Date(dateStr);
      setTargetDate(date);
      setTimeLeft(getTimeLeft(date));
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (targetDate) {
        setTimeLeft(getTimeLeft(targetDate));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
        {timeLeft.seconds}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 200,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default CountDownTimer;
