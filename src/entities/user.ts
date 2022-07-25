import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import Blog from "./blog";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ nullable: false,unique:true })
    username: string;

    @Column({ nullable: false })
    password: string;
    
    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @CreateDateColumn({ type: "timestamptz", default: null, nullable: true })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP(6)", nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamptz", default: null, nullable: true })
    deletedAt: Date;

    @OneToMany(()=>Blog, (blog)=> blog.user)
    blogs: Blog[]
}