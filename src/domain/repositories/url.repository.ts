import { UrlEntity } from "@domain/entities/url.entity";

export interface IUrlRepository {
    findById(id: number): Promise<UrlEntity | null>;
    findBySlug(slug: string): Promise<UrlEntity | null>;
    findByLongUrl(originalUrl: string): Promise<UrlEntity | null>;
    create(url: UrlEntity): Promise<UrlEntity>;
    update(url: Partial<UrlEntity>): Promise<UrlEntity>;
    delete(id: number): Promise<void>;
    getAll(): Promise<UrlEntity[]>;
    count(): Promise<number>;
    getAllByUserId(userId: number): Promise<UrlEntity[]>;
    countByUserId(userId: number): Promise<number>;
}