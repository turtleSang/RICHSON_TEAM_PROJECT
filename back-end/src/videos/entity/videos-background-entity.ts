import { ChildEntity } from "typeorm";
import { VideoEntity } from "./videos-entity";

@ChildEntity("background_video")
export class VideoBackgroundEntity extends VideoEntity {

}