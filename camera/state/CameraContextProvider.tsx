import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useEffect, useRef, useState } from "react"
import { CameraDomainObject } from "../domain/CameraDomainObject";
import { Text, View } from "react-native";

interface ICameraViewContext {
    cameraDO: CameraDomainObject | undefined
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>
    handleToggleCameraType: () => void,
    handleCapturePhoto: () => void,
    handleShare: () => void,
    handleSave: () => void,
    handleDiscard: () => void,
}

export const CameraViewContext = createContext<ICameraViewContext>({
    cameraDO: undefined,
    setCameraDO: () => {},
    handleToggleCameraType: () => {},
    handleCapturePhoto: () => {},
    handleShare: () => {},
    handleSave: () => {},
    handleDiscard: () => {},
})

interface ICameraViewContextProviderProps {
    children: ReactNode;
}

export const CameraViewContextProvider = ({children}: ICameraViewContextProviderProps) => {
    let cameraRef = useRef<Camera | null>(null);
    const [cameraDO, setCameraDO] = useState<CameraDomainObject | undefined>(
        new CameraDomainObject(
            false,
            false,
            CameraType.back,
            undefined,
            cameraRef
        )
    );

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

    const handleShare = async () => {
        if(cameraDO) {
            const updatedCameraDO = await cameraDO.sharePicture();
            setCameraDO(updatedCameraDO);
        }
    }

    const handleSave = async () => {
        if(cameraDO) {
            const updatedCameraDO = await cameraDO.savePhoto();
            setCameraDO(updatedCameraDO);
        }
    }

    const handleDiscard = () => {
        if (cameraDO) {
            const updatedCameraDO = new CameraDomainObject(
                cameraDO.hasCameraPermission,
                cameraDO.hasMediaLibraryPermission,
                cameraDO.cameraType,
                null,
                cameraDO.cameraRef,
            );
            setCameraDO(updatedCameraDO);
        }
    }

    useEffect(() => {
        (async () => {
            let updatedCameraDO = await cameraDO!.getCameraPermission();
            setCameraDO(await updatedCameraDO.getMediaLibraryPermission());
        })();
    }, []);

    if (cameraDO?.hasCameraPermission === undefined) {
        return <Text>Requesting permissions...</Text>
    } else if (!cameraDO?.hasCameraPermission) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
    }

    return (
        <CameraViewContext.Provider value={{cameraDO, setCameraDO, handleToggleCameraType, handleCapturePhoto, handleSave, handleShare, handleDiscard}}>
            {children}
        </CameraViewContext.Provider>
    )
}