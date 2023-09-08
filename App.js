
/// delay free scrolling in flatlist pagination
import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,

} from 'react-native';
import axios from 'axios';




const App = () => {
  const [data, setdata] = useState([])
  const [offset, setoffect] = useState(0)
  const [page, setPage] = useState(1)
  const scrollViewRef = useRef(null)

  useEffect(() => {
    userlistApi(1)
  }, [])
  const userlistApi = (pages) => {
    setPage(pages)
    axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${pages}&_limit=10`).then((res) => {
      if (pages > 1) {
        setdata((prevData) => [...prevData, ...res.data]);

      } else {
        setdata(res.data)
      }

    })
      .catch((err) => console.log("kjkjkj", err))
  }
  const lodeMoreData = async () => {

    userlistApi(page + 1)


  }


  const ListItem = React.memo(({ item, key }) => {
    return (
      <View key={key} style={{ backgroundColor: 'green', padding: 35, flexDirection: 'row' }}>

        <Text style={{ color: 'white', fontSize: 18 }}>{item.id}</Text>
        <Text numberOfLines={2} style={{ marginHorizontal: 20, color: 'white', fontSize: 18 }} >{item.title}</Text>
      </View>
    )

  }
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'black', fontSize: 18, alignSelf: 'center', padding: 8 }}>UserList</Text>

        <FlatList


          ref={scrollViewRef}
          keyExtractor={(item, index) => index.toString()}
          style={{ backgroundColor: 'white', flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={data}
          ListFooterComponent={() => (
            <View style={{ marginBottom: (10) }} />
          )}

          extraData={data}
          renderItem={({ item, index }) =>
            <View key={index} style={{ backgroundColor: 'green', padding: 35, flexDirection: 'row' }}>

              <Text style={{ color: 'white', fontSize: 18 }}>{item.id}</Text>
              <Text numberOfLines={2} style={{ marginHorizontal: 20, color: 'white', fontSize: 18 }} >{item.title}</Text>
            </View>


          }
          ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "white", height: 2 }} />
          )}

          onScroll={e => {

            var currentOffset =
              e.nativeEvent.contentOffset.y;
            var direction =
              currentOffset > offset ? 'down' : 'up';
            console.log(direction);
            if (direction === 'down') {

              setTimeout(() => {
                lodeMoreData();
              }, 100);


            }
          }}

          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          onEndReachedThreshold={0.1}
        />

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

});

export default App;
