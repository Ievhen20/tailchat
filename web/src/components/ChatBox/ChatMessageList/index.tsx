import React, { useImperativeHandle, useRef } from 'react';
import {
  ChatMessage,
  getMessageTimeDiff,
  shouldShowMessageTime,
} from 'tailchat-shared';
import { ChatMessageItem } from './Item';
import { Divider } from 'antd';

interface ChatMessageListProps {
  messages: ChatMessage[];
}
export interface ChatMessageListRef {
  scrollToBottom: () => void;
}
export const ChatMessageList = React.forwardRef<
  ChatMessageListRef,
  ChatMessageListProps
>((props, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    scrollToBottom() {
      requestAnimationFrame(() => {
        if (!containerRef.current) {
          return;
        }

        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      });
    },
  }));

  return (
    <div
      className="flex-1 overflow-y-scroll flex flex-col-reverse"
      ref={containerRef}
    >
      <div>
        {props.messages.map((message, index, arr) => {
          let showDate = true;
          let showAvatar = true;
          const messageCreatedAt = new Date(message.createdAt ?? '');
          if (index > 0) {
            // 当不是第一条数据时

            // 进行时间合并
            const prevMessage = arr[index - 1];
            if (
              !shouldShowMessageTime(
                new Date(prevMessage.createdAt ?? ''),
                messageCreatedAt
              )
            ) {
              showDate = false;
            }

            // 进行头像合并(在同一时间块下 且发送者为同一人)
            if (showDate === false) {
              showAvatar = prevMessage.author !== message.author;
            }
          }

          return (
            <div key={message._id}>
              {showDate && (
                <Divider className="text-sm opacity-40 px-6 font-normal select-none">
                  {getMessageTimeDiff(messageCreatedAt)}
                </Divider>
              )}
              <ChatMessageItem showAvatar={showAvatar} payload={message} />
            </div>
          );
        })}
      </div>
    </div>
  );
});
ChatMessageList.displayName = 'ChatMessageList';
