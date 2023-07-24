import { Text, TouchableOpacity, View } from "react-native";
import React, {Dispatch, SetStateAction, useContext} from "react";
import { Camera } from "expo-camera";
import {CameraDomainObject} from "../domain/CameraDomainObject";
import {Ionicons} from "@expo/vector-icons";
import {CameraViewContext} from "../state/CameraContextProvider";

interface ICameraContainerProps {
    cameraDO: CameraDomainObject | undefined;
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>;
}
export const CameraContainer = ({cameraDO, setCameraDO}: ICameraContainerProps) => {
    const {handleToggleCameraType, handleCapturePhoto} = useContext(CameraViewContext);
    
    return (
        <View className="flex-1 justify-center">
            {cameraDO?.hasMediaLibraryPermission === undefined && <Text>Waiting on Permission to be granted</Text>}
            {!cameraDO?.hasCameraPermission && <Text>Permission for Camera was not granted.</Text>}
            {cameraDO?.hasCameraPermission && (
                cameraDO.cameraRef &&
                    <Camera className="flex-1" type={cameraDO.cameraType} ref={(camera) => {
                        cameraDO.cameraRef.current = camera;
                    }}>
                        <View className="flex-1 justify-start">
                            <View className="flex-row bg-transparent mt-10">
                                <TouchableOpacity className="flex-1 justify-center items-end mr-5" onPress={handleToggleCameraType}>
                                    <Ionicons name="md-camera" size={32} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-1 justify-end">
                            <View className="flex-row bg-transparent mb-20">
                                <TouchableOpacity className="flex-1 justify-center items-center" onPress={handleCapturePhoto}>
                                    <View className="rounded-full border-8 border-white w-20 h-20"></View>
                                </TouchableOpacity>
                            </View>
                        </View>
                </Camera>
            )}
        </View>
    )
}