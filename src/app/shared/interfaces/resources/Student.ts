import { ResourceId } from "../../types/Resources";

export interface Student {
    id: number,
    grade: number,
    userId: ResourceId,
    classroomId: ResourceId
}