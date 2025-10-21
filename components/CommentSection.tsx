"use client";

import { type Comment } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="flex gap-4">
        <Image src={comment.avatarUrl} alt={comment.author} width={40} height={40} className="rounded-full h-10 w-10" />
        <div className="flex-1">
            <div className="flex items-center gap-2">
                <p className="font-semibold">{comment.author}</p>
                <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
            </div>
            <p className="text-sm text-foreground/90">{comment.text}</p>
            <Button variant="link" className="p-0 h-auto text-xs">Reply</Button>
            {comment.replies && (
                <div className="mt-4 space-y-4 pl-6 border-l">
                    {comment.replies.map(reply => <CommentItem key={reply.id} comment={reply} />)}
                </div>
            )}
        </div>
    </div>
);

const CommentSection = ({ comments }: { comments: Comment[] }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-4">Discussion ({comments.length})</h2>
            <div className="space-y-6">
                <form className="flex flex-col gap-2">
                    <Textarea placeholder="Write a comment..." />
                    <Button className="self-end">Post Comment</Button>
                </form>
                <div className="space-y-8">
                    {comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
                </div>
            </div>
        </section>
    );
}

export default CommentSection;