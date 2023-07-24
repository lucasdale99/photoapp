import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction, createContext, useEffect, useRef, useState } from "react"
import { CameraDomainObject } from "../domain/CameraDomainObject";
import { Text, View } from "react-native";

interface ICameraViewContext {
    cameraDO: CameraDomainObject | undefined
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>
}

export const CameraViewContext = createContext<ICameraViewContext>({
    cameraDO: undefined,
    setCameraDO: () => {},
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
        <CameraViewContext.Provider value={{cameraDO, setCameraDO}}>
            {children}
        </CameraViewContext.Provider>
    )
}