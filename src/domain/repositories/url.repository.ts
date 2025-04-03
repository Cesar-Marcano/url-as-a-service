import { UrlEntity } from "../entities/url.entity";

export interface UrlRepository {
    findById(id: string): Promise<UrlEntity | null>;
    findBySlug(slug: string): Promise<UrlEntity | null>;
    findByLongUrl(originalUrl: string): Promise<UrlEntity | null>;
    create(url: UrlEntity): Promise<UrlEntity>;
    update(url: UrlEntity): Promise<UrlEntity>;
    delete(id: string): Promise<void>;
    getAll(): Promise<UrlEntity[]>;
    count(): Promise<number>;
    getAllByUserId(userId: string): Promise<UrlEntity[]>;
    countByUserId(userId: string): Promise<number>;
}