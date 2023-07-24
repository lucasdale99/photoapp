import { Text, TouchableOpacity, View } from "react-native";
import { CameraViewContext } from "../state/CameraContextProvider";
import {Dispatch, SetStateAction, useContext} from "react";
import { Camera } from "expo-camera";
import {CameraDomainObject} from "../domain/CameraDomainObject";

interface ICameraContainerProps {
    cameraDO: CameraDomainObject | undefined;
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>;
}
export const CameraContainer = ({cameraDO, setCameraDO}: ICameraContainerProps) => {
    const handleToggleCameraType = () => {
        if(cameraDO) {
            const updatedCameraDO = cameraDO.toggleCameraType();
            setCameraDO(updatedCameraDO);
        }
    };

    const handleCapturePhoto = async () => {
        if(cameraDO) {
            const updatedCameraDO = await cameraDO.capturePhoto();
            setCameraDO(updatedCameraDO);
        }
    };
    
    return (
        <View className="flex-1 justify-center">
            {cameraDO?.hasMediaLibraryPermission === undefined && <Text>Waiting on Permission to be granted</Text>}
            {!cameraDO?.hasCameraPermission && <Text>Permission for Camera was not granted.</Text>}
            {cameraDO?.hasCameraPermission && (
                cameraDO.cameraRef &&
                    <Camera className="flex-1" type={cameraDO.cameraType} ref={(camera) => {
                        cameraDO.cameraRef.current = camera;
                    }}>
                    <View className="flex-1 flex-row bg-transparent mt-20">
                        <TouchableOpacity className="flex-1 flex-end items-center" onPress={handleToggleCameraType}>
                            <Text className="text-2xl font-bold text-white">Flip Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="flex-1 flex-end items-center" onPress={handleCapturePhoto}>
                            <Text className="text-2xl font-bold text-white">Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    )
}