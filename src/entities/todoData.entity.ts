import { Todos } from "src/models/todo.model";
import { Photo } from "src/models/photo.model";

export class todoDataEntity {
    readonly deleted: object;
    readonly todo: object;
    readonly photos: Photo[];
    readonly updated: Todos[];
  }