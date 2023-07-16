import {useRef, useState} from "react";
import {Camera, CameraType} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {shareAsync} from "expo-sharing";

export const useCamera = () => {
    const [cameraType, setCameraType] = useState(CameraType.back);

    const [photo, setPhoto] = useState<any>(null);
    const cameraRef = useRef<Camera | null>(null);

    const getUserPermission = async () => {

    };
    const toggleCameraType = () => {
        setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back);
    };

    const capturePhoto = async () => {
        try{
            let options = {
                quality: 1,
                base64: true,
                exif: false
            };
            if(!cameraRef.current) return;
            let newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
        catch(e: any){
            console.log(e);
        }
        
    }

    let sharePic = () => {
        shareAsync(photo.uri).then(() => {
            setPhoto(undefined);
        });
    };

    let savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            setPhoto(undefined);
        });
    };

    const discardPhoto = () => {
        setPhoto(null);
    }

    return {
        cameraType,
        cameraRef,
        photo,
        toggleCameraType,
        capturePhoto,
        sharePic,
        savePhoto,
        discardPhoto,
        getUserPermission,
        setPhoto
    }
}