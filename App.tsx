import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {useEffect, useRef, useState} from "react";
import {Camera} from "expo-camera";
import {CameraCapturedPicture} from "expo-camera/src/Camera.types";
import * as MediaLibrary from "expo-media-library";
import {useCamera} from "./camera/useCamera";
import {Button, Image, Text, TouchableOpacity, View} from "react-native";


const Stack = createNativeStackNavigator();
function App(){
    const cameraRef = useRef<Camera | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
    const [photo, setPhoto] = useState<CameraCapturedPicture>();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    const {
        cameraType,
        toggleCameraType,
        capturePhoto
    } = useCamera();

    if (photo) {
        const {sharePic, savePhoto, setPhoto,} = useCamera();
        return (
            <View className="flex-1 justify-center">
                <Image className="self-stretch flex-1" source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <Button title="Share" onPress={sharePic} />
                {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
                <Button title="Discard" onPress={() => setPhoto(undefined)} />
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center">
            {hasCameraPermission === undefined && <Text>Waiting on Permission to be granted</Text>}
            {!hasCameraPermission && <Text>Permission for Camera was not granted.</Text>}
            {hasCameraPermission && (
                <Camera className="flex-1" type={cameraType} ref={(camera) => {
                    cameraRef.current = camera;
                }}>
                    <View className="flex-1 flex-row bg-transparent m-64">
                        <TouchableOpacity className="flex-1 flex-end items-center" onPress={toggleCameraType}>
                            <Text className="text-2xl font-bold text-white">Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-end items-center" onPress={capturePhoto}>
                            <Text className="text-2xl font-bold text-white">Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    )
}

export default App;
