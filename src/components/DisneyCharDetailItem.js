import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  StatusBar
} from "react-native";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const DisneyCharDetailItem = props => {
  const unwrapArray = [{ title: props.detailTitle, data: props.data }];
  return (
    <View style={styles.container_style}>
      <SectionList 
        sections={unwrapArray}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  );
};

//Styles 
const styles = StyleSheet.create({
  container_style: {
    marginTop: 10,
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#B2C2D2',
    padding: 20,
    fontSize: 20,
  },
  item: {
    backgroundColor: "#B591FF",
    padding: 20,
    marginVertical: 10
  },
  title: {
    fontSize: 20,
    color:'white',
    fontWeight:'bold'
  }
});


export default DisneyCharDetailItem;