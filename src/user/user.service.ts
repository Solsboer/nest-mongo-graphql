import { Injectable } from '@nestjs/common';
import { User } from "./models/user.model";
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import {IUser} from "./interfaces/user.interface";
import {NewUserInput} from "./dto/new-user.input";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(newUserDto: NewUserInput): Promise<User> {
        const createdUser = new this.userModel(newUserDto);
        return createdUser.save();
    }
}
