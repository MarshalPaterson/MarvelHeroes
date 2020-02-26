import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';

import {
    PieChart,
  } from 'react-native-chart-kit'

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { comicsNumber, eventsNumber, seriesNumber, storiesNumber } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          <View>
            <PieChart
              data={[
                {
                  name: 'Comics',
                  population: comicsNumber,
                  color: '#F00',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Events',
                  population: eventsNumber,
                  color: '#ffffff',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Series',
                  population: seriesNumber,
                  color: 'rgb(0, 0, 255)',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
                {
                  name: 'Stories',
                  population: storiesNumber,
                  color: 'green',
                  legendFontColor: '#7F7F7F',
                  legendFontSize: 15,
                },
              ]}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute //for the absolute number remove if you want percentage
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 0,
    backgroundColor: 'black',
  },
});
