import {Button, Image, SafeAreaView} from "react-native";
import {CameraDomainObject} from "../domain/CameraDomainObject";
import {Dispatch, SetStateAction} from "react";

interface ICapturedPhotoContainerProps {
    cameraDO: CameraDomainObject;
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>;
}

export const CapturedPhotoContainer = ({...props}: ICapturedPhotoContainerProps) => {
    const {cameraDO, setCameraDO} = props;
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
    
    return (
        <SafeAreaView className="flex-1 justify-center">
            <Image className="self-stretch flex-1" source={{ uri: "data:image/jpg;base64," + cameraDO?.photo?.base64 }} />
            <Button title="Share" onPress={handleShare} />
            {cameraDO.hasCameraPermission && <Button title="Save" onPress={handleSave} />}
            <Button title="Discard" onPress={handleDiscard} />
        </SafeAreaView>
    )
}