import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Blog from "./blog";

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    commentId: number;

    @Column({ nullable: false, unique:true })
    comment: string;

    @CreateDateColumn({ type: "timestamptz", default: null, nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;

    @ManyToOne(() => Blog, blog => blog.Comments)
    @JoinColumn({ name: 'blogId' })
    blog: Blog
    
}