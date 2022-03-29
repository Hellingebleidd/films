import { Film } from "./film";

export class FilmsResponse{
    constructor(
        public items: Film[],
        public totalCount: number
    ){}
}