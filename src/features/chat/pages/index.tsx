import { ChatContainer } from "../components/ChatContainer";
import { useParams } from "react-router-dom";

export default function ChatPage() {
    const { roomId } = useParams();
    if (!roomId) return null;
    return (
        <div>
            <ChatContainer roomId={roomId} />
        </div>
    );
}
