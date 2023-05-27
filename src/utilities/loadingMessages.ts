import { messages } from "./messages.json";

export default function loadingMessages() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}
