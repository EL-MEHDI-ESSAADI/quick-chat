import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AddMessageForm, MessageList } from "@/components";

export default function Home() {
  return (
    <div className="container py-3">
      <Card>
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <MessageList />
        </CardContent>
        <CardFooter>
          <AddMessageForm />
        </CardFooter>
      </Card>
    </div>
  );
}
