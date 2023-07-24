import {Button, Image, SafeAreaView} from "react-native";
import {CameraDomainObject} from "../domain/CameraDomainObject";
import {Dispatch, SetStateAction, useContext} from "react";
import {CameraViewContext} from "../state/CameraContextProvider";

interface ICapturedPhotoContainerProps {
    cameraDO: CameraDomainObject;
    setCameraDO: Dispatch<SetStateAction<CameraDomainObject | undefined>>;
}

export const CapturedPhotoContainer = ({...props}: ICapturedPhotoContainerProps) => {
    const {handleShare, handleSave, handleDiscard} = useContext(CameraViewContext)
    const {cameraDO, setCameraDO} = props;
    
    return (
        <SafeAreaView className="flex-1 justify-center">
            <Image className="self-stretch flex-1" source={{ uri: "data:image/jpg;base64," + cameraDO?.photo?.base64 }} />
            <Button title="Share" onPress={handleShare} />
            {cameraDO.hasCameraPermission && <Button title="Save" onPress={handleSave} />}
            <Button title="Discard" onPress={handleDiscard} />
        </SafeAreaView>
    )
}