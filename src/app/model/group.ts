export class Group{
    public withUser: number;
    public withUserName: string;
    public messages: Message[];
}

export class Message{
    public senderId: number;
    public receipt: number;
    public messageText: string;

}