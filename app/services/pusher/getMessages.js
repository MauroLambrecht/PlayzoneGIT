import axios from "axios";

const getMessages = async () => {
  try {
    const response = await axios.get("http://yourbackendapi.com/messages");
    setMessages(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default getMessages;