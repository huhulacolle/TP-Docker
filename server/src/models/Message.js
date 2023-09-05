import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
  }
});

const Message = model("Message", messageSchema);

export default Message;
