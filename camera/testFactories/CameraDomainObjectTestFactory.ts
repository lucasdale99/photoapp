import {CameraDomainObject} from "../domain/CameraDomainObject";
import {CameraType} from "expo-camera";

export class CameraDomainObjectTestFactory {
    public static create(): CameraDomainObject {
        return new CameraDomainObject(false, false, CameraType.back, null, {current: null});
    }
}