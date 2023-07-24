import { SafeAreaView, Image, Button } from 'react-native';
import { useContext } from 'react';
import { CameraViewContext } from '../state/CameraContextProvider';
import { CameraContainer } from './CameraContainer';
import {CapturedPhotoContainer} from "./CapturedPhotoContainer";

export const CameraView = () => {
    const {cameraDO, setCameraDO} = useContext(CameraViewContext);
    return (
        cameraDO?.photo ?
            <CapturedPhotoContainer cameraDO={cameraDO} setCameraDO={setCameraDO}/>
            :
            <CameraContainer cameraDO={cameraDO} setCameraDO={setCameraDO}/>
    );
}