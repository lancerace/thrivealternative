import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./user";
import Comment from './comment';

@Entity()
export default class Blog {
    @PrimaryGeneratedColumn()
    blogId: number;

    @Column({ nullable: false, unique:true })
    title: string;

    @Column({ nullable: false })
    content: string;

    @CreateDateColumn({ type: "timestamptz", default: null, nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;

    @ManyToOne(()=>User, (user)=> user.blogs)
    @JoinColumn({ name: 'userId' })
    user: User

    @OneToMany(() => Comment, comment => comment.blog)
    Comments: Comment[]
    
}