import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import getMeme from "../lib/getMeme";
import MemeCard from "../components/MemeCard";

const HomeScreen = () => {
  const [memeData, setMemeData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("card");

  const fetchMemeData = async (isInitial = false) => {
    try {
      if (!isInitial) setLoadingMore(true);
      const data = await getMeme();

      if (memeData.length > 0 && !isInitial) {
        setMemeData((prevData) => [...prevData, ...data]);
      } else {
        setMemeData(data);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching memes:", err);
      // setError("Failed to load memes. Pull down to retry.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const refreshMemeData = async () => {
    setRefreshing(true);
    await fetchMemeData(true);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchMemeData(true);
  }, []);

  const handleLike = useCallback((id) => {
    // Update like count in the state
    setMemeData((prevData) =>
      prevData.map((meme) =>
        meme.id === id
          ? {
              ...meme,
              liked: !meme.liked,
              ups: meme.liked ? meme.ups - 1 : meme.ups + 1,
            }
          : meme
      )
    );
  }, []);

  const renderCardItem = ({ item }) => {
    return <MemeCard item={item} onLike={handleLike} />;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-center border-b border-gray-200 py-4 px-4 bg-white">
          <Text className="text-xl font-bold text-indigo-700">Funify</Text>
        </View>

        {/* Content */}
        <View className="flex-1 bg-gray-100">
          {loading && !refreshing ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text className="mt-2 text-gray-600">Loading memes...</Text>
            </View>
          ) : error ? (
            <View className="flex-1 items-center justify-center p-5">
              <Ionicons name="alert-circle-outline" size={48} color="#DC2626" />
              <Text className="mt-2 text-gray-700 text-center">{error}</Text>
              <TouchableOpacity
                className="mt-4 bg-indigo-600 px-4 py-2 rounded-lg"
                onPress={refreshMemeData}
              >
                <Text className="text-white font-medium">Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ padding: 12 }}
              renderItem={renderCardItem}
              data={memeData}
              keyExtractor={(item, index) => item.id || index.toString()}
              onEndReached={() => fetchMemeData(false)}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refreshMemeData}
                  colors={["#4F46E5"]}
                  tintColor="#4F46E5"
                />
              }
              ListFooterComponent={
                loadingMore && (
                  <View className="py-5 items-center">
                    <ActivityIndicator color="#4F46E5" />
                    <Text className="mt-2 text-gray-600 text-sm">
                      Loading more...
                    </Text>
                  </View>
                )
              }
              ListEmptyComponent={
                <View className="py-20 items-center">
                  <Ionicons name="images-outline" size={60} color="#9CA3AF" />
                  <Text className="mt-4 text-gray-500 text-center">
                    No memes found
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
