export class UrlEntity {
    constructor(
        public id: number,
        public slug: string,
        public originalUrl: string,
        public createdAt: Date,
        public updatedAt: Date,
        public authorId: number
    ) {}
}