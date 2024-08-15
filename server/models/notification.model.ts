import mongoose,{Document, Model , Schema} from "mongoose";
import {Mode} from "node:fs";

export interface INotification extends Document{
    title: string;
    status: string;
    message: string;
    userId: string
}

const notificationSchema = new Schema<INotification>({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'unread',
    }
    
}, {timestamps: true});
const notificationModel:Model<INotification> = mongoose.model("Notification", notificationSchema);
export default notificationModel;