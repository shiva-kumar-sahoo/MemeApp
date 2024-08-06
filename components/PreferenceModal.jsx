import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const memeTypes = ["Dank", "Political", "Adult", "Funny", "Sports", "Animals"];

const PreferenceModal = ({ visible, onClose }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedTypes = await AsyncStorage.getItem("memeTypes");
        if (savedTypes) {
          setSelectedTypes(JSON.parse(savedTypes));
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      }
    };

    if (visible) {
      loadPreferences();
    }
  }, [visible]);

  const toggleSelection = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const savePreferences = async () => {
    try {
      await AsyncStorage.setItem("memeTypes", JSON.stringify(selectedTypes));
    } catch (error) {
      console.error("Failed to save preferences:", error);
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="w-11/12 bg-white rounded-lg p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Select Meme Types</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={memeTypes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`p-2 m-1 rounded-md ${
                  selectedTypes.includes(item) ? "bg-blue-400" : "bg-gray-200"
                }`}
                onPress={() => toggleSelection(item)}
              >
                <Text
                  className={`text-lg ${
                    selectedTypes.includes(item) ? "text-white" : "text-black"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
          <View className="mt-4">
            <Text className="text-lg font-semibold">Selected Types:</Text>
            <View className="flex-row flex-wrap mt-2">
              {selectedTypes.map((type) => (
                <View
                  key={type}
                  className="flex-row items-center bg-blue-400 p-1 m-1 rounded-full"
                >
                  <Text className="text-white mr-2">{type}</Text>
                  <TouchableOpacity
                    onPress={() => toggleSelection(type)}
                    className="bg-white rounded-full p-1"
                  >
                    <Ionicons name="close" size={16} color="blue" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <TouchableOpacity
            onPress={savePreferences}
            className="mt-4 bg-blue-500 p-3 rounded-lg"
          >
            <Text className="text-center text-white text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PreferenceModal;
