import { Button } from "@/components/ui/button";
import { Title, Paragraph } from "@/shared/components/typography";
import { MdMeetingRoom } from "react-icons/md";
import { IoEnterSharp } from "react-icons/io5";

export function JoinRoomBanner() {
    return <div className="hidden  w-full bg-linear-to-b from-neutral-800/40 via-neutral-800/10 to-transparent rounded-xl p-2 md:p-4 lg:p-8 md:flex flex-col md:flex-row justify-between items-center text-foreground">
        <div className="flex flex-col gap-y-2">
            <Title>Welcome to the chat</Title>
            <Paragraph>
                Enjoy the chat with your friends, family and colleagues.
            </Paragraph>
        </div>
        <div className="flex items-center gap-2">
            <Button size="lg" variant="outline">
                <IoEnterSharp className="size-4" />
                Join a Room
            </Button>
            <Button size="lg">
                <MdMeetingRoom className="size-4" />
                Create New Room
            </Button>
        </div>
    </div>;
}


