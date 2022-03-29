import { Film } from "./film";

export class FulmsResponse{
    constructor(
        public items: Film[],
        public totalCount: number
    ){}
}