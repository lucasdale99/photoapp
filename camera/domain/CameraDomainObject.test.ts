import {Camera, CameraType} from 'expo-camera';
import {CameraDomainObject} from './CameraDomainObject';
import * as MediaLibrary from 'expo-media-library';
import {CameraDomainObjectTestFactory} from "../testFactories/CameraDomainObjectTestFactory";

jest.mock('expo-camera', () => ({
    Camera: {
        requestCameraPermissionsAsync: jest.fn(),
    },
    CameraType: {
        back: 'back',
        front: 'front'
    }
}));

jest.mock('expo-media-library', () => ({
    requestPermissionsAsync: jest.fn(),
}));

jest.mock('expo-sharing', () => ({
    shareAsync: jest.fn(),
}));

describe('CameraDomainObject', () => {
    let cameraDomainObject: CameraDomainObject;

    beforeEach(() => {
        cameraDomainObject = CameraDomainObjectTestFactory.create();
    });

    it('toggles camera type', () => {
        expect(cameraDomainObject.cameraType).toBe(CameraType.back);
        cameraDomainObject.toggleCameraType();
        expect(cameraDomainObject.cameraType).toBe(CameraType.front);
    });

    it('requests camera permissions', async () => {
        (Camera.requestCameraPermissionsAsync as jest.Mock).mockResolvedValue({status: 'granted'});
        await cameraDomainObject.getCameraPermission();
        expect(Camera.requestCameraPermissionsAsync).toHaveBeenCalled();
        expect(cameraDomainObject.hasCameraPermission).toBe(true);
    });

    it('requests media library permissions', async () => {
        (MediaLibrary.requestPermissionsAsync as jest.Mock).mockResolvedValue({status: 'granted'});
        await cameraDomainObject.getMediaLibraryPermission();
        expect(MediaLibrary.requestPermissionsAsync).toHaveBeenCalled();
        expect(cameraDomainObject.hasMediaLibraryPermission).toBe(true);
    });

});