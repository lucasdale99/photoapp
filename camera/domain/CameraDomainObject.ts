import {MutableRefObject} from "react";
import {Camera, CameraCapturedPicture, CameraType} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import {shareAsync} from "expo-sharing";

export class CameraDomainObject { 
    public hasCameraPermission: boolean;
    public hasMediaLibraryPermission: boolean;
    public cameraType: CameraType;
    public photo: CameraCapturedPicture | null = null;
    public cameraRef: MutableRefObject<Camera | null>;

    constructor(hasCameraPermission: boolean, hasMediaLibraryPermission: boolean, cameraType: CameraType, photo: CameraCapturedPicture | null = null, cameraRef: MutableRefObject<Camera | null>){
        this.hasCameraPermission = hasCameraPermission;
        this.hasMediaLibraryPermission = hasMediaLibraryPermission;
        this.cameraType = cameraType;
        this.photo = photo;
        this.cameraRef = cameraRef;
    }

    public async getCameraPermission(): Promise<CameraDomainObject> {
        const cameraPermission = await Camera.requestCameraPermissionsAsync();
        this.hasCameraPermission = cameraPermission.status === 'granted';
        return Promise.resolve(this.clone());
    };

    public async getMediaLibraryPermission(): Promise<CameraDomainObject> {
        const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        this.hasMediaLibraryPermission = mediaLibraryPermission.status === 'granted';
        return Promise.resolve(this.clone());
    }

    public toggleCameraType(): CameraDomainObject {
        this.cameraType = this.cameraType === CameraType.back ? CameraType.front : CameraType.back;
        return this.clone();
    };

    public async capturePhoto(): Promise<CameraDomainObject> {
        try{
            const options = {
                quality: 1,
                base64: true,
                exif: false,
            };

            if (this.cameraRef.current) {
                this.photo = await this.cameraRef.current.takePictureAsync(options);
            }
            return this.clone();
        } catch(e: any) {
            console.log(e);
            return this.clone();
        }
    }

    public async sharePicture(): Promise<CameraDomainObject> {
        if(!this.photo) return this;
        await shareAsync(this.photo.uri);
        return this;
    }

    public async savePhoto(): Promise<CameraDomainObject> {
        if(!this.photo) return this.clone();
        await MediaLibrary.saveToLibraryAsync(this.photo.uri);
        this.photo = null;
        return this.clone();
    }
    
    public discardPhoto = (): CameraDomainObject => {
        this.photo = null;
        return this.clone();
    }

    private clone(): CameraDomainObject {
        return new CameraDomainObject(this.hasCameraPermission, this.hasMediaLibraryPermission, this.cameraType, this.photo, this.cameraRef)
    }
}