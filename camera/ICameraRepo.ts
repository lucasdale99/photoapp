export interface ICameraRepo {
    getUserPermission: () => Promise<void>;
    toggleCameraType: () => void;
    capturePhoto: () => Promise<void>;
    sharePicture: () => void;
    savePhoto: () => void;
    discardPhoto: () => void;
}