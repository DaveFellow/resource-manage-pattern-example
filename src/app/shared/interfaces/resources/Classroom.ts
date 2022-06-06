import { ResourceId } from "../../types/Resources";

export interface Classroom {
    id: ResourceId,
    label: string,
    capacity: number
}