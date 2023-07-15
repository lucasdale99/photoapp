import {MutableRefObject} from "react";
import {CameraType} from "./CameraTypeEnum";
import {Camera, CameraCapturedPicture} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {shareAsync} from "expo-sharing";
import {ICameraRepo} from "./ICameraRepo";
import {PermissionResponse} from "expo-camera/src/Camera.types";

export class CameraRepo implements ICameraRepo {
    private readonly _cameraPermission: Promise<PermissionResponse>;
    private readonly _mediaLibraryPermission: Promise<PermissionResponse>;
    public hasCameraPermission: boolean;
    public hasMediaLibraryPermission: boolean;
    public cameraType: CameraType;
    public photo: CameraCapturedPicture | null = null;
    public cameraRef: MutableRefObject<Camera | null>;

    constructor(hasCameraPermission: boolean, hasMediaLibraryPermission: boolean, cameraType: CameraType, photo: CameraCapturedPicture | null = null, cameraRef: MutableRefObject<Camera | null>){
        this._cameraPermission = Camera.requestCameraPermissionsAsync();
        this._mediaLibraryPermission = MediaLibrary.requestPermissionsAsync();
        this.hasCameraPermission = hasCameraPermission;
        this.hasMediaLibraryPermission = hasMediaLibraryPermission;
        this.cameraType = cameraType;
        this.photo = photo;
        this.cameraRef = cameraRef;
    }

    public async getUserPermission(): Promise<void>{
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        this.hasCameraPermission = cameraPermission.status === 'granted';
        this.hasMediaLibraryPermission = mediaLibraryPermission.status === 'granted';
    };
    public toggleCameraType(): void {
        this.cameraType = this.cameraType === CameraType.back ? CameraType.front : CameraType.back;
    };

    capturePhoto = async () => {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        };

        if (this.cameraRef.current) {
            this.photo = await this.cameraRef.current.takePictureAsync(options);
        }
    }

    sharePicture = () => {
        if(!this.photo) return;
        shareAsync(this.photo?.uri)
            .then(() => {
                this.photo = null;
            })
    }
    
    savePhoto = () => {
        if(!this.photo) return;
        MediaLibrary.saveToLibraryAsync(this.photo.uri)
            .then(() => {
                this.photo = null;
            })
    }
    
    discardPhoto = () => {
        this.photo = null;
    }
}